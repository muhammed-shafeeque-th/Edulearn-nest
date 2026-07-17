import { Inject, Injectable } from "@nestjs/common";

import { TRACER_MODULE_OPTIONS, TRACER_PROVIDER } from "./tracer.constants";
import {
  TNodeTracerProvider,
  TracerService as Tracer,
  TracerConfig,
} from "@edulearn/core";

@Injectable()
export class TracerService extends Tracer {
  constructor(
    @Inject(TRACER_MODULE_OPTIONS)
    private readonly configs: TracerConfig,
    @Inject(TRACER_PROVIDER)
    provider: TNodeTracerProvider,
  ) {
    super(provider.getTracer(configs.serviceName));
  }

//   getTracer(name: string) {
//     return this.tracer;
//   }
}
