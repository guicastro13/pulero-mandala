import { ILogger } from "../helpers/logger";
import express, { Request, Response, NextFunction }  from 'express';
import { Controller, HttpMethod } from "./types/api.types";
import { RouteHandlerHelper } from "./core/route-handler-helper";
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

  addRoute(method: HttpMethod, path: string, handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
    this.routerManager.registerRoute(method, path, handler);
  }

  registerControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      const instance = new controller();
      if (controller.routes) {
        this.logger.info(`Registering routes for controller: ${controller.name}`);
        controller.routes.forEach(route => {
          this.logger.info(`Registering route: [${route.method.toUpperCase()}] ${route.path}`);
          
          const handler: (req: Request, res: Response, next: NextFunction) => Promise<void> = async (req, res, next) => {
            try {
              const args = RouteHandlerHelper.extractParameters(
                req, res, next, route.parameterHandlers || []
              );
              const result = await Promise.resolve(instance[route.handlerName](...args));
              res.locals.result = result;
              next();
            } catch (error) {
              next(error);
            }
          };
          this.addRoute(route.method, route.path, handler);
          this.logger.info(`ROUTE READY [${route.method.toUpperCase()}] [${route.path}]`);
        });
      } else {
        this.logger.error(`No routes found for controller: ${controller.name}`);
      }
    });
  }
}

