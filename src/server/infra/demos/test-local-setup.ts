import { kv } from "../upstash";

async function testRedis() {
  try {
    await kv.set("cascade:test", "hello");
    const value = await kv.get("cascade:test");
    console.log("Redis test value:", value); // Should log: "hello"
    process.exit(0);
  } catch (err) {
    console.error("Redis test failed:", err);
    process.exit(1);
  }
}

testRedis();
