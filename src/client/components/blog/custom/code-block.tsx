import { type FC, memo } from "react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import loadable from "@loadable/component";

const SyntaxHighlighter = loadable(
  () =>
    Promise.all([
      import("react-syntax-highlighter").then((mod) => mod.Prism),
      import("react-syntax-highlighter/dist/cjs/styles/prism").then(
        (mod) => mod.coldarkDark,
      ),
    ]).then(([SyntaxHighlighterComponent, style]) => {
      // Create a wrapper component that has the style built-in
      const StyledSyntaxHighlighter = (props: any) => (
        <SyntaxHighlighterComponent style={style} {...props} />
      );
      return StyledSyntaxHighlighter;
    }),
  {
    ssr: false,
  },
);

interface Props {
  language: string;
  value: string;
}

type languageMap = Record<string, string | undefined>;

export const programmingLanguages: languageMap = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  typescript: ".ts",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXY3456789"; // excluding similar looking characters like Z, 2, I, 1, O, 0
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const downloadAsFile = () => {
    if (typeof window === "undefined") {
      return;
    }
    const fileExtension = programmingLanguages[language] ?? ".file";
    const suggestedFileName = `file-${generateRandomString(
      3,
      true,
    )}${fileExtension}`;
    const fileName = window.prompt("Enter file name", suggestedFileName);

    if (!fileName) {
      // User pressed cancel on prompt.
      return;
    }

    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="codeblock relative w-full bg-slate-950 font-sans">
      <div className="flex w-full items-center justify-between bg-slate-900 px-6 py-2 pr-4 text-zinc-100">
        <span className="text-xs lowercase">{language}</span>
        <div className="flex items-center space-x-1">
          <button
            className="btn-base-100 btn btn-square btn-xs"
            onClick={downloadAsFile}
          >
            📥<span className="sr-only">Download</span>
          </button>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        PreTag="div"
        showLineNumbers
        customStyle={{
          margin: 0,
          width: "100%",
          background: "transparent",
          padding: "1.5rem 1rem",
        }}
        codeTagProps={{
          style: {
            fontSize: "0.9rem",
            fontFamily: "var(--font-mono)",
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
