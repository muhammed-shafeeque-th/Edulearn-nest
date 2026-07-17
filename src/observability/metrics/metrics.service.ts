import { Inject, Injectable } from "@nestjs/common";

import { METRICS } from "./metrics.constants";
import {
  CounterMetric,
  CounterOptions,
  GaugeMetric,
  GaugeOptions,
  HistogramMetric,
  HistogramOptions,
  MetricsEngine,
  MetricService,
  SummaryMetric,
  SummaryOptions,
} from "@edulearn/core";

@Injectable()
export class MetricsService {
  constructor(
    @Inject(METRICS)
    protected readonly engine: MetricsEngine,
  ) {}

  async metrics() {
    return this.engine.metrics();
  }

  get contentType() {
    return this.engine.contentType;
  }
  increment(
    options: CounterOptions,
    value = 1,
    labels?: Record<string, string>,
  ): void {
    const counter = this.engine.counter(options);

    labels ? counter.inc(labels, value) : counter.inc(value);
  }

  decrement(
    options: GaugeOptions,
    value = 1,
    labels?: Record<string, string>,
  ): void {
    const gauge = this.engine.gauge(options);

    labels ? gauge.dec(labels, value) : gauge.dec(value);
  }

  incrementGauge(
    options: GaugeOptions,
    value = 1,
    labels?: Record<string, string>,
  ): void {
    const gauge = this.engine.gauge(options);

    labels ? gauge.inc(labels, value) : gauge.inc(value);
  }

  setGauge(
    options: GaugeOptions,
    value: number,
    labels?: Record<string, string>,
  ): void {
    const gauge = this.engine.gauge(options);

    labels ? gauge.set(labels, value) : gauge.set(value);
  }

  observe(
    options: HistogramOptions,
    value: number,
    labels?: Record<string, string>,
  ): void {
    const histogram = this.engine.histogram(options);

    labels ? histogram.observe(labels, value) : histogram.observe(value);
  }

  observeSummary(
    options: SummaryOptions,
    value: number,
    labels?: Record<string, string>,
  ): void {
    const summary = this.engine.summary(options);

    labels ? summary.observe(labels, value) : summary.observe(value);
  }

  startTimer(
    options: HistogramOptions,
    labels?: Record<string, string>,
  ): () => void {
    const histogram = this.engine.histogram(options);

    return histogram.startTimer(labels);
  }

  async measure<T>(
    options: HistogramOptions,
    callback: () => Promise<T>,
    labels?: Record<string, string>,
  ): Promise<T> {
    const end = this.startTimer(options, labels);

    try {
      return await callback();
    } finally {
      end();
    }
  }

  counter(options: CounterOptions): CounterMetric {
    return this.engine.counter(options);
  }

  gauge(options: GaugeOptions): GaugeMetric {
    return this.engine.gauge(options);
  }

  histogram(options: HistogramOptions): HistogramMetric {
    return this.engine.histogram(options);
  }

  summary(options: SummaryOptions): SummaryMetric {
    return this.engine.summary(options);
  }
}
