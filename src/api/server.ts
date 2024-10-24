import { ILogger } from "../helpers/logger";
import express, { RequestHandler }  from 'express';
import { RouterManager } from "./routes";
import { Controller, HttpMethod, RouteDefinition } from "./types";

export class ApiServer {
  private app: express.Application;
  private routerManager: RouterManager;
  
  constructor(private logger: ILogger, private port: number) {
    this.logger = logger;
    this.port = port;
    this.app = express();
    this.routerManager = new RouterManager();
  }
  start() {
    this.app.use(this.routerManager.getRouter());
    this.app.listen(this.port, () => {
      this.logger.info(`SERVER LISTENING ON:${this.port}`);
    });
  }

  addRoute(method: HttpMethod, path: string, handler: RequestHandler) {
    this.routerManager.registerRoute(method, path, handler);
  }

  registerControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      const instance = new controller();
      if (controller.routes) {
        controller.routes.forEach(route => {
          const handler = instance[route.handlerName as keyof typeof instance].bind(instance);
          this.addRoute(route.method, route.path, handler);
         this.logger.info(`ROUTE READY [${route.method.toUpperCase()}] [${route.path}]`);
        });
      }
    });
  }
}

