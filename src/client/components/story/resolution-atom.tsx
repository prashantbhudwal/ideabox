import { LEVEL } from "./types";
import { atom } from "jotai";

export const resolutionAtom = atom<number>(LEVEL.basic.value);
