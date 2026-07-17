import { ModuleMetadata } from "@nestjs/common";

import { MetricsConfigs } from "@edulearn/core";

export interface MetricsModuleOptions
    extends MetricsConfigs {}

export interface MetricsModuleAsyncOptions
    extends Pick<ModuleMetadata, "imports"> {

    inject?: any[];

    useFactory: (
        ...args: any[]
    ) =>
        | MetricsModuleOptions
        | Promise<MetricsModuleOptions>;
}