import { DOMContent, VNode, IInteractiveComponentSources, IInteractiveComponentSinks } from "interfaces";
import { Size, Attachment } from "enums";
import { numToText } from "utils";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div, a } from "@cycle/dom";

export namespace Steps {
  export interface Props {
    link?: boolean;
    vertical?: boolean;
    stackable?: boolean;
    evenlyDivided?: boolean;
    fluid?: boolean;
    size?: Size;
    attachment?: Attachment;
  }
  export type Content = Array<StepItem>;
  export interface StepItem {
    icon?: DOMContent;
    header?: DOMContent;
    description?: DOMContent;
    isCompleted?: boolean;
    isActive?: boolean;
    isDisabled?: boolean;
    link?: boolean;
  }

  /**
   * A steps component to show the completion status of a series of activities.
   * Accepts the following properties in props$:
   *  link?: boolean - Styles to steps to display as a link.
   * 	vertical?: boolean - Styles the steps to align vertically.
   * 	stackable?: boolean - Lets the steps realign vertically on smaller screens.
   * 	evenlyDivided?: boolean - Arranges the steps to take up equal amount of width of their parent.
   * 	fluid?: boolean - Styles the steps to take up the full width of their parent.
   * 	size?: Size - The size of the steps.
   * 	attachment?: Attachment - Styles the steps to appear attached to nearby content.
   * Expects the following type of content in content$: Array of {}
   * 	icon?: DOMContent The icon to use for the step.
   * 	header?: DOMContent - The title for the step.
   * 	description?: DOMContent - The description for the step.
   * 	isCompleted?: boolean - Marks the step as completed.
   * 	isActive?: boolean - Marks the step as the current step.
   * 	isDisabled?: boolean - Marks the step as disabled.
   *  link?: boolean - Style the step to be clickable.
   */
  export function run(sources: IInteractiveComponentSources<Props, Content>): IInteractiveComponentSinks {
    function main(sources: IInteractiveComponentSources<Props, Content>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of([]);

      const vTree$ = xs.combine(sources.props$, sources.content$).map(
        ([props, content]) => render(props, content)
      );

      const evt = (type) => sources.DOM.select(".step").events(type);
      return {
        DOM: vTree$,
        Events: evt,
        value$: xs.never()
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * A steps component to show the completion status of a series of activities.
   * Accepts the following properties:
   *  link?: boolean - Styles to steps to display as a link.
   * 	vertical?: boolean - Styles the steps to align vertically.
   * 	stackable?: boolean - Lets the steps realign vertically on smaller screens.
   * 	evenlyDivided?: boolean - Arranges the steps to take up equal amount of width of their parent.
   * 	fluid?: boolean - Styles the steps to take up the full width of their parent.
   * 	size?: Size - The size of the steps.
   * 	attachment?: Attachment - Styles the steps to appear attached to nearby content.
   * Expects the following type of content: Array of {}
   * 	icon?: DOMContent The icon to use for the step.
   * 	header?: DOMContent - The title for the step.
   * 	description?: DOMContent - The description for the step.
   * 	isCompleted?: boolean - Marks the step as completed.
   * 	isActive?: boolean - Marks the step as the current step.
   * 	isDisabled?: boolean - Marks the step as disabled.
   *  link?: boolean - Style the step to be clickable.
   */
  export function render(pOrC: Props | Content = {}, c: Content = []): VNode {
    let props = pOrC instanceof Array ? {} : pOrC;
    let content = pOrC instanceof Array ? pOrC : c;
    let children = content.map(({icon, header, description, isCompleted, isActive, isDisabled, link}, i) =>
      props.link
        ? a({ props: { id: i, className: getStepClassname(isCompleted, isActive, isDisabled, link) } }, [
          icon,
          div({ props: { className: "content" } }, [
            div({ props: { className: "title" } }, header),
            div({ props: { className: "description" } }, description)
          ])
        ])
        : div({ props: { id: i, className: getStepClassname(isCompleted, isActive, isDisabled, link) } }, [
          icon,
          div({ props: { className: "content" } }, [
            div({ props: { className: "title" } }, header),
            div({ props: { className: "description" } }, description)
          ])
        ])
    );
    return div({ props: { className: getClassname(props, content.length) } }, children);
  }

  function getStepClassname(isCompleted?: boolean, isActive?: boolean, isDisabled?: boolean, link?: boolean) {
    let className = "";
    if (isActive) {
      className += "active";
    }
    if (isCompleted) {
      className += " completed";
    }
    if (isDisabled) {
      className += " disabled";
    }
    if (link) {
      className += " link";
    }
    className += " step";
    return className;
  }
  function getClassname(props: Props, length: number): string {
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
    if (props.evenlyDivided) {
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
}
