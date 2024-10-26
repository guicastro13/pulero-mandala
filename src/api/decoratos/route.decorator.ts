import { HttpMethod, RouteDefinition } from '../types/api.types';
import 'reflect-metadata';

export class RouteBuilder {
  static addRoute(method: HttpMethod, path: string) {
    return function (target: any, propertyKey: string | symbol) {
      if (!target.constructor.routes) {
        target.constructor.routes = [] as RouteDefinition[];
      }
      target.constructor.routes.push({
        method,
        path,
        handlerName: propertyKey.toString(),
        parameterHandlers: Reflect.getOwnMetadata('route:params', target, propertyKey) || [],
      });
      console.log(`Route registered: [${method.toUpperCase()}] ${path} -> ${propertyKey.toString()}`);
    };
  }

  static addParam(type: 'param' | 'body' | 'header', key?: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
      const existingParams = Reflect.getOwnMetadata('route:params', target, propertyKey) || [];
      existingParams.push({ index: parameterIndex, type, key });
      Reflect.defineMetadata('route:params', existingParams, target, propertyKey);
    };
  }

  static Get(path: string) {
    return RouteBuilder.addRoute(HttpMethod.GET, path);
  }

  static Post(path: string) {
    return RouteBuilder.addRoute(HttpMethod.POST, path);
  }

  static Put(path: string) {
    return RouteBuilder.addRoute(HttpMethod.PUT, path);
  }

  static Delete(path: string) {
    return RouteBuilder.addRoute(HttpMethod.DELETE, path);
  }

  static Param(paramName: string) {
    return RouteBuilder.addParam('param', paramName);
  }

  static Body() {
    return RouteBuilder.addParam('body');
  }

  static Header(headerName: string) {
    return RouteBuilder.addParam('header', headerName);
  }
}