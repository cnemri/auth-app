import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ message: "User found", data: user });
  } catch (error: any) {
    console.log("Something went wrong!");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
