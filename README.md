# @edulearn/nest

NestJS integration SDK for the **EduLearn microservice platform**.

`@edulearn/nest` provides production-ready **NestJS modules, services, interceptors, guards, filters, health checks, Kafka utilities, and observability integrations** built on top of **@edulearn/core**.

It allows every EduLearn service to share the same infrastructure configuration, observability pipeline, caching layer, and operational behavior with minimal boilerplate.

---

## Features

* **LoggerModule** (Winston-based structured logging)
* **TracerModule** (OpenTelemetry distributed tracing)
* **MetricsModule** (Prometheus metrics)
* **CacheModule** (Redis/ioredis integration)
* **HealthModule** (readiness/liveness endpoints)
* **Kafka utilities**
* **Guards**
* **Interceptors**
* **Exception filters**
* **Configuration helpers**
* **NestJS lifecycle integration**

---

## Relationship with @edulearn/core

`@edulearn/nest` is a thin NestJS wrapper around **@edulearn/core**.

```text
                   NestJS Applications
        +-------------+-------------+-------------+
        | Auth        | User        | Course      |
        +-------------+-------------+-------------+
                      |
                @edulearn/nest
                      |
                @edulearn/core
                      |
   Logging | Metrics | Tracing | Cache | Health | Proto
```

Use **@edulearn/core** directly in non-Nest applications and **@edulearn/nest** inside NestJS services.

---

## Installation

```bash
yarn add @edulearn/nest @edulearn/core
```

or

```bash
npm install @edulearn/nest @edulearn/core
```

---

## Package Structure

```text
src
├── cache
├── config
├── filters
├── guards
├── health
│   ├── controllers
│   ├── interfaces
│   ├── registry
│   └── services
├── interceptors
├── kafka
└── observability
    ├── logger
    ├── metrics
    └── tracer
```

---

# LoggerModule

Provides a globally available structured logger.

## Synchronous Registration

```ts
import { Module } from '@nestjs/common';
import { LoggerModule } from '@edulearn/nest';

@Module({
  imports: [
    LoggerModule.forRoot({
      serviceName: 'auth-service',
      environment: 'production',
      level: 'info',
    }),
  ],
})
export class AppModule {}
```

## Asynchronous Registration

```ts
LoggerModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    serviceName: config.get('SERVICE_NAME'),
    environment: config.get('NODE_ENV'),
    level: config.get('LOG_LEVEL'),
  }),
  inject: [ConfigService],
});
```

## Injecting the Logger

```ts
import { Injectable } from '@nestjs/common';
import { LoggerService } from '@edulearn/nest';

@Injectable()
export class AuthService {
  constructor(private readonly logger: LoggerService) {}

  login(userId: string) {
    this.logger.info('User logged in', { userId });
  }
}
```

---

# TracerModule

Enables OpenTelemetry distributed tracing.

## Registration

```ts
import { TracerModule } from '@edulearn/nest';

@Module({
  imports: [
    TracerModule.forRoot({
      serviceName: 'auth-service',
      environment: 'production',
      collectorUrl: 'http://otel-collector:4318/v1/traces',
    }),
  ],
})
export class AppModule {}
```

## Async Registration

```ts
TracerModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    serviceName: config.get('SERVICE_NAME'),
    environment: config.get('NODE_ENV'),
    collectorUrl: config.get('OTEL_COLLECTOR_URL'),
  }),
  inject: [ConfigService],
});
```

The module automatically initializes and gracefully shuts down the tracer during NestJS application lifecycle events.

---

# MetricsModule

Exposes Prometheus-compatible metrics.

## Registration

```ts
import { MetricsModule } from '@edulearn/nest';

@Module({
  imports: [
    MetricsModule.forRoot({
      enabled: true,
      namespace: 'auth_service',
    }),
  ],
})
export class AppModule {}
```

## Async Registration

```ts
MetricsModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    enabled: true,
    namespace: config.get('SERVICE_NAME'),
  }),
  inject: [ConfigService],
});
```

## Metrics Endpoint

The module automatically exposes a Prometheus endpoint.

```text
GET /metrics
```

Suitable for Prometheus scraping through Kubernetes `ServiceMonitor` or `PodMonitor`.

---

# CacheModule

Provides a Redis-backed cache service.

## Registration

```ts
import { CacheModule } from '@edulearn/nest';

@Module({
  imports: [
    CacheModule.forRoot({
      host: 'redis',
      port: 6379,
      password: 'secret',
    }),
  ],
})
export class AppModule {}
```

## Async Registration

```ts
CacheModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    host: config.get('REDIS_HOST'),
    port: config.get('REDIS_PORT'),
    password: config.get('REDIS_PASSWORD'),
  }),
  inject: [ConfigService],
});
```

## Usage

```ts
import { Injectable } from '@nestjs/common';
import { CacheService } from '@edulearn/nest';

@Injectable()
export class SessionService {
  constructor(private readonly cache: CacheService) {}

  async saveSession(userId: string, session: unknown) {
    await this.cache.set(`session:${userId}`, session, 3600);
  }
}
```

The module automatically connects and disconnects the Redis client during NestJS startup and shutdown.

---

# HealthModule

Provides standardized health endpoints for Kubernetes and container environments.

Typical endpoints:

```text
GET /health
GET /health/live
GET /health/ready
```

Suitable for:

* Kubernetes readiness probes
* Kubernetes liveness probes
* Docker health checks
* Dependency monitoring

Example:

```ts
import { HealthModule } from '@edulearn/nest';

@Module({
  imports: [HealthModule],
})
export class AppModule {}
```

---

# Kafka Utilities

Kafka integration helpers are available under:

```ts
import { ... } from '@edulearn/nest';
```

These utilities are designed to standardize producer/consumer behavior across EduLearn services.

---

# Interceptors

Reusable NestJS interceptors for request handling, observability, and cross-cutting concerns.

```ts
import { ... } from '@edulearn/nest';
```

---

# Guards

Shared authorization and authentication guards.

```ts
import { ... } from '@edulearn/nest';
```

---

# Exception Filters

Common exception filters for consistent API responses and logging.

```ts
import { ... } from '@edulearn/nest';
```

---

# Complete AppModule Example

A typical EduLearn service combines logging, tracing, metrics, cache, and health modules.

```ts
import { Module } from '@nestjs/common';
import {
  LoggerModule,
  TracerModule,
  MetricsModule,
  CacheModule,
  HealthModule,
} from '@edulearn/nest';

@Module({
  imports: [
    LoggerModule.forRoot({
      serviceName: 'user-service',
      environment: 'production',
      level: 'info',
    }),

    TracerModule.forRoot({
      serviceName: 'user-service',
      environment: 'production',
      collectorUrl: 'http://otel-collector:4318/v1/traces',
    }),

    MetricsModule.forRoot({
      enabled: true,
      namespace: 'user_service',
    }),

    CacheModule.forRoot({
      host: 'redis',
      port: 6379,
    }),

    HealthModule,
  ],
})
export class AppModule {}
```

---

# Production Usage

This package is designed for **microservices running in Docker and Kubernetes**, integrating naturally with:

* **Prometheus**
* **Grafana**
* **Tempo**
* **OpenTelemetry Collector**
* **Loki**
* **Redis**
* **Kafka**
* **NestJS Microservices**
* **gRPC services using @edulearn/core proto definitions**

---

# License

MIT

---

**EduLearn NestJS SDK** — opinionated infrastructure modules for building scalable, observable, and production-ready NestJS microservices.
