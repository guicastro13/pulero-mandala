import { Request, Response, NextFunction, RequestHandler } from 'express';
import { isHandlerResponse } from '../types/api.types';

export function responseHandler(handler: RequestHandler): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req, res, next);
      if (isHandlerResponse(result)) {
        const statusCode = result.statusCode ?? 200;
        res.status(statusCode).json(result);
      } else {
        res.send(result);
      }
    } catch (error) {
      next(error);
    }
  };
}