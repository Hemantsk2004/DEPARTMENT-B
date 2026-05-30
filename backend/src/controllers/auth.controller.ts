import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../utils/responseHandler";

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const registerUser: AsyncRequestHandler = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      sendResponse(res, 400, false, "Name, email and password are required", null);
      return;
    }

    // Prevent registering as admin via API
    const safeRole = role === "admin" ? "student" : role || "student";

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      sendResponse(res, 400, false, "An account with this email already exists", null);
      return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name, email: email.toLowerCase(), password: hashedPassword, role: safeRole });
    await newUser.save();

    sendResponse(res, 201, true, "Account created successfully. Please login.", null);
  } catch (error) {
    console.error("Register error:", error);
    sendResponse(res, 500, false, "Registration failed", null);
  }
};

export const loginUser: AsyncRequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      sendResponse(res, 400, false, "Email and password are required", null);
      return;
    }

    // Fix: explicitly select password since it's select:false in schema
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      sendResponse(res, 401, false, "Invalid email or password", null);
      return;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      sendResponse(res, 401, false, "Invalid email or password", null);
      return;
    }

    const userObject = user.toObject();
    delete (userObject as any).password;
    const token = generateToken(userObject);

    sendResponse(res, 200, true, "Login successful", { user: userObject, token });
  } catch (error) {
    console.error("Login error:", error);
    sendResponse(res, 500, false, "Login failed", null);
  }
};

export const verifyToken: AsyncRequestHandler = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    sendResponse(res, 401, false, "No token provided", null);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      sendResponse(res, 404, false, "User not found", null);
      return;
    }

    sendResponse(res, 200, true, "Token valid", user);
  } catch {
    sendResponse(res, 401, false, "Invalid or expired token", null);
  }
};