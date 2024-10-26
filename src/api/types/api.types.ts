import { Request, Response, NextFunction, RequestHandler } from 'express';

export type RouteHandler = (...args: any[]) => Promise<HandlerResponse | void>;

export interface HandlerResponse<T = any> {
  statusCode?: number;
  success?: boolean;
  data?: T;
  message?: string;
}

export interface Controller {
  new (...args: any[]): any;
  routes?: RouteDefinition[];
}

export type RouteDefinition = {
  method: HttpMethod;
  path: string;
  handlerName: string;
  parameterHandlers?: ParameterHandler[];
};

export type ParameterHandler = {
  index: number;
  type: 'param' | 'body' | 'header';
  key?: string;
};

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}