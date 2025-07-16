import { FastifyInstance } from 'fastify';
import { createMeal, deleteMeal, getAllMeals, getMealById, updateMeal } from './meals.controller';
import checkJwt from '@/shared/middlewares/check-jwt';

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    await checkJwt(request, reply, app);
  });

  app.post('/', createMeal);
  app.get('/', getAllMeals);
  app.get('/:id', getMealById);
  app.patch('/:id', updateMeal);
  app.delete('/:id', deleteMeal);
}
