import "reflect-metadata";

export function Command() {
    return function (constructor: Function) {
        Reflect.defineMetadata("isCommand", true, constructor);
    };
}