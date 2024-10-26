import { Request, Response, NextFunction } from 'express';

type ParameterHandler = { index: number; type: 'param' | 'body' | 'header'; key?: string };

export class RouteHandlerHelper {
  static extractParameters(
    req: Request,
    res: Response,
    next: NextFunction,
    parameterHandlers: ParameterHandler[] = []
  ): any[] {
    const args: any[] = [];

    parameterHandlers.forEach(({ index, type, key }) => {
        switch (type) {
          case 'param':
            args[index] = req.params?.[key!] || undefined;
            break;
          case 'body':
            args[index] = req.body || undefined;
            break;
          case 'header':
            args[index] = req.headers?.[key!.toLowerCase()] || undefined;
            break;
          default:
            args[index] = undefined;
        }
      });

    return args;
  }
}
