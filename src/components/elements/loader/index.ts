import { DOMContent, VNode, IInteractiveComponentSources, IInteractiveComponentSinks, isDOMContent } from "../../interfaces";
import { Size } from "../../enums";
import xs, { Stream } from "xstream";
import isolate from "@cycle/isolate";
import { div } from "@cycle/dom";
import { Dimmer } from "../dimmer";

export namespace Loader {
  export interface Props {
    type: LoaderType;
    element?: Stream<VNode>;
    on$?: Stream<boolean>;
    centered?: boolean;
    active?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    inverted?: boolean;
    text?: boolean;
    size?: Size;
  }
  /**
   * A loader component to show that certain content or a page is loading.
   * Accepts the following properties in props$:
   *   type: LoaderType - The type of loader to use. See exported enum.
   *   element?: Stream<VNode> - The element to mark as loaded. (Only used for type.Content)
   *   on$: Stream<boolean> - When to show/hide the loader. (Not used for inline, add disabled property instead.)
   *   centered?: boolean - Centers the loader spinner in its parent component.
   *   active?: boolean - Always shows the loader.
   *   disabled?: boolean - Always hides the loader.
   *   indeterminate?: boolean - Makes the loader spin indicate its unsure of how long a task will take.
   *   text?: boolean - Positions the loader to leave space for text.
   *   size?: Size - The size of the loader.
   * Expects the following type of content in content$ of: DOMContent
   */
  export function run(sources: IInteractiveComponentSources<Props, DOMContent>): IInteractiveComponentSinks {
    function main(sources: IInteractiveComponentSources<Props, DOMContent>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({ type: LoaderType.Inline });
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");

      const props$ = sources.props$.remember();
      const vTree$ = xs.combine(props$, sources.content$)
        .map(([props, content]) => render(props, content)
        );
      const on$ = props$.map(props => props.on$).flatten();
      const target$ = props$.map(props => props.type === LoaderType.Page ? xs.of("page") : props.element).flatten();
      const dimmer = Dimmer.run({ DOM: sources.DOM, args$: on$, target$, content$: vTree$ }, props$.map(props => props.inverted));
      const result$ = props$.map(
        props => props.type === LoaderType.Inline ? vTree$ : dimmer.DOM
      ).flatten();
      return {
        DOM: result$,
        Events: (type) => sources.DOM.select(".loader").events(type),
        value$: xs.never()
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * A loader component to show that certain content or a page is loading.
   * Accepts the following properties:
   *   type: LoaderType - The type of loader to use. See exported enum.
   *   element?: Stream<VNode> - The element to mark as loaded. (Only used for type.Content)
   *   on$: Stream<boolean> - When to show/hide the loader. (Not used for inline, add disabled property instead.)
   *   centered?: boolean - Centers the loader spinner in its parent component.
   *   active?: boolean - Always shows the loader.
   *   disabled?: boolean - Always hides the loader.
   *   indeterminate?: boolean - Makes the loader spin indicate its unsure of how long a task will take.
   *   text?: boolean - Positions the loader to leave space for text.
   *   size?: Size - The size of the loader.
   * Expects the following type of content: DOMContent
   */
  export function render(pOrC: Props | DOMContent = {type: LoaderType.Page}, c: DOMContent = ""): VNode[] {
    let props = isDOMContent(pOrC) ? { type: LoaderType.Page } : pOrC;
    let content = isDOMContent(pOrC) ? pOrC : c;
    return [div({ props: { className: getClassname(props) } }, content)];
  }
  function getClassname(props: Props): string {
    let className = "ui";
    if (props.active) {
      className += " active";
    }
    if (props.centered) {
      className += " centered";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.indeterminate) {
      className += " indeterminate";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (props.text) {
      className += " text";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    className += LoaderType.ToClassname(props.type);
    return className;
  }
  export enum LoaderType {
    Inline, Page, Content
  }
  export namespace LoaderType {
    export function ToClassname(type: LoaderType) {
      switch (type) {
        case LoaderType.Inline: return " inline loader";
        case LoaderType.Page: return " loader";
        case LoaderType.Content: return " loader";
      }
    }
  }
}
