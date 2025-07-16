import { FastifyInstance } from 'fastify';
import { createMeal, deleteMeal, getAllMeals, getMealById, updateMeal } from './meals.controller';

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', createMeal);
  app.get('/', getAllMeals);
  app.get('/:id', getMealById);
  app.patch('/:id', updateMeal);
  app.delete('/:id', deleteMeal);
}
