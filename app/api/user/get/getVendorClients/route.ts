import {  NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";

export const GET = async () => {
  await connectToMongoDB();

  try {
    const vendorClients = await User.find({ role: "vendorClient" }).select(
      "username firstName lastName email phone role vendorID"
    );

    if (vendorClients.length === 0) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "No vendor clients found.",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      vendorClients,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong.",
    });
  }
};
