import axios from "axios";
import { Prisma } from "@prisma/client";
import prisma from "../db";
import dotenv from "dotenv";

dotenv.config();

const PAYMOB_URL = "https://accept.paymob.com/api";
const {
  PAY_API,
  PAYMOB_TOKEN,
  CARD,
  WALLET,
  KOSHK
} = process.env;

// Function to fetch transaction details by ID from Paymob servers

export class PaymentProcessor {

  static async init() {
    const url = `${PAYMOB_URL}/auth/tokens`;
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      api_key: PAY_API
    };
    const response = await axios.post(url, data, { headers });
    const accessToken = response.data.token;
    return accessToken;
  }

  static async pay(
    order_cart: any,
    billing_data: any,
    amount_cents: any,
    type: string
  ) {
    const accessToken = await this.init();

    const orderUrl = `${PAYMOB_URL}/ecommerce/orders`;
    const headers = {
      "Content-Type": "application/json",
    };
    const orderData = {
      auth_token: accessToken,
      delivery_needed: "false",
      amount_cents,
      currency: "EGP",
      items: order_cart,
    };
    const order = await axios.post(orderUrl, orderData, { headers });
    const orderId = order.data.id;

    const paymentKeyUrl = `${PAYMOB_URL}/acceptance/payment_keys`;

    const paymentKeyData = {
      auth_token: accessToken,
      amount_cents,
      expiration: 3600,
      order_id: orderId,
      billing_data,
      currency: "EGP",
      integration_id: type == "card" ? CARD : (type == 'wallet' ? WALLET : KOSHK), // Replace with your integration id
    };
    const paymentKey = await axios.post(paymentKeyUrl, paymentKeyData, {
      headers,
    });
    // store the payment details here and flag it as pending when a request callback is received move it to paid
    // console.log(id, amount_cents, order_id, created_at, is_refunded, is_voided)
    // await this.callback(paymentKey.data.token, orderId);
    //////////////////////////////////////////////////////////////
    return paymentKey.data.token;
  }

  static async getAll() {
    try {
      const result = await prisma.payment.findMany();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async getByEmail(email: string) {
    try {
      const result = await prisma.payment.findMany({
        where: {
          student: email,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  
  static async getById(transactionId: string) {
    const accessToken = await this.init();

    const url = `${PAYMOB_URL}/acceptance/transactions/${transactionId}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(url, { headers });

    return response.data;
  }

  static async refund(transactionId: string, refundAmount: string) {
    const accessToken = await this.init();

    const url = `${PAYMOB_URL}/acceptance/void_refund/refund`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
      auth_token: PAY_API,
      transaction_id: transactionId,
      amount_cents: refundAmount,
    };

    const response = await axios.post(url, data, { headers });

    // console.log('Refund transaction successful.');
    // console.log('Response:', response.data);
    return response.data;
  }

  static async void(transactionId: string) {
    const accessToken = await this.init();

    const url = `${PAYMOB_URL}/acceptance/void_refund/void?token=${PAYMOB_TOKEN}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const data = {
      transaction_id: transactionId,
    };

    const response = await axios.post(url, data, { headers });

    return response.data;
  }

  static async callback(data: any) {
    const { id, student, semesterId, ...rest } = data;
    const payment = await prisma.payment.upsert({
      where: { 
        id,
       },
      update: rest,
      create: {
        id,
        student,
        ...rest,
      },
    });
    return payment;
  }
}
