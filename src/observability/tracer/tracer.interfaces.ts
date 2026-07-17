import { ModuleMetadata } from "@nestjs/common";

import { TracerConfig } from "@edulearn/core";

export interface TracerModuleOptions
extends TracerConfig {}

export interface TracerModuleAsyncOptions
extends Pick<ModuleMetadata, "imports"> {

    inject?: any[];

    useFactory: (
        ...args: any[]
    ) =>
        | Promise<TracerModuleOptions>
        | TracerModuleOptions;
}