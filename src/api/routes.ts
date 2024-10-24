import express, { RequestHandler, Router } from 'express';
import { HttpMethod } from './types';

export class RouterManager {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  registerRoute(method: HttpMethod, path: string, handler: RequestHandler) {
    switch (method) {
      case HttpMethod.GET:
        this.router.get(path, handler);
        break;
      case HttpMethod.POST:
        this.router.post(path, handler);
        break;
      case HttpMethod.PUT:
        this.router.put(path, handler);
        break;
      case HttpMethod.DELETE:
        this.router.delete(path, handler);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }

  getRouter() {
    return this.router;
  }
}