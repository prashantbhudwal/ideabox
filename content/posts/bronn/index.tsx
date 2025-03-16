import dynamic from "next/dynamic";

export const bronnComponents = {
  Qwen: dynamic(() => import("./components/qwen"), {
    ssr: false,
  }),
};
