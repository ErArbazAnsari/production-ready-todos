import { z } from "zod";

export const todoSchema = z.object({
    todo: z.string().max(100),
    completed: z.boolean(),
});
