import { VNode} from "@cycle/dom";

export type DOMContent = string | VNode | Array<string|VNode>;
export function isDOMContent(content) : content is DOMContent {
  if (!content){
    return false;
  }
  if (typeof(content) === "string"){
    return true;
  }
  if (isVNode(content)) {
    return true;
  }
  if (content instanceof Array) {
    if (content.length === 0){
      return true;
    }
    else {
      return content[0].sel !== undefined || typeof(content[0]) === "string" ;
    };
  }
  return false;
}
export function isVNode(obj): obj is VNode {
    return obj && obj.sel !== undefined;
}
