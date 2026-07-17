import {
  Inject,
    Injectable,
    OnApplicationShutdown,
} from "@nestjs/common";

import {
    registerShutdown,
    TNodeTracerProvider
} from "@edulearn/core";
import { TRACER_PROVIDER } from "./tracer.constants";

@Injectable()
export class TracerLifecycle
implements OnApplicationShutdown {

  constructor(@Inject(TRACER_PROVIDER) private readonly  traceProvider: TNodeTracerProvider) {}

    async onApplicationShutdown() {

        registerShutdown(this.traceProvider);

    }
}