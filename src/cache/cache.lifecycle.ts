import {
  Inject,
  Injectable,
  OnApplicationShutdown,
} from "@nestjs/common";

import { CacheClient } from "@edulearn/core";

import { CACHE_CLIENT } from "./cache.constants";

@Injectable()
export class CacheLifecycle
  implements OnApplicationShutdown
{
  constructor(
    @Inject(CACHE_CLIENT)
    private readonly cache: CacheClient,
  ) {}

  async onApplicationShutdown() {
    await this.cache.disconnect();
  }
}