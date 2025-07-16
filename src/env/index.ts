import 'dotenv/config';
import { z } from 'zod';

export const envSchema = z.object({
  JWT_SECRET: z.string(),
});

const { error, data } = envSchema.safeParse(process.env);

if (error) {
  console.error('Invalid environment variables', error);
  process.exit(1);
}

export const env = data;
