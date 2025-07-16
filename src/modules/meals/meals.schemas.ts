import { z } from 'zod';

export const MealSchema = z.object({
  name: z.string(),
  description: z.string(),
  calories: z.number(),
  isInDiet: z.boolean(),
});

export const PatchMealSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  calories: z.number().optional(),
  isInDiet: z.boolean().optional(),
});
