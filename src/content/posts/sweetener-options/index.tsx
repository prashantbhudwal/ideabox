import { dynamic } from "~/client/lib/dynamic";

export const sweetenerOptions = {
  SweetenerList: dynamic(() => import("./components/list"), { ssr: false }),
};
