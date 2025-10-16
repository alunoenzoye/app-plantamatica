import { z } from "zod";
export const CallRequest = z.object({
    name: z.string().max(255),
    description: z.string().max(65535).nullable().optional()
});
export const ProfileUpdateRequest = z.object({
    name: z.string().max(255),
    email: z.string().email().max(255)
});
export const LoginRequest = z.object({
    email: z.string().email(),
    password: z.string()
});
export const TaskRequest = z.object({
    name: z.string().max(255),
    priority: z.string(),
    due_date: z.date().optional(),
    description: z.string().max(65535).nullable().optional()
});
export const CompleteTaskRequest = z.object({
    done: z.boolean()
});
