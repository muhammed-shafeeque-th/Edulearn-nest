import { DynamicModule, Global, Module } from "@nestjs/common";
import { createLogger } from "@edulearn/core";
import { LOGGER, LOGGER_MODULE_OPTIONS } from "./logger.constants";
import {
  LoggerModuleOptions,
  LoggerModuleAsyncOptions,
} from "./logger.interfaces";

import { LoggerLifecycle } from "./logger.lifecycle";
import { LoggerService } from "./logger.service";

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LOGGER_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: LOGGER,
          useFactory: (options: LoggerModuleOptions) => createLogger(options),
          inject: [LOGGER_MODULE_OPTIONS],
        },
        LoggerService,
        LoggerLifecycle,
      ],
      exports: [LOGGER, LoggerService],
    };
  }

  static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    return {
      module: LoggerModule,
      imports: options.imports,
      providers: [
        {
          provide: LOGGER_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },
        {
          provide: LOGGER,
          useFactory: (options: LoggerModuleOptions) => createLogger(options),
          inject: [LOGGER_MODULE_OPTIONS],
        },

        LoggerService,
        LoggerLifecycle,
      ],
      exports: [LOGGER, LoggerService],
    };
  }
}
