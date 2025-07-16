import { knex } from '../../shared/database';
import { Meal } from '@/types/meals';

export class MealsRepository {
  async create(data: Meal) {
    return knex('meals').insert(data).returning('*');
  }

  async getAll(userId: string, filters: { isInDiet?: string; date?: string }) {
    let query = knex('meals').where('user_id', userId);

    if (filters.isInDiet) {
      query = query.andWhere('is_in_diet', filters.isInDiet === 'true' ? 1 : 0);
    }

    if (filters.date) {
      query = query.andWhereRaw('DATE("date") = ?', [filters.date]);
    }

    return query;
  }

  async getById(id: string, userId: string) {
    return knex('meals').where({ id, user_id: userId }).first();
  }

  async update(id: string, userId: string, data) {
    return knex('meals').where({ id, user_id: userId }).update(data);
  }

  async delete(id: string, userId: string) {
    return knex('meals').where({ id, user_id: userId }).delete();
  }
}
