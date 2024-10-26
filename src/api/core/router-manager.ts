import express, { RequestHandler, Router } from "express";
import { ILogger } from "../../helpers/logger";
import { HttpMethod, ParameterHandler, RouteDefinition, RouteHandler } from "../types/api.types";
import { RouteHandlerHelper } from "./route-handler-helper";

export class RouterManager {
    private router: Router;
  
    constructor(private logger: ILogger) {
      this.router = express.Router();
    }
  
    registerRoute(
      method: HttpMethod, 
      path: string, 
      handler: RouteHandler, 
      parameterHandlers?: ParameterHandler[]
    ) {
      const wrappedHandler: RequestHandler = async (req, res, next) => {
        try {
          const args = RouteHandlerHelper.extractParameters(req, res, next, parameterHandlers || []);
          const result = await handler(...args);
          res.status(result?.statusCode || 200).json(result);
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