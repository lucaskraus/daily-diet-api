import { FastifyRequest, FastifyReply } from 'fastify';
import { knex } from '@/db/index';
import { MealSchema, PatchMealSchema } from './meals.schemas';
import { randomUUID } from 'crypto';
import { Meal } from '@/types/meals';
import { MealsService } from './meals.service';
import { MealsRepository } from './meals.repository';

const mealsRepository = new MealsRepository();
const mealsService = new MealsService(mealsRepository);

export async function createMeal(request: FastifyRequest, reply: FastifyReply) {
  const { name, description, calories, isInDiet } = MealSchema.parse(request.body);

  const meal = await mealsService.create({
    id: randomUUID(),
    user_id: request.userId,
    name,
    description,
    calories,
    is_in_diet: isInDiet,
  });

  return reply.status(201).send({ message: 'Meal created successfully', data: meal });
}

export async function getAllMeals(request: FastifyRequest, reply: FastifyReply) {
  const { isInDiet, date } = request.query as {
    isInDiet: string;
    date: string;
  };

  const mealsRaw = await mealsService.getAll(request.userId, {
    isInDiet,
    date,
  });

  let totalCalories = 0;
  let totalMealsInDiet = 0;

  const meals = mealsRaw.map((meal: Meal) => {
    const isInDiet = meal.is_in_diet === 1;
    if (isInDiet) totalMealsInDiet++;
    totalCalories += meal.calories;

    return {
      ...meal,
      is_in_diet: isInDiet,
    };
  });

  const totalMeals = meals.length;

  return reply
    .status(200)
    .send({
      total_calories: totalCalories,
      total_meals_in_diet: totalMealsInDiet,
      total_meals: totalMeals,
      data: meals,
    });
}

export async function getMealById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const meal = await mealsService.getById(id, request.userId);

  if (!meal) {
    return reply.status(404).send({ status: 'error', message: 'Meal not found' });
  }

  return reply.status(200).send({ ...meal });
}

export async function updateMeal(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { name, description, calories, isInDiet } = PatchMealSchema.parse(request.body);

  const updatedMeal = await mealsService.update(id, request.userId, {
    name,
    description,
    calories,
    is_in_diet: isInDiet,
  });

  if (!updatedMeal) {
    return reply.status(404).send({ status: 'error', message: 'Meal not found' });
  }

  return reply.status(200).send({ message: 'Meal updated successfully', data: updatedMeal });
}

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const result = await mealsService.delete(id, request.userId);

  if (!result) {
    return reply.status(404).send({ status: 'error', message: 'Meal not found' });
  }

  const date = new Date().toISOString();

  return reply.status(200).send({ message: 'Meal deleted successfully', date });
}
