import { createServerFn } from "@tanstack/react-start";
import { getAllPosts } from "./get-all-posts";

export const getPostsServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  return await getAllPosts();
});
