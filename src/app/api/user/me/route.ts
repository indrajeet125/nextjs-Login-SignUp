import { getDatafromToken } from "@/helper/getDataFromToken";

getDatafromToken;

import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";

import { connect } from "@/dbconfig/dbconfig";
import { get } from "http";
connect();

export async function GET(req: NextRequest) {
  try {
    const userId = getDatafromToken(req);
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({ message: "user found ", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
