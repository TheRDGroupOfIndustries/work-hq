import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/utils/db";
import Project from "@/models/Project";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { _id: string } }
) => {
  const { fileIds } = await request.json();
  try {
    await connectToMongoDB();

    const project = await Project.findByIdAndUpdate(
      params._id,
      {
        $pull: {
          additionalFiles: {
            _id: { $in: fileIds },
          },
        },
      },
      { new: true } // Return the updated document
    );

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Files removed successfully!",
      project,
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
