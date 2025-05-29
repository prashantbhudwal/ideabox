import 'dotenv/config';
// import Next.js env loader removed; using dotenv for direct .env loading
import { Redis } from "@upstash/redis";

async function main(): Promise<void> {
  const url: string | undefined = process.env.UPSTASH_REDIS_REST_URL;
  const token: string | undefined = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    console.error(
      "Error: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set",
    );
    process.exit(1);
  }

  const client = new Redis({ url, token });
  try {
    const pong: string = await client.ping();
    console.log("Upstash cloud ping response:", pong);
    process.exit(0);
  } catch (err: unknown) {
    console.error("Error pinging Upstash cloud Redis:", err);
    process.exit(1);
  }
}

main();
