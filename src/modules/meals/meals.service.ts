import { MealsRepository } from './meals.repository';
import { Meal } from '@/types/meals';

export class MealsService {
  constructor(private readonly mealsRepository: MealsRepository) {}

  async create(data: Meal) {
    return this.mealsRepository.create(data);
  }

  async getAll(userId: string, filters: { isInDiet?: string; date?: string }) {
    return this.mealsRepository.getAll(userId, filters);
  }

  async getById(id: string, userId: string) {
    return this.mealsRepository.getById(id, userId);
  }

  async update(id: string, userId: string, data: Partial<Meal>) {
    const meal = await this.mealsRepository.getById(id, userId);

    if (!meal) {
      return null;
    }

    const updatedMeal = {
      ...meal,
      ...data,
    };

    await this.mealsRepository.update(id, userId, updatedMeal);

    return updatedMeal;
  }

  async delete(id: string, userId: string) {
    const meal = await this.mealsRepository.getById(id, userId);

    if (!meal) {
      return null;
    }

    await this.mealsRepository.delete(id, userId);

    return true;
  }
}
