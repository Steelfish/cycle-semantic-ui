import { div, VNode } from "@cycle/dom";
import { ComponentSources, ComponentSinks, StyleAndContentArgs, ContentObj, DOMContent, isDOMContent } from "../../types";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs } from "../../common";
import { VerticalAlignment, VerticalAlignmentString, TextAlignment, TextAlignmentString } from "../../enums";
import { numToText } from "../../utils";

export namespace Grid {
  export interface Props {
    width: number;
    equalWidth: boolean;
    divided: boolean;
    container: boolean;
    celled: boolean;
    intCelled: boolean;
    padded: boolean;
    relaxed: boolean;
    centered: boolean;
    stackable: boolean;
    doubling: boolean;
    reversedMobile: boolean;
    reversedTablet: boolean;
    reversedComputer: boolean;
    reversedLargescreen: boolean;
    mobileOnly: boolean;
    tabletOnly: boolean;
    computerOnly: boolean;
    largescreenOnly: boolean;
    alignment: VerticalAlignment | VerticalAlignmentString;
    textAlignment: TextAlignment | TextAlignmentString;
  }

  export type GridArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type GridSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;
  export function render(arg1?: Partial<Props> | DOMContent | GridArgs, arg2?: DOMContent): VNode {
    return renderPropsAndContent(grid, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }
  export function run(sources: GridSources, scope?: string): ComponentSinks {
    return runPropsAndContent(sources, grid, ".grid", scope);
  }

  export function grid(args: GridArgs): VNode {
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    let props = typeof (args.props) !== "undefined" ? args.props : {};
    return div({ props: { className: getClassname(props, content) } }, content);
  }
  export function getClassname(props: Partial<Props>, content: DOMContent): string {
    let className = "ui";
    if (props.equalWidth) {
      className += " equal width";
    }
    if (props.divided) {
      className += " divided";
    }
    if (props.container) {
      className += " container";
    }
    if (props.celled) {
      className += " celled";
    }
    if (props.intCelled) {
      className += " internally celled";
    }
    if (props.padded) {
      className += " padded";
    }
    if (props.relaxed) {
      className += " relaxed";
    }
    if (props.centered) {
      className += " centered";
    }
    if (props.stackable) {
      className += " stackable";
    }
    if (props.doubling) {
      className += " doubling";
    }
    if (props.reversedMobile) {
      className += " mobile reversed";
    }
    if (props.reversedTablet) {
      className += " tablet reversed";
    }
    if (props.reversedComputer) {
      className += " computer reversed";
    }
    if (props.reversedLargescreen) {
      className += " largescreen reversed";
    }
    if (props.mobileOnly) {
      className += " mobile only";
    }
    if (props.tabletOnly) {
      className += " tablet only";
    }
    if (props.computerOnly) {
      className += " computer only";
    }
    if (props.largescreenOnly) {
      className += " largescreen only";
    }
    if (typeof (props.alignment) !== "undefined") {
      className += VerticalAlignment.ToClassname(props.alignment);
    }
    if (typeof (props.textAlignment) !== "undefined") {
      className += TextAlignment.ToClassname(props.textAlignment);
    }
    if (props.width) {
      className += numToText(props.width) + " column";
    }
    className += " grid";
    return className;
  }
}
