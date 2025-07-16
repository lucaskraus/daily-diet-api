import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default function checkJwt(req: FastifyRequest, res: FastifyReply, server: FastifyInstance) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ status: 'error', message: 'Unauthorized' });
  }

  try {
    const decoded = server.jwt.verify(token) as { id: string; date: Date };
    req.userId = decoded.id;
  } catch (error) {
    return res.status(401).send({ status: 'error', message: 'Unauthorized' });
  }
}
