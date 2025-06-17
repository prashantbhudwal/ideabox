import { dynamic } from "~/lib/dynamic";

export const bronnComponents = {
  Qwen: dynamic(() => import("./components/qwen"), {
    ssr: false,
  }),
};
