import { DynamicModule, Global, Module } from "@nestjs/common";
import { createMetrics, MetricsEngine,  } from "@edulearn/core";
import {
  METRICS,
  METRICS_MODULE_OPTIONS,
} from "./metrics.constants";

import {
  MetricsModuleOptions,
  MetricsModuleAsyncOptions,
} from "./metrics.interfaces";
import { MetricsController } from "./metrics.controller";
import { MetricsService } from "./metrics.service";
import { MetricsLifecycle } from "./metrics.lifecycle";

@Global()
@Module({})
export class MetricsModule {
  static forRoot(options: MetricsModuleOptions): DynamicModule {
    return {
      module: MetricsModule,
      controllers: [MetricsController],
      providers: [
        {
          provide: METRICS_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: METRICS,
          useFactory: (options: MetricsModuleOptions): MetricsEngine => createMetrics(options),
          inject: [METRICS_MODULE_OPTIONS],
        },
        MetricsService,
        MetricsLifecycle,
      ],
      exports: [METRICS, MetricsService],
    };
  }
  static forRootAsync(options: MetricsModuleAsyncOptions): DynamicModule {
    return {
      module: MetricsModule,

      imports: options.imports,

      controllers: [MetricsController],

      providers: [
        {
          provide: METRICS_MODULE_OPTIONS,

          useFactory: options.useFactory,

          inject: options.inject ?? [],
        },

        {
          provide: METRICS,

          useFactory: (options: MetricsModuleOptions): MetricsEngine => createMetrics(options),

          inject: [METRICS_MODULE_OPTIONS],
        },

        MetricsService,
        MetricsLifecycle,
      ],

      exports: [METRICS, MetricsService],
    };
  }
}
