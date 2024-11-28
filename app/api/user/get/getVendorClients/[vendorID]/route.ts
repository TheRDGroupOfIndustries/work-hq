import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";

export const GET = async (request: NextRequest, { params }: { params: { vendorID: string } }) => {
  const { vendorID } = params;

  if (!vendorID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "Vendor ID is required.",
    });
  }

  await connectToMongoDB();

  try {
    const vendorClients = await User.find({ vendorID }).select("username firstName lastName email phone");

    if (vendorClients.length === 0) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "No clients found for this vendor.",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      clients: vendorClients,
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
