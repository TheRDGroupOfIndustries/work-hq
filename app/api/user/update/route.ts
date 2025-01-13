import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToMongoDB from "@/utils/db";
import User from "@/models/User";

export const PUT = async (request: NextRequest) => {
  const {
    _id,
    username,
    firstName,
    lastName,
    profileImage,
    authIntegrated,
    email,
    phone,
    loginStep,
    role,
    password,
    clients,
    vendorID,
    allProjects,
    workStatus,
    workingHoursRanges,
    joiningDate,
    position,
    myProjects,
    totalSpendHours,
    performance,
    vendorBasedProjects,
  } = await request.json();

  await connectToMongoDB();

  try {
    const existingUser = await User.findById(_id);

    if (!existingUser) {
      return NextResponse.json({
        success: false,
        error: "User not found!",
      });
    }

    const changedFields = [];

    if (username !== undefined) {
      existingUser.username = username;
      changedFields.push("username");
    }
    if (firstName !== undefined) {
      existingUser.firstName = firstName;
      changedFields.push("firstName");
    }
    if (lastName !== undefined) {
      existingUser.lastName = lastName;
      changedFields.push("lastName");
    }
    if (profileImage !== undefined) {
      existingUser.profileImage = profileImage;
      changedFields.push("profileImage");
    }
    if (authIntegrated !== undefined) {
      existingUser.authIntegrated = authIntegrated;
      changedFields.push("authIntegrated");
    }
    if (email !== undefined) {
      existingUser.email = email;
      changedFields.push("email");
    }
    if (phone !== undefined) {
      existingUser.phone = phone;
      changedFields.push("phone");
    }
    if (loginStep !== undefined) {
      existingUser.loginStep = loginStep;
      changedFields.push("loginStep");
    }
    if (role !== undefined) {
      existingUser.role = role;
      changedFields.push("role");
    }
    if (password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      existingUser.password = hashedPassword;
      changedFields.push("password");
    }
    if (clients !== undefined) {
      existingUser.clients = clients;
      changedFields.push("clients");
    }
    if (vendorID !== undefined) {
      existingUser.vendorID = vendorID;
      changedFields.push("vendorID");
    }
    if (allProjects !== undefined) {
      existingUser.allProjects = allProjects;
      changedFields.push("allProjects");
    }
    if (workStatus !== undefined) {
      existingUser.workStatus = workStatus;
      changedFields.push("workStatus");
    }
    if (workingHoursRanges !== undefined) {
      existingUser.workingHoursRanges = workingHoursRanges;
      changedFields.push("workingHoursRanges");
    }
    if (joiningDate !== undefined) {
      existingUser.joiningDate = new Date(joiningDate);
      changedFields.push("joiningDate");
    }
    if (position !== undefined) {
      existingUser.position = position;
      changedFields.push("position");
    }
    if (myProjects !== undefined) {
      const newProjects = myProjects.map((id: string) => id.toString());
      const existingProjects = existingUser.myProjects.map((id: string) => id.toString());

      // Add new IDs that are not already in existingTeams
      const additions = newProjects.filter((id : string) => !existingProjects.includes(id));

      // Remove IDs that are not in newTeams
      const removals = existingProjects.filter((id:string) => !newProjects.includes(id));

      if (additions.length || removals.length) {
        existingUser.myProjects = [
          ...existingProjects, // Retain existing teams
          ...additions,     // Add only new unique IDs
        ];
      }

      


      
      changedFields.push("myProjects");
    }
    if (totalSpendHours !== undefined) {
      existingUser.totalSpendHours = totalSpendHours;
      changedFields.push("totalSpendHours");
    }
    if (performance !== undefined) {
      existingUser.performance = performance;
      changedFields.push("performance");
    }
    if (vendorBasedProjects !== undefined) {
      existingUser.vendorBasedProjects = vendorBasedProjects;
      changedFields.push("vendorBasedProjects");
    }

    const updatedUser = await existingUser.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "User updated successfully!",
      user: updatedUser,
      updatedFields: changedFields,
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