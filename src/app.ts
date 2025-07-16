import fastify from 'fastify';
import { env } from './shared/env';
import jwt from '@fastify/jwt';
import { mealsRoutes } from './modules/meals/meals.routes';
import { usersRoutes } from './modules/users/users.routes';

export const app = fastify();

app.register(jwt, {
  secret: env.JWT_SECRET,
});

app.register(usersRoutes);
app.register(mealsRoutes, {
  prefix: 'meals',
});
