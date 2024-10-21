import { ILogger } from "../helpers/logger";
import express, { RequestHandler }  from 'express';

export class ApiServer {
  private app: express.Application;
  private logger: ILogger;
  private port: number;
  constructor(logger: ILogger, port: number) {
    this.logger = logger;
    this.port = port;
    this.app = express();
  }
  start() {
    this.app.listen(this.port, () => {
      this.logger.info(`API server started on port ${this.port}`);
    });
  }
  addRoute(route: string, handler: RequestHandler) {
    this.app.use(route, handler);
  }
}

