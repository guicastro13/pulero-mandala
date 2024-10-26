import { RouteBuilder } from "../decoratos/route.decorator";

export class HealthCheck {
    @RouteBuilder.Get('/health')
    check() {
      return { statusCode: 200, message: "Service is healthy" };
    }
}