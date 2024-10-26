import { ILogger } from "../helpers/logger";
import express, { NextFunction, Request, Response } from 'express';
import { Controller, ParameterHandler, RouteDefinition } from "./types/api.types";
import 'reflect-metadata';
import { RouterManager } from "./core/router-manager";

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
    this.routerManager.registerControllers(controllers);
  }
}

