import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

import { verifyurl } from './EmailVerificationToken';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function sendVerifyEmail( 
    firstName : string, 
    email: string, 
    verificationCode: string , 
    verifylink: string ) : Promise<{ sent: boolean }> {

    console.log("Sending Email...")
    try {
        await transporter.sendMail({
            from: `"Shopperific" <${process.env.EMAIL_USER}>`,
            to: `${email}`,
            subject: "Verify your email address",
            text:`Verify your email address

                Hi ${firstName}. glad to have you at Shopperific.

                Your verification code is: ${verificationCode}

                This code expires in 10 minutes.
                
                or click the link to verify 
                ${verifylink}

                If you didn't create this account, you can ignore this email.`,

            html: `
                <div style="font-family: Arial, sans-serif;">
                <h2>Verify your email address</h2>
                <p>Your verification code is:</p>
                <div style="font-size:24px;font-weight:bold;letter-spacing:4px;">
                    ${verificationCode}
                </div>
                <br>
                or click the link to verify 
                ${verifylink}
                <p>This code expires in 10 minutes.</p>
                </div> `

        });

        console.log("Email sent");

        return { sent: true }

    } catch ( err: any ) {
        console.error(err.message, err);
        return { sent: false }
    }
}