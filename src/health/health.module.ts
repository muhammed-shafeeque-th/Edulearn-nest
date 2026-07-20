import { DynamicModule, Global, Module, Provider } from "@nestjs/common";

import { HEALTH_CHECKS, HEALTH_MODULE_OPTIONS } from "./health.constants";

// import { HealthController } from "./controllers/health.controller";

import { HealthModuleAsyncOptions, HealthModuleOptions } from "./interfaces/health-module-options.interface";

import { HealthService } from "./services/health.service";
import { ReadinessService } from "./services/readiness.service";
import { IHealthCheck } from "@edulearn/core";

@Global()
@Module({})
export class HealthModule {
  static forRoot(options: HealthModuleOptions): DynamicModule {
    const checkProviders = options.checks ?? [];
    const checkProviderTokens = checkProviders.map((provider) =>
      typeof provider === "object" && "provide" in provider ? provider.provide : provider,
    );

    return {
      module: HealthModule,

      // controllers: [HealthController],

      providers: [
        {
          provide: HEALTH_MODULE_OPTIONS,
          useValue: options,
        },

        ...checkProviders,

        {
          provide: HEALTH_CHECKS,
          useFactory: (...checks: IHealthCheck[]) => checks,
          inject: checkProviderTokens as any[],
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
 
  static forRootAsync(options: HealthModuleAsyncOptions): DynamicModule {
    const checkProviders = options.checks ?? [];
    const checkProviderTokens = checkProviders.map((provider) =>
      typeof provider === "object" && "provide" in provider ? provider.provide : provider,
    );

    return {
      module: HealthModule,
      imports: options.imports,

      // controllers: [HealthController],

      providers: [
       

        ...checkProviders,

        {
          provide: HEALTH_CHECKS,
          useFactory: (...checks: IHealthCheck[]) => checks,
          inject: checkProviderTokens as any[],
        },

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

        ReadinessService,
      ],

      exports: [HealthService, ReadinessService],
    };
  }


}
