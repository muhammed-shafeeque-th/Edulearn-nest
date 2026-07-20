import {  Injectable } from "@nestjs/common";
import { HealthCheckResult } from "../interfaces/health-check-result.interface";
import { HealthRegistry } from "../registry/health.registry";

@Injectable()
export class ReadinessService {
  constructor(
    private readonly registry: HealthRegistry,
  ) {}

  async checkReadiness() {

    const checks = this.registry.getChecks();

    const settled = await Promise.allSettled(
      checks.map(async (check) => {
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
      const check = checks[index];

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