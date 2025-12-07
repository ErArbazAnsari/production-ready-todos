import { type NextFunction, type Request, type Response } from "express";
import { jwtVerify } from "../utils/jwt.utils.js";

export function authCheck(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    const token = header?.split(" ")[1];
    if (!token) {
        return res.status(403).json({
            status: 403,
            message: "login first",
        });
    }
    const decoded = jwtVerify(token);
    if (!decoded) {
        return res.status(403).json({
            status: 403,
            message: "login first",
        });
    }
    req.headers["userId"] = decoded.userId;
    next();
}
