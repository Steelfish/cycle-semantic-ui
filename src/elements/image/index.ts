import { VNode, a, img } from "@cycle/dom";
import { StyleAndContentArgs, ComponentSources, ComponentSinks, ContentObj } from "../../types";
import { Size, VerticalAlignment, Float } from "../../enums";
import { runPropsAndContent, renderPropsAndContent, makeIsArgs, addClassName } from "../../common";
import { getScope} from "../../utils";
export namespace Image {
  export interface Props {
    href: string;
    hidden: boolean;
    disabled: boolean;
    avatar: boolean;
    bordered: boolean;
    spaced: boolean;
    circular: boolean;
    rounded: boolean;
    float: Float | string;
    size: Size | string;
    alignment: VerticalAlignment | string;
  }

  export type ImageArgs = StyleAndContentArgs<Props, string, ContentObj<string>>;
  export type ImageSources = ComponentSources<Props, string, ContentObj<string>>;

  export function run(sources: ImageSources, scope: string = getScope()): ComponentSinks {
    return runPropsAndContent(sources, image, ".image", scope);
  }
  export function render(arg1?: ImageArgs | Partial<Props> | string, arg2?: string) {
    return renderPropsAndContent(image, makeIsArgs(isUrl), isUrl, arg1, arg2);
  }
  export function from(node: VNode, props: Partial<Props> = {}): VNode {
    return addClassName(node, getClassname(props));
  }
  export function image(args: ImageArgs): VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isUrl(args.content) ? args.content : args.content.main : "";
    let image = img({ props: { className: getClassname(props), src: content } });
    return props.href ? a({ props: { href: props.href } }, image) : image;
  }
  function getClassname(props: Partial<Props>): string {
    let className = "ui";
    if (props.href) {
      className += " link";
    }
    if (props.hidden) {
      className += " hidden";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.avatar) {
      className += " avatar";
    }
    if (props.bordered) {
      className += " bordered";
    }
    if (props.spaced) {
      className += " spaced";
    }
    if (props.circular) {
      className += " circular";
    }
    if (props.rounded) {
      className += " rounded";
    }
    if (typeof (props.float) !== "undefined") {
      className += Float.ToClassname(props.float);
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.alignment) !== "undefined") {
      className += VerticalAlignment.ToClassname(props.alignment);
    }
    return className + " image";
  }

  function isUrl(obj): obj is string {
    return typeof (obj) === "string";
  }
}
