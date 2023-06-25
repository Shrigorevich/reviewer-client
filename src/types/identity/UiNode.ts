import { UiNodeAttributes } from "./UiNodeAttributes";
import { UiNodeMeta } from "./UiNodeMeta";

export type UiNode = {
  attributes: UiNodeAttributes;
  group: string;
  messages: string[];
  meta: UiNodeMeta;
  type: string;
};
