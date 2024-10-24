import { Request, Response, NextFunction, RequestHandler } from 'express';

export type RouteDefinition = {
  method: HttpMethod;
  path: string;
  handler: RequestHandler;
  parameterHandlers?: { index: number, type: 'param' | 'body' | 'header', key?: string }[];
}

export type RouteHandler = (req: Request, res: Response, next: NextFunction) => void;

export interface Controller {
  new (...args: any[]): any;
  routes?: { 
    method: HttpMethod; 
    path: string; 
    handlerName: string; 
    parameterHandlers?: { index: number; type: 'param' | 'body' | 'header'; key?: string }[];
  }[];
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface ApiResponse<T = any> {
  statusCode: number;
  success: boolean;
  data?: T;
  message?: string;
}

export interface RouteOptions {
  statusCode?: number;
}