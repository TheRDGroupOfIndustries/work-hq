import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Meet from "@/models/Meeting";

export const GET = async () => {
  await connectToMongoDB();

  try {
    const meets = await Meet.find();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "All projects meets fetched successfully!",
      meets,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: "Something went wrong!",
    });
  }
};
