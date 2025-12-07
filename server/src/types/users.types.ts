import { z } from "zod";

export const userSchema = z.object({
    name: z.string(),
    email: z.string().min(3).max(100),
    password: z.string().min(8).max(20),
});
