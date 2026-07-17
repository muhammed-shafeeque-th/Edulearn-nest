import {
  DynamicModule,
  Module,
  Provider,
} from "@nestjs/common";

import { CacheClient } from "@edulearn/core";

import {
  CACHE_CLIENT,
  CACHE_MODULE_OPTIONS,
} from "./cache.constants";

import {
  CacheModuleAsyncOptions,
  CacheModuleOptions,
} from "./cache.interfaces";

import { CacheLifecycle } from "./cache.lifecycle";
import { CacheService } from "./cache.service";

@Module({})
export class CacheModule {
  private static createClientProvider(): Provider {
    return {
      provide: CACHE_CLIENT,
      useFactory: async (
        options: CacheModuleOptions,
      ) => {
        const client = new CacheClient(
          options,
        );

        await client.connect();

        return client;
      },
      inject: [
        CACHE_MODULE_OPTIONS,
      ],
    };
  }

  static forRoot(
    options: CacheModuleOptions,
  ): DynamicModule {
    return {
      module: CacheModule,

      providers: [
        {
          provide:
            CACHE_MODULE_OPTIONS,
          useValue: options,
        },

        this.createClientProvider(),

        CacheService,

        CacheLifecycle,
      ],

      exports: [
        CACHE_CLIENT,
        CacheService,
      ],
    };
  }

  static forRootAsync(
    options: CacheModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: CacheModule,

      imports: options.imports,

      providers: [
        {
          provide:
            CACHE_MODULE_OPTIONS,

          useFactory:
            options.useFactory,

          inject:
            options.inject ?? [],
        },

        this.createClientProvider(),

        CacheService,

        CacheLifecycle,
      ],

      exports: [
        CACHE_CLIENT,
        CacheService,
      ],
    };
  }
}