import { Request, Response, NextFunction } from 'express';

export type RouteDefinition = {
  method: HttpMethod;
  path: string;
  handlerName: string | symbol;
};

export type RouteHandler = (req: Request, res: Response, next: NextFunction) => void;

export interface Controller {
  new (...args: any[]): any;
  routes?: RouteDefinition[];
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}