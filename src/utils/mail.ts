import nodemailer from "nodemailer";

async function sendEmail(
  email: string,
  subject: string,
  title: string,
  body: string,
  url: string,
  urlText: string
) {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Suez Canal University" <${process.env.MAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: `${url}`, // plain text body
    html: `<!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <style>
                body {
                    background-color: #eaebed !important;
                    font-family: sans-serif;
                    font-size: 14px;
                    margin: 0;
                    padding: 0;
                }
        
                .content {
                    box-sizing: border-box;
                    display: block;
                    Margin: 0 auto;
                    max-width: 450px;
                    padding: 2% 0;
                }
        
                .main {
                    background: #ffffff !important;
                    border-radius: 3px;
                    width: 100%; 
                }
        
        
                .wrapper {
                    box-sizing: border-box;
                    padding:  40px 20px; 
                }
        
                img{
                    max-width: 15%;
                }
        
                .logo{
                    max-width: 100%;
                    text-align: center;
                }
        
                h1{
                    text-align: center;
                    color: #3D7DCA;
                    font-size: 25px;
                }
        
                .line{
                    margin: 20px auto 6%;
                    height: 2px;
                    width: 90%;
                    background: #E3ECF3;
                }
        
                .container{
                    padding: 2% 2%;
                }
        
        
                button{
                    margin: 10% 0;
                    width: 100%;
                    height: 40px;
                    border-radius: 5px;
                    border: none;
                    cursor: pointer;
                    background: #3D7DCA;
                    color: whitesmoke;
                    font-size: small;
                    font-weight: 500;
                    letter-spacing: 1px;
                }
        
                button:hover{
                    background: #5C8BC5;
                }
        
                a{
                    text-decoration: none;
                    color: #3D7DCA;
                    font-weight: 600;
                }
                
                .footer {
                    clear: both;
                    Margin-top: 10px;
                    text-align: center;
                    width: 100%; 
                }
        
                .footer a {
                    color: #9a9ea6;
                    font-size: 12px;
                    font-weight: 100;
                    text-align: center; 
                }
        
        
                @media (max-width: 720px){
                    .container{
                        width: 90%;
                    }
        
                    h1{
                        font-size: 16px;
                    }
        
                    body{
                        font-size: 12px;
                    }
        
                    button{
                        font-size: 12px;
                    }
                }
        
        
        
              
            </style>
          </head>
        
        
        
          <body>
                  <div class="content">
                    <table class="main">
                        <td class="wrapper">
                            <div class="logo">
                                <img src="https://upload.wikimedia.org/wikipedia/ar/5/56/%D8%B4%D8%B9%D8%A7%D8%B1_%D8%AC%D8%A7%D9%85%D8%B9%D8%A9_%D9%82%D9%86%D8%A7%D8%A9_%D8%A7%D9%84%D8%B3%D9%88%D9%8A%D8%B3.png?20110405185458">
                            </div>
                    
                            <div class="porp">
                                <h1>${title}</h1>
                            </div>
                    
                            <div class="line"></div>
                            
                            <div class="container">
        
                                <div class="text">
                                    <p>Hello Bomba,<br><br>${body}</p>
                                </div>
                    
                                <button class="btn-cont">${urlText}</button>
                    
                                <div class="text">
                                    <p>Button not working? Copy the url below into your browser.</p>
                                    <a href="#">${url}</a>
                                    <p><br><br>Thank you,<br>The Suez Canal University Team</p>
                                </div>
        
                            </div>
                        </td>
                    </table>
                    <div class="footer">
                            <p></p><br>
                            <a href="#">Don't like these emails? Unsubscribe.</a>
                      </div>
                  </div>
          </body>
        </html>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}

export default sendEmail;
