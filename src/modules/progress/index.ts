import { DOMContent, VNode, IInteractiveComponentSources, IInteractiveComponentSinks, isDOMContent } from "interfaces";
import { Size, Attachment, Color } from "enums";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { div } from "@cycle/dom";

export namespace ProgressBar {
  export interface Props {
    progress: number;
    active?: boolean;
    disabled?: boolean;
    inverted?: boolean;
    attachment?: Attachment;
    size?: Size;
    color?: Color;
  }
  /**
   * Creates a Label component to add information to certain content.
   * Accepts the following properties in props$:
   *   progress: number - The % of progress the progress bar should reflect.
   *   active?: boolean - Styles the progress bar to reflect activitiy.
   *   disabled?: boolean - Styles the progress bar to appear disabled.
   *   inverted?: boolean - Styles the progress bar for dark backgrounds.
   *   attachment?: Attachment - Where the progress bar should be attached to.
   *   size?: Size - The size of the progress bar.
   *   color?: Color - The color of the progress bar.
   * Expects the following type of content in content$: DOMContent
   */
  export function run(sources: IInteractiveComponentSources<Props, DOMContent>): IInteractiveComponentSinks {
    function main(sources: IInteractiveComponentSources<Props, DOMContent>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({ progress: 0 });
      sources.content$ = sources.content$ ? sources.content$ : xs.of([]);

      const vTree$ = xs.combine(sources.props$, sources.content$).map(
        ([props, content]) => render(props, content)
      );
      return {
        DOM: vTree$,
        Events: (type) => sources.DOM.select(".progress").events(type)
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * Creates a Label component to add information to certain content.
   * Accepts the following propertiea:
   *   progress: number - The % of progress the progress bar should reflect.
   *   active?: boolean - Styles the progress bar to reflect activitiy.
   *   disabled?: boolean - Styles the progress bar to appear disabled.
   *   inverted?: boolean - Styles the progress bar for dark backgrounds.
   *   attachment?: Attachment - Where the progress bar should be attached to.
   *   size?: Size - The size of the progress bar.
   *   color?: Color - The color of the progress bar.
   * Expects the following type of content: DOMContent
   */
  export function render(pOrC: Props | DOMContent = {progress: 0}, c: DOMContent = ""): VNode {
    let props = isDOMContent(pOrC) ? { progress: 0 } : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    return div({ props: { className: getClassname(props) } }, [
      div({ props: { className: "bar" } }, { style: { width: props.progress + "%" } }, [
        div({ props: { className: "progress" } }, [props.progress + "%"])
      ]),
      div({ props: { className: "label" } }, content)
    ]);
  }

  function getClassname(props: Props): string {
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
