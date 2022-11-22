import { FastifyRequest } from 'fastify';

export interface ReqCustom extends FastifyRequest {
  user: {
    userId: number;
    email: string;
  };
}
