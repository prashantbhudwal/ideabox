import { UseChatHelpers } from "@ai-sdk/react";
import { create, type StateCreator } from "zustand";

type TViewPortSlice = {
  route: string;
  viewportContent: string;
  selectedText: string;
  routeType: "post" | "general";

  setRoute: (route: string) => void;
  setViewportContent: (viewportContent: string) => void;
  setSelectedText: (selectedText: string) => void;
  setRouteType: (routeType: "post" | "general") => void;
};

type TUserStateSlice = {
  isTyping: boolean;

  setIsTyping: (isTyping: boolean) => void;
};

type TChatSlice = {
  chatStatus: UseChatHelpers["status"];
  isStreaming: boolean;
  setChatStatus: (status: UseChatHelpers["status"]) => void;
};

type TStore = TViewPortSlice &
  TUserStateSlice &
  TChatSlice & {
    cleanAgentStore: () => void;
  };

type TStateCreator<T> = StateCreator<TStore, [], [], T>;

const createViewPortSlice: TStateCreator<TViewPortSlice> = (set) => ({
  route: "",
  viewportContent: "",
  selectedText: "",
  routeType: "general",
  setRoute: (route) =>
    set((state) => ({
      ...state,
      route,
    })),
  setViewportContent: (viewportContent) =>
    set((state) => ({
      ...state,
      viewportContent,
    })),
  setSelectedText: (selectedText) =>
    set((state) => ({
      ...state,
      selectedText,
    })),
  setRouteType: (routeType) =>
    set((state) => ({
      ...state,
      routeType,
    })),
});

const createUserStateSlice: TStateCreator<TUserStateSlice> = (set) => ({
  isTyping: false,
  setIsTyping: (isTyping) =>
    set((state) => ({
      ...state,
      isTyping,
    })),
});

const createChatSlice: TStateCreator<TChatSlice> = (set) => {
  return {
    chatStatus: "ready",
    isStreaming: false,
    setChatStatus: (chatStatus) =>
      set((state) => ({
        ...state,
        chatStatus,
        isStreaming: chatStatus === "streaming",
      })),
  };
};

export const useAgentStore = create<TStore>()((set, ...args) => ({
  ...createViewPortSlice(set, ...args),
  ...createUserStateSlice(set, ...args),
  ...createChatSlice(set, ...args),
  cleanAgentStore: () => {
    set((state) => ({
      ...state,
      route: "",
      viewportContent: "",
      selectedText: "",
      routeType: "general",
      isTyping: false,
      chatStatus: "ready",
      isLoading: false,
    }));
  },
}));
