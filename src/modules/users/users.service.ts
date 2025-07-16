import { UsersRepository } from './users.repository';

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data) {
    return this.usersRepository.create(data);
  }

  async getByEmail(email: string) {
    return this.usersRepository.getByEmail(email);
  }

  async getByEmailAndPassword(email: string, password: string) {
    return this.usersRepository.getByEmailAndPassword(email, password);
  }
}
