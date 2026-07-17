import { DynamicModule, Global, Module } from "@nestjs/common";

import { HEALTH_CHECKS, HEALTH_MODULE_OPTIONS } from "./health.constants";

// import { HealthController } from "./controllers/health.controller";

import { HealthModuleOptions } from "./interfaces/health-module-options.interface";

import { HealthService } from "./services/health.service";
import { ReadinessService } from "./services/readiness.service";

@Global()
@Module({})
export class HealthModule {
  static forRoot(options: HealthModuleOptions): DynamicModule {
    return {
      module: HealthModule,

      // controllers: [HealthController],

      providers: [
        {
          provide: HEALTH_MODULE_OPTIONS,
          useValue: options,
        },

        {
          provide: HEALTH_CHECKS,
          useValue: options.checks ?? [],
        },

        {
          provide: HealthService,
          useFactory: (opts: HealthModuleOptions) => new HealthService(opts),
          inject: [HEALTH_MODULE_OPTIONS],
        },

        ReadinessService,
      ],

      exports: [HealthService, ReadinessService],
    };
  }
}
