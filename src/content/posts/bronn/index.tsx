import { dynamic } from "~/client/lib/dynamic";

export const bronnComponents = {
  Qwen: dynamic(() => import("./components/qwen"), {
    ssr: false,
  }),
};
