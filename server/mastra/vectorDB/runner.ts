import { createCollection } from "./lib";

const DIMENSION = 1536; // TODO Figure out if this is the right dimension

function main() {
  createCollection({
    collectionName: "posts",
    dimension: DIMENSION,
  });
}
