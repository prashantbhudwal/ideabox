import { QdrantClient } from "@qdrant/js-client-rest";

async function main(): Promise<void> {
  const url = process.env.QDRANT_URL;
  const apiKey = process.env.QDRANT_API_KEY;
  if (!url) {
    console.error("Error: QDRANT_URL is not set in .env");
    process.exit(1);
  }

  const client = new QdrantClient({ url, apiKey });

  try {
    const versionInfo = await client.versionInfo();
    console.log("Qdrant version:", versionInfo);
    process.exit(0);
  } catch (err) {
    console.error("Error pinging Qdrant:", err);
    process.exit(1);
  }
}

main();
