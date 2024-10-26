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

export interface HandlerResponse<T = any> {
  statusCode?: number;
  success?: boolean;
  data?: T;
  message?: string;
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export function isHandlerResponse(obj: any): obj is HandlerResponse {
  return obj && typeof obj === 'object' && 'statusCode' in obj;
}

export interface RouteOptions {
  statusCode?: number;
}