import { TStateCreator } from ".";
import { z } from "zod/v4";

const ZChatStatus = z.enum(["submitted", "streaming", "ready", "error"]);

type TChatStatus = z.infer<typeof ZChatStatus>;

export const ZChatState = z.object({
  chatStatus: ZChatStatus,
  isStreaming: z.boolean(),
  isReady: z.boolean(),
});

type TChatState = z.infer<typeof ZChatState>;

type TChatActions = {
  setChatStatus: (status: TChatStatus) => void;
};

export type TChatSlice = TChatState & TChatActions;

const initialState: TChatState = {
  chatStatus: "ready",
  isStreaming: false,
  isReady: true,
};

export const chatSlice: TStateCreator<TChatSlice> = (set) => {
  return {
    ...initialState,
    setChatStatus: (chatStatus) =>
      set({
        chatStatus,
        isStreaming: chatStatus === "streaming",
        isReady: chatStatus === "ready",
      }),
  };
};
