import express, { NextFunction, Request, Response, Router } from "express";
import { ILogger } from "../../helpers/logger";
import { Controller, ParameterHandler, RouteDefinition } from "../types/api.types";

export class RouterManager {
    private router: Router;
  
    constructor(private logger: ILogger) {
      this.router = express.Router();
    }
  
    registerControllers(controllers: Controller[]) {
      controllers.forEach(controller => {
        const instance = new controller();
        const prototype = Object.getPrototypeOf(instance);
        const routes: RouteDefinition[] = controller.routes || [];
  
        routes.forEach((route: RouteDefinition) => {
          const { method, path, handlerName, parameterHandlers = [] } = route;
  
          this.router[method](path, async (req: Request, res: Response, next: NextFunction) => {
            try {
              const args = this.extractParameters(req, parameterHandlers);
              const result = await instance[handlerName](...args);
              res.status(result.statusCode).json(result);
            } catch (error) {
              next(error);
            }
          });
  
          this.logger.info(`ROUTE READY: [${method.toUpperCase()}] ${path}`);
        });
      });
    }

    private extractParameters(req: Request, handlers: ParameterHandler[] = []) {
      return handlers
        .sort((a, b) => a.index - b.index)
        .map(handler => {
          switch (handler.type) {
            case 'param':
              return handler.key ? req.params[handler.key] : undefined;
            case 'body':
              return req.body;
            case 'header':
              return handler.key ? req.headers[handler.key.toLowerCase()] : undefined;
          }
        });
    }

    getRouter() {
      return this.router;
    }
}