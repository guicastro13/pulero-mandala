import { ILogger } from "../helpers/logger";
import express, { NextFunction, Request, Response } from 'express';
import { Controller, ParameterHandler, RouteDefinition } from "./types/api.types";
import { RouterManager } from "./core/router-manager";
import 'reflect-metadata';

export class ApiServer {
  private app: express.Application;
  private routerManager: RouterManager;
  
  constructor(private logger: ILogger, private port: number) {
    this.logger = logger;
    this.port = port;
    this.app = express();
    this.routerManager = new RouterManager(this.logger);
    this.app.use(express.json());
  }
  start() {
    this.app.use(this.routerManager.getRouter());
    this.app.listen(this.port, () => {
      this.logger.info(`SERVER LISTENING ON:${this.port}`);
    });
  }

  registerControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      const instance = new controller();
      const prototype = Object.getPrototypeOf(instance);
      const routes = controller.routes || [];

      routes.forEach((route: RouteDefinition) => {
        const { method, path, handlerName, parameterHandlers = [] } = route;

        this.app[method](path, async (req: Request, res: Response, next: NextFunction) => {
          try {
            const args = this.extractParameters(req, parameterHandlers);
            const result = await instance[handlerName](...args);
            res.status(result.statusCode).json(result);
          } catch (error) {
            next(error);
          }
        });
        
        this.logger.info(`Route registered: [${method.toUpperCase()}] ${path}`);
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
}

