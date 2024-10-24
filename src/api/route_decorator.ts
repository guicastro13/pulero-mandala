import { HttpMethod, RouteDefinition } from "./types";

function route(method: HttpMethod, path: string): MethodDecorator {
    return (target: any, propertyKey: string | symbol) => {
      if (!target.constructor.routes) {
        target.constructor.routes = [] as RouteDefinition[];
      }
      target.constructor.routes.push({ method, path, handlerName: propertyKey });
    };
  }
  
  export function Get(path: string) {
    return route(HttpMethod.GET, path);
  }
  
  export function Post(path: string) {
    return route(HttpMethod.POST, path);
  }
  
  export function Put(path: string) {
    return route(HttpMethod.PUT, path);
  }
  
  export function Delete(path: string) {
    return route(HttpMethod.DELETE, path);
  }