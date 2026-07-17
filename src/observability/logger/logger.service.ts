import { Inject, Injectable } from "@nestjs/common";
import { LOGGER } from "./logger.constants";
import { Logger } from "winston";
import { LoggerService as Logger_Service } from "@edulearn/core";

@Injectable()
export class LoggerService extends Logger_Service {
  constructor(
    @Inject(LOGGER)
     logger: Logger,
  ) {
    super(logger);
  }

  info(message: string, meta?: unknown) {
    this.logger.info(message, meta);
  }

  warn(message: string, meta?: unknown) {
    this.logger.warn(message, meta);
  }

  error(message: string, trace?: unknown, meta?: Record<string, unknown>) {
    this.logger.error(message, {
      trace,
      ...meta,
    });
  }

  debug(message: string, meta?: unknown) {
    this.logger.debug(message, meta);
  }

  child(meta: Record<string, unknown>) {
    return this.logger.child(meta);
  }
}
