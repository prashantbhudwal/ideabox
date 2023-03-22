// import { format, parseISO } from "date-fns";
// import { allPosts, Post } from "contentlayer/generated";

// export async function generateStaticParams() {
//   return allPosts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// export async function getStaticPaths() {
//   const paths: string[] = allPosts.map((post) => post.url);
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const post: Post = allPosts.find(
//     (post) => post._raw.flattenedPath === params.slug
//   );
//   return {
//     props: {
//       post,
//     },
//   };
// }

// export default async function PostLayout({ post }: { post: Post }) {
//   return (
//     <>
//       <article className="mx-auto max-w-xl py-8">
//         <div className="mb-8 text-center">
//           <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
//             {format(parseISO(post.date), "LLLL d, yyyy")}
//           </time>
//           <h1>{post.title}</h1>
//         </div>
//         <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
//       </article>
//     </>
//   );
// }
