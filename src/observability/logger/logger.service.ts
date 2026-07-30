import { Inject, Injectable } from "@nestjs/common";
import { LOGGER } from "./logger.constants";
import { LoggerService as Logger_Service, TLogger } from "@edulearn/core";

@Injectable()
export class LoggerService extends Logger_Service {
  constructor(
    @Inject(LOGGER)
     logger: TLogger,
  ) {
    super(logger);
  }

}
