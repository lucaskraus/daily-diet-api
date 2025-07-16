import { knex } from '@/db/index';
import checkJwt from '@/middlewares/check-jwt';
import { FastifyInstance } from 'fastify';

export default async function mealsRoutes(server: FastifyInstance) {
  server.addHook('onRequest', (req, res, done) => {
    checkJwt(req, res, server);
    done();
  });

  server.get('/', async (req, res) => {
    const meals = await knex('meals').select('*');
    return res.status(200).send(meals);
  });
}
