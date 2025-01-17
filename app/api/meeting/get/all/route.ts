import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectToMongoDB from "@/utils/db";
import Meeting from "@/models/Meeting";
import { CustomUser } from "@/lib/types";
import { authOptions } from "@/lib/authOptions";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({
      status: 401,
      success: false,
      error: "Unauthorized",
    });
  }

  const user = session.user as CustomUser;

  if (user.role !== "ceo" && user.role !== "manager") {
    return NextResponse.json({
      status: 403,
      success: false,
      error: "Forbidden",
    });
  }

  await connectToMongoDB();

  try {
    const meetings = await Meeting.find().populate(
      "projectID",
      "projectDetails.projectName"
    );

    return NextResponse.json({
      status: 200,
      success: true,
      message: "All meetings fetched successfully!",
      meetings,
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
