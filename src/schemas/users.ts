import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const TokenSchema = z.object({
  id: z.string(),
  date: z.string(),
});

export type User = z.infer<typeof UserSchema>;
