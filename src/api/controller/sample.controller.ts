import { RouteBuilder } from "../decoratos/route.decorator";
import { HandlerResponse } from "../types/api.types";
import { HttpStatusCode } from "../types/http-status-code";

export class SampleController {
    @RouteBuilder.Get('/user/:id')
    getUser(@RouteBuilder.Param('id') userId: string): HandlerResponse {
      return { statusCode: HttpStatusCode.OK , message: userId};
    }
  
    @RouteBuilder.Post('/user')
    createUser(@RouteBuilder.Body() body: { name: string; age: number }) : HandlerResponse{
      return {
        statusCode: HttpStatusCode.CREATED,
        message: "User created",
        data: body,
      };
    }
  
    @RouteBuilder.Get('/auth')
    checkAuth(@RouteBuilder.Header('authorization') token: string): HandlerResponse {
      if (!token) {
        return { statusCode: HttpStatusCode.UNAUTHORIZED, message: "Unauthorized" };
      }
      return { statusCode: HttpStatusCode.OK, message: "Authorized" };
    }
  
    @RouteBuilder.Put('/user/:id')
    updateUser(
      @RouteBuilder.Param('id') userId: string,
      @RouteBuilder.Body() body: { name?: string; age?: number }
    ) : HandlerResponse{
      return {
        statusCode: HttpStatusCode.OK,
        message: "User updated",
        data: body,
      };
    }
  
    @RouteBuilder.Delete('/user/:id')
    deleteUser(@RouteBuilder.Param('id') userId: string) : HandlerResponse{
      return { statusCode: HttpStatusCode.OK, message: `User ${userId} deleted` };
    }
  }