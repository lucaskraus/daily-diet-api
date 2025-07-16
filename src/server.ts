import fastify from 'fastify';

const server = fastify();

server.get('/', async (req, res) => {
  res.send('Hello World');
});

server.listen({ port: 3333, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address} ✅`);
});
