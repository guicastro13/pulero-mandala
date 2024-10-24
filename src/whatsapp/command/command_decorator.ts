import "reflect-metadata";

interface DependencyOptions {
    group?: string;
    requires: string[];
}

export function Command(options: DependencyOptions) {
    return function (constructor: Function) {
        Reflect.defineMetadata("isCommand", true, constructor);
        Reflect.defineMetadata("group", options.group || "default", constructor);
        Reflect.defineMetadata("dependencies", options.requires, constructor);
    };
}