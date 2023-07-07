// domain.com/verifytoken/dfsdf;
// domain.com/verifytoken?token=tasdf;

import nodemailer from "nodemailer";
import User from "@/model/userModel";
import bcryptjs from "bcryptjs";
import { use, useId } from "react";
import { verify } from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create hash token
    const hashToken = await bcryptjs.hash(useId.toString(), 10);

    //some check
    if (emailType === "VERIFY") {
      const user = await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotpasseordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1f90c56558e53d",
        pass: "20d7c25f5c87a3",
      },
    });
    const path = `${process.env.DOMAIN}/verifyemail?token=${hashToken}`;
    const mailOptions = {
      from: "indrajeetyadav932001@gmmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail=${hashToken}">here</a>
      to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }  or copy and paste in the link bellow in your browser 
      <br/>${process.env.DOMAIN}/verifyemail?token=${hashToken}</p>`,
    };

    const mailREsponse = await transport.sendMail(mailOptions);

    return mailREsponse;
  } catch (error: any) {
    console.log("error in mailer ", error.message);
    throw new Error(error.message);
  }
};
