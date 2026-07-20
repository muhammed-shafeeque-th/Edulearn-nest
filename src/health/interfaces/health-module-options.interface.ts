import { ModuleMetadata, Provider } from "@nestjs/common";

export interface HealthModuleOptions {
  serviceName: string;

  version?: string;
  
  environment?: string;
}



export interface HealthModuleAsyncOptions
extends Pick<ModuleMetadata, "imports"> {

    inject?: any[];

    useFactory: (
        ...args: any[]
    ) =>
        | HealthModuleOptions
        | Promise<HealthModuleOptions>;
}