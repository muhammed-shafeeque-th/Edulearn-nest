import { HealthCheckResult } from "./health-check-result.interface";

export interface IHealthCheck {
  readonly name: string;

  check(): Promise<HealthCheckResult>;
}
