import { ModuleMetadata } from "@nestjs/common";
import { LoggerConfigs } from "@edulearn/core";

export interface LoggerModuleOptions extends LoggerConfigs {}

export interface LoggerModuleAsyncOptions
    extends Pick<ModuleMetadata, "imports"> {

    inject?: any[];

    useFactory: (
        ...args: any[]
    ) => Promise<LoggerModuleOptions> | LoggerModuleOptions;
}