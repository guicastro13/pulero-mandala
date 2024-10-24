import { Get } from "../route_decorator";
import { Request, Response } from 'express';

export class HealthCheck {
    @Get('/health')
    check(req: Request, res: Response) {
        res.send("OK");
    }
}