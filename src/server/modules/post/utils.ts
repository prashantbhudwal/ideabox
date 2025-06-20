import fs from "fs/promises";
import matter from "gray-matter";
import { ZPostFrontmatter } from "~/common/types/content.types";
import fg from "fast-glob";

export const getValidatedPost = async ({ file }: { file: string }) => {
  try {
    const raw = await fs.readFile(file, "utf-8");
    const { data: metadata, content } = matter(raw);
    const processedMetadata = {
      ...metadata,
      createdAt:
        metadata.createdAt instanceof Date
          ? metadata.createdAt.toISOString()
          : metadata.createdAt,
      updatedAt:
        metadata.updatedAt instanceof Date
          ? metadata.updatedAt.toISOString()
          : metadata.updatedAt,
    };

    const validatedMetadata = ZPostFrontmatter.parse(processedMetadata);
    return {
      metadata: validatedMetadata,
      content,
    };
  } catch (err) {
    console.error(`Invalid frontmatter in ${file}:`, err);
    throw err;
  }
};

export const getAllPostFiles = ({
  dir,
}: {
  dir: string;
}): Promise<string[]> => {
  return fg(`${dir}/**/*.mdx`, { absolute: true });
};
