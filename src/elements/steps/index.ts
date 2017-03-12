import { VNode, div, a } from "@cycle/dom";
import { DOMContent, ContentObj, StyleAndContentArgs, ComponentSources, ComponentSinks } from "../../types";
import { Size,  Attachment} from "../../enums";
import { numToText } from "../../utils";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs } from "../../common";

export namespace Steps {
  export interface Props {
    vertical: boolean;
    stackable: boolean;
    equalWidth: boolean;
    fluid: boolean;
    size: Size | string;
    attachment: Attachment | string;
  }
  export type Content = Array<Partial<StepItem>>;
  export interface StepItem {
    icon: DOMContent;
    header: DOMContent;
    description: DOMContent;
    completed: boolean;
    active: boolean;
    disabled: boolean;
    link: boolean;
    href: string;
  }

  export type StepArgs = StyleAndContentArgs<Props, Content, ContentObj<Content>>;
  export type StepSources = ComponentSources<Props, Content, ContentObj<Content>>;

  export function render(arg1?: StepArgs | Partial<Props> | Content, arg2?: Content) {
    return renderPropsAndContent(steps, makeIsArgs(isContent), isContent, arg1, arg2);
  }

  export function run(sources: StepSources, scope?: string): ComponentSinks {
    return runPropsAndContent(sources, steps, ".steps", scope);
  }

  function steps(args: StepArgs): VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isContent(args.content) ? args.content : args.content.main : [];
    return div({ props: { className: getClassname(props, content.length) } }, content.map(stepItem));
  }

  function stepItem(item: StepItem, i: number): VNode {
    let icon = item.icon ? item.icon : [];
    let header = item.header ? div({ props: { className: "title" } }, item.header) : [];
    let description = item.description ? div({ props: { className: "description" } }, item.description) : [];
    let content = [].concat(header, description);
    let children = [].concat(icon, content.length > 0 ? [div({ props: { className: "content" }}, content)] : []);
    return item.href 
      ? a({props: { id: i, className: getStepClassname(item), href: item.href}}, children)
      : div({props: { id: i, className: getStepClassname(item)}}, children);
  }
  
  function getClassname(props: Partial<Props>, length: number): string {
    let className = "ui";
    if (props.vertical) {
      className += " vertical";
    }
    if (props.stackable) {
      className += " stackable";
    }
    if (props.fluid) {
      className += " fluid";
    }
    if (props.equalWidth) {
      className += numToText(length);
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.attachment) !== "undefined") {
      className += Attachment.ToClassname(props.attachment);
    }
    className += " steps";
    return className;
  }

  function getStepClassname(item: StepItem) : string {
    let className = "";
    if (item.active) {
      className += "active";
    }
    if (item.completed) {
      className += " completed";
    }
    if (item.disabled) {
      className += " disabled";
    }
    if (item.link) {
      className += " link";
    }
    className += " step";
    return className;
  }
  function isContent(obj) : obj is Content {
    return obj instanceof Array;
  }
}
