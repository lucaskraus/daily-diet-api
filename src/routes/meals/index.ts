import { knex } from '@/db/index';
import checkJwt from '@/middlewares/check-jwt';
import { FastifyInstance } from 'fastify';
import { MealSchema } from '@/schemas/meals';
import { randomUUID } from 'node:crypto';
import { Meal } from '@/types/meals';

export default async function mealsRoutes(server: FastifyInstance) {
  server.addHook('onRequest', (req, res, done) => {
    checkJwt(req, res, server);
    done();
  });

  server.post('/', async (req, res) => {
    const { name, description, calories, isInDiet } = MealSchema.parse(req.body);

    const meal = await knex('meals')
      .insert({
        id: randomUUID(),
        user_id: req.userId,
        name,
        description,
        calories,
        is_in_diet: isInDiet,
      })
      .returning('*');

    return res.status(201).send({ message: 'Meal created successfully', data: meal });
  });

  server.get('/', async (req, res) => {
    const meals = await knex('meals').where('user_id', req.userId);

    const totalCalories = meals.reduce((sum: number, meal: Meal) => sum + meal.calories, 0);

    return res.status(200).send({ totalCalories, totalMeals: meals.length, data: meals });
  });

  server.get('/:id', async (req, res) => {
    const { id } = req.params as { id: string };
    const meal = await knex('meals').where({ id, user_id: req.userId }).first();

    if (!meal) {
      return res.status(404).send({ status: 'error', message: 'Meal not found' });
    }

    return res.status(200).send({ ...meal });
  });

  server.patch('/:id', async (req, res) => {
    const { id } = req.params as { id: string };
    const { name, description, calories, isInDiet } = MealSchema.parse(req.body);

    const meal = await knex('meals').where({ id, user_id: req.userId }).first();

    if (!meal) {
      return res.status(404).send({ status: 'error', message: 'Meal not found' });
    }

    const updatedMeal = await knex('meals')
      .where({ id, user_id: req.userId })
      .update({ name, description, calories, is_in_diet: isInDiet })
      .returning('*');

    return res.status(200).send({ message: 'Meal updated successfully', data: updatedMeal });
  });

  server.delete('/:id', async (req, res) => {
    const { id } = req.params as { id: string };
    const meal = await knex('meals').where({ id, user_id: req.userId }).first();

    if (!meal) {
      return res.status(404).send({ status: 'error', message: 'Meal not found' });
    }

    await knex('meals').where({ id, user_id: req.userId }).delete();
    const date = new Date().toISOString();

    return res.status(200).send({ message: 'Meal deleted successfully', date });
  });
}
