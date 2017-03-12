import { VNode, i } from "@cycle/dom";
import { ComponentSources, ComponentSinks, StyleAndContentArgs, ContentObj } from "../../types";
import { Color, Size, IconType } from "../../enums";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs } from "../../common";

export namespace Icon {
  export interface Props {
    button: boolean;
    bordered: boolean;
    circular: boolean;
    disabled: boolean;
    loading: boolean;
    fitted: boolean;
    link: boolean;
    flipped: boolean;
    rotated: boolean;
    inverted: boolean;
    color: Color | string;
    size: Size | string;
  }

  export type IconArgs = StyleAndContentArgs<Props, IconType | string, ContentObj<IconType | string>>;
  export type IconSources = ComponentSources<Props, IconType | string, ContentObj<IconType | string>>;

  export function run(sources: IconSources, scope?: string): ComponentSinks {
    return runPropsAndContent(sources, icon, ".icon", scope);
  }
  export function render(arg1?: IconArgs | Partial<Props> | IconType | string, arg2?: IconType | string) {
    return renderPropsAndContent(icon, makeIsArgs(isIconType), isIconType, arg1, arg2);
  }

  function icon(args: IconArgs): VNode {
    let props = args.props ? args.props : {};
    let content = typeof (args.content) !== "undefined" ? isIconType(args.content) ? args.content : args.content.main : -1;
    const className = getClassname(props, content);
    return className !== "ui icon" ? i({ props: { className: className } }) : undefined;
  }
  function getClassname(props: Partial<Props>, content: IconType | string): string {
    let className = "ui";
    if (props.button) {
      className += " button";
    }
    if (props.bordered) {
      className += " bordered";
    }
    if (props.circular) {
      className += " circular";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.loading) {
      className += " loading";
    }
    if (props.fitted) {
      className += " fitted";
    }
    if (props.link) {
      className += " link";
    }
    if (props.flipped) {
      className += " flipped";
    }
    if (props.rotated) {
      className += " rotated";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    className += IconType.ToClassname(content);
    return className + " icon";
  }

  function isIconType(obj): obj is IconType | string {
    return typeof (obj) === "string" || typeof (obj) === "number";
  }
}
