import { Body, Delete, Get, Header, Param, Post, Put } from "../decoratos/route.decorator";

import { HttpStatusCode } from "../types/http-status-code";

export class SampleController {
    @Get('/user/:id')
    getUser(@Param('id') userId: string) {
      return { statusCode: HttpStatusCode.OK , message: userId};
    }
  
    @Post('/user')
    createUser(@Body() body: { name: string; age: number }) {
      return {
        statusCode: HttpStatusCode.CREATED,
        message: "User created",
        data: body,
      };
    }
  
    @Get('/auth')
    checkAuth(@Header('authorization') token: string) {
      if (!token) {
        return { statusCode: HttpStatusCode.UNAUTHORIZED, message: "Unauthorized" };
      }
      return { statusCode: HttpStatusCode.OK, message: "Authorized" };
    }
  
    @Put('/user/:id')
    updateUser(
      @Param('id') userId: string,
      @Body() body: { name?: string; age?: number }
    ) {
      return {
        statusCode: HttpStatusCode.OK,
        message: "User updated",
        data: body,
      };
    }
  
    @Delete('/user/:id')
    deleteUser(@Param('id') userId: string) {
      return { statusCode: HttpStatusCode.OK, message: `User ${userId} deleted` };
    }
  }