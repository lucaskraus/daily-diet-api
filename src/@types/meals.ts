interface Meal {
  id: string;
  name: string;
  description: string;
  calories: number;
  is_in_diet: number | boolean;
  user_id: string;
}

export type { Meal };
