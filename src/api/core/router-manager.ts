import express, { Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction, RequestHandler, Router } from 'express';
import { HttpMethod } from '../types/api.types';
import { ILogger } from '../../helpers/logger';
import { RouteHandlerHelper } from './route-handler-helper';

export class RouterManager {
    private router: Router;
  
    constructor(private logger: ILogger) {
      this.router = express.Router();
    }
  
    registerRoute(
      method: HttpMethod, 
      path: string, 
      handler: (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => Promise<void>, 
      parameterHandlers?: any[]
    ) {
      const wrappedHandler: RequestHandler = async (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
        try {
          const args = RouteHandlerHelper.extractParameters(req, res, next, parameterHandlers);
          const result = await handler(req, res, next);
          res.locals.result = result;
          next();
        } catch (error) {
          next(error);
        }
      };
  
    
        switch (method) {
          case HttpMethod.GET:
            this.router.get(path, wrappedHandler);
            break;
          case HttpMethod.POST:
            this.router.post(path, wrappedHandler);
            break;
          case HttpMethod.PUT:
            this.router.put(path, wrappedHandler);
            break;
          case HttpMethod.DELETE:
            this.router.delete(path, wrappedHandler);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }
      }
  
    getRouter() {
      return this.router;
    }
  }