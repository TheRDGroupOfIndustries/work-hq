import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectToMongoDB from "@/utils/db";
import Project from "@/models/Project";
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
  console.log("server side user while userID projects: \n", user);
  await connectToMongoDB();

  try {
    let projects;

    if (user.role === "developer") {
      projects = await Project.find({ "developmentDetails.teams": user._id });
    } else if (user.role === "client" || user.role === "vendorClient") {
      projects = await Project.find({ "companyDetails.clientID": user._id });
    } else if (user.role === "vendor") {
      projects = await Project.find({ "projectDetails.vendorID": user._id });
    } else {
      return NextResponse.json({
        status: 403,
        success: false,
        error: "Forbidden",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      projects,
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
