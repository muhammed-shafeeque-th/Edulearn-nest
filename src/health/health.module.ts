import { DynamicModule, Global, Module, Provider } from "@nestjs/common";

import {  HEALTH_MODULE_OPTIONS } from "./health.constants";

import { HealthController } from "./controllers/health.controller";

import {
  HealthModuleAsyncOptions,
  HealthModuleOptions,
} from "./interfaces/health-module-options.interface";

import { HealthService } from "./services/health.service";
import { ReadinessService } from "./services/readiness.service";
import { HealthRegistry } from "./registry/health.registry";

@Global()
@Module({})
export class HealthModule {
  static forRoot(options: HealthModuleOptions): DynamicModule {
    return {
      module: HealthModule,

      controllers: [HealthController],

      providers: [
        {
          provide: HEALTH_MODULE_OPTIONS,
          useValue: options,
        },

        {
          provide: HealthService,
          useFactory: (opts: HealthModuleOptions) => new HealthService(opts),
          inject: [HEALTH_MODULE_OPTIONS],
        },

        ReadinessService,
        HealthRegistry
      ],

      exports: [HealthService, HealthRegistry, ReadinessService],
    };
  }

  static forRootAsync(options: HealthModuleAsyncOptions): DynamicModule {
    return {
      module: HealthModule,
      imports: options.imports,

      controllers: [HealthController],

      providers: [
        {
          provide: HealthService,
          useFactory: (opts: HealthModuleOptions) => new HealthService(opts),
          inject: [HEALTH_MODULE_OPTIONS],
        },

        {
          provide: HEALTH_MODULE_OPTIONS,

          useFactory: options.useFactory,

          inject: options.inject ?? [],
        },

        HealthRegistry,
        ReadinessService,
        HealthService,
      ],
      exports: [HealthRegistry, ReadinessService],
    };
  }
}
