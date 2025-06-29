import { TStateCreator } from ".";
import { z } from "zod/v4";

const ZRouteType = z.enum(["post", "general"]);

export const ZViewportState = z.object({
  route: z.string(),
  viewportContent: z.string(),
  selectedText: z.string(),
  routeType: ZRouteType,
});
type TRouteType = z.infer<typeof ZRouteType>;

type TViewportState = z.infer<typeof ZViewportState>;

type TViewportActions = {
  setRoute: (route: string) => void;
  setViewportContent: (viewportContent: string) => void;
  setSelectedText: (selectedText: string) => void;
  setRouteType: (routeType: TRouteType) => void;
  setViewport: (viewport: TViewportState) => void;
  getViewport: () => TViewportState;
  updateViewport: (viewport: Partial<TViewportState>) => void;
};

export type TViewPortSlice = TViewportState & TViewportActions;

//--------------------------------

const initialState: TViewportState = {
  route: "",
  viewportContent: "",
  selectedText: "",
  routeType: "general",
};

export const viewportSlice: TStateCreator<TViewPortSlice> = (set, get) => ({
  ...initialState,
  setViewport: (viewport) => set({ ...viewport }),
  setRoute: (route) => set({ route }),
  setViewportContent: (viewportContent) => set({ viewportContent }),
  setSelectedText: (selectedText) => set({ selectedText }),
  setRouteType: (routeType) => set({ routeType }),
  updateViewport: (viewport) => set({ ...viewport }),
  getViewport: () => {
    const { route, viewportContent, selectedText, routeType } = get();
    return {
      route,
      viewportContent,
      selectedText,
      routeType,
    };
  },
});
