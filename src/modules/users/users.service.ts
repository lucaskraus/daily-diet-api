import { UsersRepository } from './users.repository';
import { User } from '@/types/users';

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: User) {
    return this.usersRepository.create(data);
  }

  async getByEmailAndPassword(email: string, password: string) {
    return this.usersRepository.getByEmailAndPassword(email, password);
  }
}
