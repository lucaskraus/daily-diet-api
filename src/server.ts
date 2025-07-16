import fastify from 'fastify';
import { publicRoutes } from '@/routes/public';

const server = fastify();

server.register(publicRoutes);

server.listen({ port: 3333, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address} ✅`);
});
