import { create, type StateCreator } from "zustand";

type TViewPortSlice = {
  viewportCtx: {
    route: string;
    viewportContent: string;
    selectedText: string;
    routeType: "post" | "general";
  };
  setRoute: (route: string) => void;
  setViewportContent: (viewportContent: string) => void;
  setSelectedText: (selectedText: string) => void;
  setRouteType: (routeType: "post" | "general") => void;
  setViewportCtx: (viewportCtx: TViewPortSlice["viewportCtx"]) => void;
};

type TUserStateSlice = {
  userCtx: {
    isTyping: boolean;
  };
  setIsTyping: (isTyping: boolean) => void;
};

type TStore = TViewPortSlice &
  TUserStateSlice & {
    cleanAgentStore: () => void;
  };

type TStateCreator<T> = StateCreator<TStore, [], [], T>;

const createViewPortSlice: TStateCreator<TViewPortSlice> = (set) => ({
  viewportCtx: {
    route: "",
    viewportContent: "",
    selectedText: "",
    routeType: "general",
  },
  setRoute: (route: string) =>
    set((state) => ({
      ...state,
      viewportCtx: { ...state.viewportCtx, route },
    })),
  setViewportContent: (viewportContent: string) =>
    set((state) => ({
      ...state,
      viewportCtx: { ...state.viewportCtx, viewportContent },
    })),
  setSelectedText: (selectedText: string) =>
    set((state) => ({
      ...state,
      viewportCtx: { ...state.viewportCtx, selectedText },
    })),
  setRouteType: (routeType: "post" | "general") =>
    set((state) => ({
      ...state,
      viewportCtx: { ...state.viewportCtx, routeType },
    })),
  setViewportCtx: (viewportCtx: TViewPortSlice["viewportCtx"]) =>
    set((state) => ({
      ...state,
      viewportCtx,
    })),
});

const createUserStateSlice: TStateCreator<TUserStateSlice> = (set) => ({
  userCtx: {
    isTyping: false,
  },
  setIsTyping: (isTyping: boolean) =>
    set((state) => ({
      ...state,
      userCtx: { ...state.userCtx, isTyping },
    })),
});

export const useAgentStore = create<TStore>()((set, ...args) => ({
  ...createViewPortSlice(set, ...args),
  ...createUserStateSlice(set, ...args),

  cleanAgentStore: () => {
    set((state) => ({
      ...state,
      viewportCtx: {
        route: "",
        viewportContent: "",
        selectedText: "",
        routeType: "general",
      },
      userCtx: {
        isTyping: false,
      },
    }));
  },
}));
