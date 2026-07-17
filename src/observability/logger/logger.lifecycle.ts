import { Inject, Injectable, OnApplicationShutdown } from "@nestjs/common";

import { shutdownLogger, TLogger } from "@edulearn/core";
import { LOGGER } from "./logger.constants";

@Injectable()
export class LoggerLifecycle implements OnApplicationShutdown {
  constructor(
    @Inject(LOGGER)
    private readonly logger: TLogger,
  ) {}

  async onApplicationShutdown() {
    await shutdownLogger(this.logger);
  }
}
