import { ModuleMetadata } from "@nestjs/common";
import { CacheConfig } from "@edulearn/core";

export interface CacheModuleOptions extends CacheConfig {}

export interface CacheModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];

  useFactory: (
    ...args: any[]
  ) =>
    | Promise<CacheModuleOptions>
    | CacheModuleOptions;
}