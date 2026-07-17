import { Provider } from "@nestjs/common";
import { IHealthCheck } from "./health-check.interface";

export interface HealthModuleOptions {
  serviceName: string;

  version?: string;

  checks?: Provider<IHealthCheck>[];
}