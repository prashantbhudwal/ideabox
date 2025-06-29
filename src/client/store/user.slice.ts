import { TStateCreator } from ".";
import { z } from "zod/v4";

export const ZUserState = z.object({
  isTyping: z.boolean(),
});

type TUserState = z.infer<typeof ZUserState>;

type TUserStateActions = {
  setIsTyping: (isTyping: boolean) => void;
};

export type TUserStateSlice = TUserState & TUserStateActions;

const initialState: TUserState = {
  isTyping: false,
};

export const userSlice: TStateCreator<TUserStateSlice> = (set) => ({
  ...initialState,
  setIsTyping: (isTyping) => set({ isTyping }),
});
