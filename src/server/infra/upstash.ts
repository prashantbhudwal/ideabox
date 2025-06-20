import { isDev } from "~/client/lib/utils";
import { Redis } from "@upstash/redis";

const redisToken = isDev
  ? process.env.UPSTASH_REDIS_LOCAL_TOKEN
  : process.env.UPSTASH_REDIS_TOKEN;
const redisURL = isDev
  ? process.env.UPSTASH_REDIS_LOCAL_URL
  : process.env.UPSTASH_REDIS_REST_URL;

export const kv = new Redis({
  url: redisURL,
  token: redisToken,
});
