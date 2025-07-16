import fastify from 'fastify';
import publicRoutes from '@/routes/public';
import mealsRoutes from '@/routes/meals';
import jwt from '@fastify/jwt';
import { env } from '@/env';

const server = fastify();

server.register(jwt, {
  secret: env.JWT_SECRET,
});

server.register(publicRoutes);
server.register(mealsRoutes, { prefix: '/meals' });

server.listen({ port: 3333, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address} ✅`);
});
