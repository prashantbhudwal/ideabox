import { bronnComponents } from "~/content/posts/bronn";
import { scientificMethod } from "~/content/posts/scientific-method";
import { sweetenerOptions } from "~/content/posts/sweetener-options";
import {
  FacebookEmbed,
  InstagramEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";
import {
  Facebook,
  ImageX,
  Instagram,
  X,
  Youtube,
} from "~/client/components/blog/custom/embed";
import { Prose } from "~/client/components/blog/custom/prose";
import { GoDeep } from "~/client/components/blog/custom/go-deep";
import { ClientOnly } from "@tanstack/react-router";

const externalComponents = {
  FacebookEmbed,
  YouTubeEmbed,
  InstagramEmbed,
};

const embedComponents = {
  ImageX,
  Facebook,
  Instagram,
  X,
  Youtube,
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
