import jwt from "jsonwebtoken";

// sign function
export function jwtSign(payload: { email: string; userId: string }) {
    return jwt.sign(payload, process.env.JWT_SIGNATURE!, {
        expiresIn: process.env.JWT_EXPIRY!,
    } as jwt.SignOptions);
}

// verify function
export function jwtVerify(token: string) {
    return jwt.verify(token, process.env.JWT_SIGNATURE!) as {
        email: string;
        userId: string;
        iat: number;
        exp: number;
    };
}
