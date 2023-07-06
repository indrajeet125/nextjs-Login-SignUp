import { connect } from "@/dbconfig/dbconfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    //validate user
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ message: "user not  exist" }, { status: 400 });
    }
    console.log("user exist", user.email);

    //hash password and check
    const isMatch = await bcryptjs.compare(password, user.password);
    console.log("error at (28)", isMatch);
    if (!isMatch) {
      return NextResponse.json(
        { message: "invalid password plz try " },
        { status: 400 }
      );
    }

    //create token data
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "login successfull",
      sucess: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
