import { z } from 'zod';

export const MealSchema = z.object({
  name: z.string(),
  description: z.string(),
  calories: z.number(),
  isInDiet: z.boolean(),
});
