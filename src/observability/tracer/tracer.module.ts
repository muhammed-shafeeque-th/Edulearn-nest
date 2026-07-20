import { DynamicModule, Global, Module } from "@nestjs/common";

import { initializeTracer } from "@edulearn/core";

import { TRACER_PROVIDER, TRACER_MODULE_OPTIONS } from "./tracer.constants";

import {
  TracerModuleOptions,
  TracerModuleAsyncOptions,
} from "./tracer.interfaces";

import { TracerLifecycle } from "./tracer.lifecycle";
import { TracerService } from "./tracer.service";

@Global()
@Module({})
export class TracerModule {
  static forRoot(options: TracerModuleOptions): DynamicModule {
    return {
      module: TracerModule,

      providers: [
        {
          provide: TRACER_MODULE_OPTIONS,

          useValue: options,
        },

        {
          provide: TRACER_PROVIDER,

          useFactory: (options: TracerModuleOptions) =>
            initializeTracer(options),

          inject: [TRACER_MODULE_OPTIONS],
        },

        TracerService,

        TracerLifecycle,
      ],

      exports: [TRACER_PROVIDER, TracerService],
    };
  }

  static forRootAsync(options: TracerModuleAsyncOptions): DynamicModule {
    return {
      module: TracerModule,

      imports: options.imports,

      providers: [
        {
          provide: TRACER_MODULE_OPTIONS,

          useFactory: options.useFactory,

          inject: options.inject ?? [],
        },

        {
          provide: TRACER_PROVIDER,

          useFactory: (options: TracerModuleOptions) =>
            initializeTracer(options),

          inject: [TRACER_MODULE_OPTIONS],
        },

        TracerService,

        TracerLifecycle,
      ],

      exports: [TRACER_PROVIDER, TracerService],
    };
  }
}
