import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { userSchema } from "../types/users.types.js";
import { UsersModal } from "../models/users.models.js";

// ---- Config & helpers ----

const JWT_SIGNATURE = process.env.JWT_SIGNATURE;
const JWT_EXPIRY = process.env.JWT_EXPIRY ?? "7d";

if (!JWT_SIGNATURE) {
    // Fail fast on startup instead of crashing on first request
    throw new Error("JWT_SIGNATURE environment variable is required");
}

function generateToken(payload: { email: string; userId: string }) {
    return jwt.sign(payload, JWT_SIGNATURE!, {
        expiresIn: JWT_EXPIRY,
    } as jwt.SignOptions);
}

function setAuthCookie(res: Response, token: string) {
    res.cookie("token", "Bearer " + token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // only HTTPS in prod
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });
}

// ---- Controllers ----

export async function signup(req: Request, res: Response) {
    try {
        const user = req.body;

        // validate input
        const validateUser = userSchema.safeParse(user);
        if (!validateUser.success) {
            return res.status(400).json({
                message: "User information is not in the correct format",
                errors: validateUser.error.format(),
            });
        }

        // check if user already exists
        const existingUser = await UsersModal.findOne({ email: user.email });
        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(user.password, 12);

        // create user
        const newUser = await UsersModal.create({
            ...user,
            password: hashedPassword,
        });

        // you can also use newUser.id (string) if you're using Mongoose
        const token = generateToken({
            email: (newUser as any).email,
            userId: (newUser as any)._id.toString(),
        });

        setAuthCookie(res, token);

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: (newUser as any).name,
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            message: "Something went wrong while creating user",
        });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const validateUser = userSchema
            .pick({ email: true, password: true })
            .safeParse({ email, password });
        if (!validateUser.success) {
            return res.status(400).json({
                message: "User information is not in the correct format",
                errors: validateUser.error.format(),
            });
        }

        // find user
        const userRes = await UsersModal.findOne({ email });
        if (!userRes) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // validate password
        const validPassword = await bcrypt.compare(
            password,
            userRes.password ?? ""
        );
        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = generateToken({
            email: userRes.email,
            userId: userRes._id.toString(),
        });

        setAuthCookie(res, token);

        return res.status(200).json({
            message: "User signed in successfully",
            token: token,
            user: userRes.name,
        });
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({
            message: "Something went wrong while user login",
        });
    }
}

export async function logout(req: Request, res: Response) {
    try {
        // Clear the httpOnly cookie
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Something went wrong while logging out",
        });
    }
}

export async function getCurrentUser(req: Request, res: Response) {
    try {
        const userId = (req as any).userId;
        const user = await UsersModal.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Get user error:", error);
        return res.status(500).json({
            message: "Something went wrong while fetching user",
        });
    }
}

function refreshToken() {}
function forgotPassword() {}
function deleteAccount() {}

export default {
    login,
    signup,
    logout,
    getCurrentUser,
    refreshToken,
    forgotPassword,
    deleteAccount,
};
