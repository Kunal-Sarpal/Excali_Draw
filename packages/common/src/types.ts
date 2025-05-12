import { z } from "zod";

export const createUserSchema = z.object({
    email:z.string().email(), 
    password:z.string().min(8),
    name:z.string()
})
export const siginSchema = z.object({
    email:z.string().email(), 
    password:z.string().min(8),
})
export const createRoomSchema = z.object({
    name:z.string().min(3).max(20), 
})