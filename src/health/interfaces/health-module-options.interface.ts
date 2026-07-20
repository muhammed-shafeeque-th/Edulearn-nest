import { ModuleMetadata, Provider } from "@nestjs/common";
import { IHealthCheck } from "./health-check.interface";

export interface HealthModuleOptions {
  serviceName: string;

  version?: string;

  checks?: Provider<IHealthCheck>[];
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