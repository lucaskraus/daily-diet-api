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
    const { isInDiet, date } = req.query as { isInDiet: string; date: string };

    let query = knex('meals').where('user_id', req.userId);

    if (isInDiet) {
      query = query.andWhere('is_in_diet', isInDiet === 'true' ? 1 : 0);
    }

    if (date) {
      query = query.andWhereRaw('DATE("date") = ?', [date]);
    }

    let totalCalories = 0;
    let totalMealsInDiet = 0;

    const meals = (await query).map((meal: Meal) => {
      const isInDiet = meal.is_in_diet === 1;
      if (isInDiet) totalMealsInDiet++;
      totalCalories += meal.calories;

      return {
        ...meal,
        is_in_diet: isInDiet,
      };
    });

    const totalMeals = meals.length;

    return res.status(200).send({ totalCalories, totalMealsInDiet, totalMeals, data: meals });
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
