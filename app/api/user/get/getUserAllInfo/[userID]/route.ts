import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectToMongoDB from "@/utils/db";
import { CustomUser } from "@/lib/types";
import { authOptions } from "@/lib/authOptions";
import User from "@/models/User";

export const GET = async (request: NextRequest, { params }: { params: { userID: string } }) => {
  const session = await getServerSession(authOptions);

  const { userID } = params;

  if (!userID) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "User ID is required",
    });
  }

  // Check if user is authenticated
  if (!session) {
    return NextResponse.json({
      status: 401,
      success: false,
      error: "Unauthorized",
    });
  }

  const user = session.user as CustomUser;

  // Check if the user has a manager role
  if (user.role !== "manager" && user.role !== "ceo") {
    return NextResponse.json({
      status: 403,
      success: false,
      error: "Forbidden: Only managers can access this resource.",
    });
  }

  // Connect to the database
  await connectToMongoDB();

  try {
    // Fetch user data by ID from params
    const userData = await User.findById(params.userID)
    .populate("myProjects allProjects")

    if (!userData) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "User not found.",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      userData,
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
