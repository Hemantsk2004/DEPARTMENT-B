import { Request, Response } from "express";

import { User } from "../models/User";

export const getMyPortfolio = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await User.findById(
      req.user?.userId
    ).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio",
    });
  }
};

export const updatePortfolio = async (
  req: Request,
  res: Response
) => {
  try {
    const updateData: any = {
      ...req.body,
    };

    // Convert FormData strings back to arrays

    if (req.body.skills) {
      updateData.skills = JSON.parse(
        req.body.skills
      );
    }

    if (req.body.projects) {
      updateData.projects = JSON.parse(
        req.body.projects
      );
    }

      if (req.file) {
        updateData.avatar =
          `${process.env.BACKEND_URL}/uploads/avatars/${req.file.filename}`;
      }

    const updatedUser =
      await User.findByIdAndUpdate(
        req.user?.userId,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");

    res.status(200).json({
      success: true,
      message:
        "Portfolio updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update portfolio",
    });
  }
};

export const getPublicPortfolio = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch public portfolio",
    });
  }
};