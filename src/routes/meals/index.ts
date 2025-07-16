import { knex } from '@/db/index';
import checkJwt from '@/middlewares/check-jwt';
import { FastifyInstance } from 'fastify';
import { MealSchema } from '@/schemas/meals';
import { env } from '@/env';

export default async function mealsRoutes(server: FastifyInstance) {
  server.addHook('onRequest', (req, res, done) => {
    checkJwt(req, res, server);
    done();
  });

  server.post('/', async (req, res) => {
    const { name, description, calories, isInDiet } = MealSchema.parse(req.body);

    const meal = await knex('meals').insert({
      name,
      description,
      calories,
      is_in_diet: isInDiet,
      user_id: req.userId,
    });

    return res.status(201).send({ message: 'Meal created successfully', data: meal });
  });
}
