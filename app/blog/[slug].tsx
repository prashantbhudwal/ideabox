import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

export default function Post() {
  const slug = "";
  const content = fs.readFileSync(
    path.join(process.cwd(), "posts", `${slug}.md`),
    "utf8"
  );
  return (
    <div>
      <h1>{slug}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
