import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default function checkJwt(req: FastifyRequest, res: FastifyReply, server: FastifyInstance) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ status: 'error', message: 'Unauthorized' });
  }

  try {
    const decoded = server.jwt.verify(token) as { id: string; date: Date };
    req.userId = decoded.id;
  } catch (error) {
    console.log(error);
    return res.status(401).send({ status: 'error', message: 'Unauthorized' });
  }
}
