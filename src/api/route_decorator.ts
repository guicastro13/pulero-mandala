import { HttpMethod, RouteDefinition } from "./types";
import 'reflect-metadata';

function route(method: HttpMethod, path: string): MethodDecorator {
    return (target: any, propertyKey: string | symbol) => {
      if (!target.constructor.routes) {
        target.constructor.routes = [] as RouteDefinition[];
      }
      target.constructor.routes.push({ method, path, handlerName: propertyKey });
    };
  }
  
  export const Get = (path: string) => route(HttpMethod.GET, path);
  export const Post = (path: string) => route(HttpMethod.POST, path);
  export const Put = (path: string) => route(HttpMethod.PUT, path);
  export const Delete = (path: string) => route(HttpMethod.DELETE, path);

export function Param(paramName: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
      const existingParams = Reflect.getOwnMetadata('route:params', target, propertyKey) || [];
      existingParams.push({ index: parameterIndex, paramName });
      Reflect.defineMetadata('route:params', existingParams, target, propertyKey);
    };
  }
  
  export function Body() {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
      Reflect.defineMetadata('route:body', parameterIndex, target, propertyKey);
    };
  }
  
  export function Header(headerName: string) {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
      const existingHeaders = Reflect.getOwnMetadata('route:headers', target, propertyKey) || [];
      existingHeaders.push({ index: parameterIndex, headerName });
      Reflect.defineMetadata('route:headers', existingHeaders, target, propertyKey);
    };
  }