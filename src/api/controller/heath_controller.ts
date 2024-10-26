import { Get } from "../decoratos/route.decorator";


export class HealthCheck {
    @Get('/health')
    check() {
      return { statusCode: 200, message: "Service is healthy" };
    }
}