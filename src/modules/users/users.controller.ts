import { FastifyRequest, FastifyReply } from 'fastify';
import { knex } from '../../shared/database';
import { LoginSchema, UserSchema } from './users.schemas';
import { randomUUID } from 'crypto';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const { data, error } = UserSchema.safeParse(request.body);

  if (error) {
    return reply
      .status(400)
      .send({ status: 'error', message: 'Invalid request body', details: error });
  }

  const { name, email, password } = data;

  const id = randomUUID();

  await usersService.create({
    id,
    name,
    email,
    password,
  });

  return reply.status(201).send({ id, message: 'User created successfully' });
}

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = LoginSchema.parse(request.body);

  const user = await usersService.getByEmailAndPassword(email, password);

  if (!user) {
    return reply.status(401).send({ error: 'Invalid credentials' });
  }

  const loginDate = new Date();

  const token = request.server.jwt.sign({ id: user.id, date: loginDate }, { expiresIn: '30m' });

  return reply.status(200).send({
    loginDate: loginDate.toISOString(),
    message: `User ${user.name} logged in successfully`,
    token,
  });
}
