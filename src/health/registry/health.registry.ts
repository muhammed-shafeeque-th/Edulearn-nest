import { Injectable } from "@nestjs/common";
import { IHealthCheck } from "../interfaces/health-check.interface";

@Injectable()
export class HealthRegistry {
  private readonly checks = new Map<string, IHealthCheck>();

  register(check: IHealthCheck): void {
    this.checks.set(check.name, check);
  }

  unregister(name: string): void {
    this.checks.delete(name);
  }

  getChecks(): IHealthCheck[] {
    return [...this.checks.values()];
  }
}