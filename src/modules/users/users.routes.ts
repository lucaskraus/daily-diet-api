import { FastifyInstance } from 'fastify';
import { createUser, login } from './users.controller';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUser);
  app.post('/login', login);
}
