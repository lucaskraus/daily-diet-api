import fastify, { FastifyInstance } from 'fastify';
import { knex } from '@/db/index';
import { LoginSchema, UserSchema } from '@/schemas/users';
import { randomUUID } from 'node:crypto';

export default async function publicRoutes(server: FastifyInstance) {
  server.post('/users', async (req, res) => {
    const { data, error } = UserSchema.safeParse(req.body);

    if (error) {
      return res
        .status(400)
        .send({ status: 'error', message: 'Invalid request body', details: error });
    }

    const { name, email, password } = data;

    const id = randomUUID();

    await knex('users').insert({
      id,
      name,
      email,
      password,
    });

    return res.status(201).send({ id, message: 'User created successfully' });
  });

  server.post('/login', async (req, res) => {
    const { email, password } = LoginSchema.parse(req.body);

    const user = await knex('users').where('email', email).andWhere('password', password).first();

    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const loginDate = new Date();

    const token = server.jwt.sign({ id: user.id, date: loginDate }, { expiresIn: '30m' });

    return res.status(200).send({
      loginDate: loginDate.toISOString(),
      message: `User ${user.name} logged in successfully`,
      token,
    });
  });
}
