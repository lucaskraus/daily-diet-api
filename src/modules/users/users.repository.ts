import { knex } from '../../shared/database';

export class UsersRepository {
  async create(data) {
    return knex('users').insert(data);
  }

  async getByEmail(email: string) {
    return knex('users').where('email', email).first();
  }

  async getByEmailAndPassword(email: string, password) {
    return knex('users').where('email', email).andWhere('password', password).first();
  }
}
