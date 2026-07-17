import { shutdownMetrics } from "@edulearn/core";
import { Injectable, OnApplicationShutdown } from "@nestjs/common";

@Injectable()
export class MetricsLifecycle implements OnApplicationShutdown {
  async onApplicationShutdown() {
    await shutdownMetrics();
  }
}
