import { Request, Response } from "express";
import Opportunity from "../models/Opportunity";

export const createOpportunity = async (
  req: Request,
  res: Response
) => {
  try {
    const opportunity = await Opportunity.create({
      ...req.body,
      createdBy: req.user?.userId,
    });

    res.status(201).json({
      success: true,
      message: "Opportunity created successfully",
      data: opportunity,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create opportunity",
    });
  }
};

export const getAllOpportunities = async (
  req: Request,
  res: Response
) => {
  try {
    const opportunities = await Opportunity.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      data: opportunities,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch opportunities",
    });
  }
};

export const deleteOpportunity = async (
  req: Request,
  res: Response
) => {
  try {
    const deletedOpportunity =
      await Opportunity.findByIdAndDelete(req.params.id);

if (!deletedOpportunity) {
  res.status(404).json({
    success: false,
    message: "Opportunity not found",
  });
  return;
}

    res.status(200).json({
      success: true,
      message: "Opportunity deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete opportunity",
    });
  }
};

export const saveOpportunity = async (
  req: Request,
  res: Response
) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
  res.status(404).json({
    success: false,
    message: "Opportunity not found",
  });
  return;
}

    const userId = req.user?.userId;

    const alreadySaved = opportunity.savedBy.some(
  (id) => id.toString() === userId
);

if (!userId) {
  res.status(401).json({
    success: false,
    message: "Unauthorized user",
  });
  return;
}
if (!alreadySaved) {
  opportunity.savedBy.push(userId as any);
  await opportunity.save();
}

    res.status(200).json({
      success: true,
      message: "Opportunity saved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save opportunity",
    });
  }
};