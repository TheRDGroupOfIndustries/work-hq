import User from "@/models/User";
import connectToMongoDB from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectToMongoDB();

  try {
    const vendorsAndClients = await User.find({
      role: { $in: ["vendor", "vendorClient", "client"] },
    })
    // .select("username firstName lastName email phone role vendorID clients");

    if (vendorsAndClients.length === 0) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "No vendors or clients found.",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      vendorsAndClients,
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
