import { Inject, Injectable } from "@nestjs/common";
import { HEALTH_CHECKS } from "../health.constants";
import { IHealthCheck } from "../interfaces/health-check.interface";
import { HealthCheckResult } from "../interfaces/health-check-result.interface";

@Injectable()
export class ReadinessService {
  constructor(
    @Inject(HEALTH_CHECKS)
    private readonly checks: IHealthCheck[],
  ) {}

  async checkReadiness() {
    const settled = await Promise.allSettled(
      this.checks.map(async (check) => {
        const started = Date.now();

        const result = await check.check();

        return {
          ...result,
          duration: Date.now() - started,
        };
      }),
    );

    const results: Record<string, HealthCheckResult> = {};

    let ready = true;

    settled.forEach((result, index) => {
      const check = this.checks[index];

      if (result.status === "fulfilled") {
        results[result.value.name] = result.value;

        if (result.value.status === "down") {
          ready = false;
        }
      } else {
        ready = false;

        results[check.name] = {
          name: check.name,
          status: "down",
          message: result.reason?.message ?? "Unknown error",
        };
      }
    });

    return {
      status: ready ? "ready" : "not_ready",
      checks: results,
    };
  }
}