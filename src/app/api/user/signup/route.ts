import { connect } from "@/dbconfig/dbconfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { userName, email, password } = reqBody;
    //validate user
    const user = await User.findOne({ email: email });
    console.log("exist user ", user);
    if (user) {
      return NextResponse.json(
        { error: "user already exist" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    //create user
    const newuser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    //save user
    const savedUser = await newuser.save();

    //send mail for verifycaiton

    const emailResponse = await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    return NextResponse.json(
      { message: "user created successfullly ", success: true, savedUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("err  in catch ");

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
