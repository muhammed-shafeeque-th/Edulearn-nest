import {
    Controller,
    Get,
    Header,
} from "@nestjs/common";

import { MetricsService } from "./metrics.service";

@Controller()
export class MetricsController {

    constructor(

        private readonly _metrics: MetricsService,

    ) {}

    @Get("metrics")

    @Header(
        "Content-Type",
        "text/plain; version=0.0.4",
    )

    async metrics() {

        return this._metrics.metrics();

    }
}