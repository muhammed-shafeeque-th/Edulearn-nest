import {
  Inject,
  Injectable,
} from "@nestjs/common";

import { CacheClient } from "@edulearn/core";

import { CACHE_CLIENT } from "./cache.constants";

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_CLIENT)
    private readonly cache: CacheClient,
  ) {}

  getClient() {
    return this.cache.getClient();
  }

  ping() {
    return this.cache.ping();
  }

  get<T>(key: string) {
    return this.cache.get<T>(key);
  }

  set<T>(
    key: string,
    value: T,
    ttl?: number,
  ) {
    return this.cache.set(key, value, ttl);
  }

  delete(key: string) {
    return this.cache.delete(key);
  }

  exists(key: string) {
    return this.cache.exists(key);
  }

  getMultiple<T>(keys: string[]) {
    return this.cache.getMultiple<T>(keys);
  }

  setMultiple<T>(
    entries: {
      key: string;
      value: T;
    }[],
    ttl?: number,
  ) {
    return this.cache.setMultiple(
      entries,
      ttl,
    );
  }

  incrBy(
    key: string,
    amount = 1,
  ) {
    return this.cache.incrBy(
      key,
      amount,
    );
  }

  decrBy(
    key: string,
    amount = 1,
  ) {
    return this.cache.decrBy(
      key,
      amount,
    );
  }

  expire(
    key: string,
    ttl: number,
  ) {
    return this.cache.expire(
      key,
      ttl,
    );
  }

  ttl(key: string) {
    return this.cache.getTTL(key);
  }

  flush() {
    return this.cache.flush();
  }

  publish(
    channel: string,
    message: string,
  ) {
    return this.cache.publish(
      channel,
      message,
    );
  }

  subscribe(
    channel: string,
    handler: (
      channel: string,
      message: string,
    ) => void,
  ) {
    return this.cache.subscribe(
      channel,
      handler,
    );
  }
}