import { Inject, Injectable } from "@nestjs/common";
import { HealthModuleOptions } from "../interfaces/health-module-options.interface";
import { HEALTH_MODULE_OPTIONS } from "../health.constants";
@Injectable()
export class HealthService {
  constructor(
    @Inject(HEALTH_MODULE_OPTIONS)
    private readonly options: HealthModuleOptions,
  ) {}

  getHealth() {
    return {
      status: "up",

      service: this.options?.serviceName,

      version: this.options?.version ?? process.env.npm_package_version,

      environment: process.env.NODE_ENV,

      uptime: Math.floor(process.uptime()),

      timestamp: new Date().toISOString(),

      node: process.version,
    };
  }
}
