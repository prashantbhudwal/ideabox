import { bronnComponents } from "~/content/posts/bronn";
import { scientificMethod } from "~/content/posts/scientific-method";
import { sweetenerOptions } from "~/content/posts/sweetener-options";

import {
  Facebook,
  ImageX,
  Instagram,
  X,
  Youtube,
} from "~/client/components/blog/custom/embed";
import { Prose } from "~/client/components/blog/custom/prose";
import { GoDeep } from "~/client/components/blog/custom/go-deep";

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

const postComponents = {
  ...bronnComponents,
  ...sweetenerOptions,
  ...scientificMethod,
};

export const mdxComponents = {
  ...postComponents,
  ...embedComponents,
  ...customComponents,
};
