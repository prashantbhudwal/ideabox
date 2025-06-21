import { store } from "~/server/infra/qdrant";
import { COLLECTIONS } from "./collection-schema";
import { SimilarityMetric, type TSimilarityMetric } from "../rag.config";
import esMain from "es-main";

export type TIndexConfig = {
  indexName: string;
  dimension: number;
  metric: TSimilarityMetric;
  description: string;
};
const createCollection = async (config: TIndexConfig): Promise<boolean> => {
  try {
    const indexes = await store.listIndexes();

    if (indexes.includes(config.indexName)) {
      console.log(
        `Collection ${config.indexName} already exists, skipping creation`,
      );
      return false;
    }

    await store.createIndex(config);
    console.log(`Created ${config.indexName} collection`);
    return true;
  } catch (error) {
    console.error(`Error creating ${config.indexName} collection:`, error);
    throw error;
  }
};
export const runMigrations = async (): Promise<void> => {
  console.log("Starting vector store migrations...");

  try {
    const indexes = await store.listIndexes();
    console.log("Existing indexes:", indexes);

    const results = {
      created: 0,
      existing: 0,
      total: COLLECTIONS.length,
    };
    for (const config of COLLECTIONS) {
      const wasCreated = await createCollection(config);
      if (wasCreated) {
        results.created++;
      } else {
        results.existing++;
      }
    }

    console.log("Migrations completed successfully");
    console.log(
      `Summary: ${results.created} collections created, ${results.existing} already existed, ${results.total} total`,
    );
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
};

if (esMain(import.meta)) {
  runMigrations().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
