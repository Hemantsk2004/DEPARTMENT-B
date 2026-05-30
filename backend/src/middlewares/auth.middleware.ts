import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/responseHandler";

interface TokenPayload {
  userId: string;
  role: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    sendResponse(res, 401, false, "No token provided", null);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    req.user = decoded;
    next();
  } catch {
    sendResponse(res, 401, false, "Invalid or expired token", null);
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      sendResponse(res, 403, false, "Access denied: insufficient permissions", null);
      return;
    }
    next();
  };
};