import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { UserTypes } from "../models/user";
import prisma from "../db";

const PEPPER = process.env.PEPPER as string;

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          // no error has occurred, but the user does not exist
          return done(null, false, { message: "Incorrect email or password" });
        } else if (user) {
          const password_match = await bcrypt.compare(
            password + PEPPER,
            user.password
          );
          if (password_match)
            // no error has occurred, and the user exists and the password is correct
            return done(null, user);
        }
        // no error has occurred, but the password is incorrect
        return done(null, false, { message: "Incorrect email or password" });
      } catch (err) {
        // an error has occurred
        return done(err);
      }
    }
  )
);

passport.serializeUser((user: UserTypes, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

export default passport;
