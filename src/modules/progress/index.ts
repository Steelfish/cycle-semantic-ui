import { VNode, div } from "@cycle/dom";

import { DOMContent, isDOMContent, ContentObj, StyleAndContentArgs, ComponentSources, ComponentSinks  } from "../../types";
import { Size, SizeString, Attachment, AttachmentString, Color, ColorString } from "../../enums";
import { renderPropsAndContent, runPropsAndContent, makeIsArgs } from "../../common";

export namespace Progress {
  export interface Props {
    progress: number;
    active: boolean;
    disabled: boolean;
    inverted: boolean;
    attachment: Attachment | AttachmentString;
    size: Size | SizeString;
    color: Color | ColorString;
  }

  export type ProgressBarArgs = StyleAndContentArgs<Props, DOMContent, ContentObj<DOMContent>>;
  export type ProgressBarSources = ComponentSources<Props, DOMContent, ContentObj<DOMContent>>;

  export function render(arg1?: ProgressBarArgs|Partial<Props>|DOMContent, arg2?: DOMContent) {
    return renderPropsAndContent(progress, makeIsArgs(isDOMContent), isDOMContent, arg1, arg2);
  }

  export function run(sources: ProgressBarSources, scope?: string): ComponentSinks {
    return runPropsAndContent(sources, progress, ".progress", scope);
  }

  function progress(args: ProgressBarArgs): VNode {
    let props = args.props ? args.props: {progress: 0};
    let content = args.content ? isDOMContent(args.content) ? args.content : args.content.main : [];
    return div({ props: { className: getClassname(props) } }, [
      div({ props: { className: "bar" }, style: { width: props.progress + "%" } }, [
        div({ props: { className: "progress" } }, [props.progress + "%"])
      ]),
      div({ props: { className: "label" } }, content)
    ]);
  }

  function getClassname(props: Partial<Props>): string {
    let className = "ui";
    if (props.active) {
      className += " active";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (typeof (props.attachment) !== "undefined") {
      className += Attachment.ToClassname(props.attachment);
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    className += " progress";
    return className;
  }
}
