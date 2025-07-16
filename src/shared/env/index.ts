import 'dotenv/config';
import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
});

const { error, data } = envSchema.safeParse(process.env);

if (error) {
  console.error('Invalid environment variables. Please check .env file. 🚨', error);
  process.exit(1);
}

export const env = data;
