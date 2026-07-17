export interface HealthCheckResult {
  name: string;
  status: "up" | "down";

  duration?: number;

  message?: string;

  details?: Record<string, unknown>;
}