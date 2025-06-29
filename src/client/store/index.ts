import { create, type StateCreator } from "zustand";
import { viewportSlice, TViewPortSlice } from "./viewport.slice";
import { chatSlice, TChatSlice } from "./chat.slice";
import { TUserStateSlice, userSlice } from "./user.slice";

type TStore = TViewPortSlice & TUserStateSlice & TChatSlice;

export type TStateCreator<T> = StateCreator<TStore, [], [], T>;

export const useStore = create<TStore>()((set, ...args) => ({
  ...viewportSlice(set, ...args),
  ...userSlice(set, ...args),
  ...chatSlice(set, ...args),
}));
