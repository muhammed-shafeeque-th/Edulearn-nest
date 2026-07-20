import { HealthCheckResult, IHealthCheck } from "@edulearn/core";
import { HealthRegistry } from "./health.registry";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export abstract class BaseHealthCheck
  implements IHealthCheck, OnModuleInit
{
  constructor(
    protected readonly registry: HealthRegistry,
  ) {}

  abstract readonly name: string;

  abstract check(): Promise<HealthCheckResult>;

  onModuleInit(): void {
    this.registry.register(this);
  }
}