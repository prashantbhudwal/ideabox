import { bronnComponents } from "@/content/posts/bronn";
import { scientificMethod } from "@/content/posts/scientific-method";
import { sweetenerOptions } from "@/content/posts/sweetener-options";
import {
  FacebookEmbed,
  InstagramEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";
import { Facebook, ImageX, Instagram, X, Youtube } from "../embed";
import { GoDeep } from "./go-deep";
import { Prose } from "../markdown-parser/prose";

const externalComponents = {
  FacebookEmbed,
  YouTubeEmbed,
  InstagramEmbed,
};

const embedComponents = {
  ImageX,
  Facebook,
  Instagram,
  Youtube,
  X,
};

const customComponents = {
  GoDeep,
  Prose,
};

export const postComponents = {
  ...bronnComponents,
  ...sweetenerOptions,
  ...scientificMethod,
  ...externalComponents,
  ...embedComponents,
  ...customComponents,
};
