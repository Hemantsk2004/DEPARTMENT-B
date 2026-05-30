import { RequestHandler } from "express";
import { User } from "../models/User";
import { sendResponse } from "../utils/responseHandler";

export const getAllUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    sendResponse(res, 200, true, "Users fetched successfully", users);
  } catch {
    sendResponse(res, 500, false, "Failed to fetch users", null);
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      sendResponse(res, 404, false, "User not found", null);
      return;
    }
    sendResponse(res, 200, true, "User fetched successfully", user);
  } catch {
    sendResponse(res, 500, false, "Failed to fetch user", null);
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const requestingUserId = req.user?.userId;
  const requestingUserRole = req.user?.role;

  // Only allow self-update or admin
  if (requestingUserRole !== "admin" && requestingUserId !== id) {
    sendResponse(res, 403, false, "You can only update your own profile", null);
    return;
  }

  try {
    const { name, email } = req.body;

    // Only admin can change roles
    const updateData: any = { name, email };
    if (requestingUserRole === "admin" && req.body.role) {
      updateData.role = req.body.role;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      sendResponse(res, 404, false, "User not found", null);
      return;
    }

    sendResponse(res, 200, true, "Profile updated successfully", updatedUser);
  } catch (error: any) {
    if (error.code === 11000) {
      sendResponse(res, 400, false, "Email already in use", null);
      return;
    }
    sendResponse(res, 500, false, "Failed to update user", null);
  }
};