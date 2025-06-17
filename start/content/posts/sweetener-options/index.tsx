import dynamic from "next/dynamic";

export const sweetenerOptions = {
  SweetenerList: dynamic(() => import("./components/list"), { ssr: false }),
};
