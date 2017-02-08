import { DOMContent, VNode, IInteractiveComponentSources, IInteractiveComponentSinks, isDOMContent } from "interfaces";
import { IconType, Size, Color, Animation, Direction } from "enums";
import xs, { Stream } from "xstream";
import isolate from "@cycle/isolate";
import { div } from "@cycle/dom";
import { Icon } from "elements/icon";
import { Transition } from "modules/transition";

export namespace Message {
  export interface Props {
    on$?: Stream<boolean>;
    closeable?: boolean;
    icon?: boolean;
    floating?: boolean;
    compact?: boolean;
    attached?: boolean;
    size?: Size;
    color?: Color;
  }
  export interface Content {
    icon?: IconType;
    header?: DOMContent;
    body?: DOMContent;
  }
  /**
   * A message component to present messages to users.
   * Accepts the following properties in props$:
   *   on$?: Stream<boolean> - When to show/hide the message.
   *   closeable?: boolean - Provides a close icon for the message for dismissal.
   *   icon?: boolean - Formats the message to support an icon.
   *   floating?: boolean - Formats the message to float above related content.
   *   compact?: boolean - Formats a message to only occupy width needed by its content.
   *   attached?: boolean - Formats the message to appear attached to other content.
   *   size?: Size - The size of the message.
   *   color?: Color - The color of the message.
   * Expects the following type of content in content$: {}
   *   icon?: String|VNode - A message can have an icon signifying the type of message.
   *   header?: String|VNode - A message can have a header text.
   *   body?: String|VNode - A message can have additionaly body content.
   */
  export function run(sources: IInteractiveComponentSources<Props, Content>): IInteractiveComponentSinks {
    function main(sources: IInteractiveComponentSources<Props, Content>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");

      const icon = Icon.run({ DOM: sources.DOM, props$: xs.of({ type: "close" }) });
      const close$ = icon.Events("click").mapTo(false);
      const vTree$ = xs.combine(sources.props$, sources.content$, icon.DOM)
        .map(([props, content, closeIcon]) =>
          div({ props: { className: getClassname(props) } }, [
            content.icon,
            props.closeable ? closeIcon : "",
            div({ props: { className: "content" } }, [].concat(
              content.header ? div({ props: { className: "header" } }, content.header) : "",
              content.body
            ))
          ])
        );
      const on$ = sources.props$.map(props => props.on$ ? props.on$ : xs.of(true)).flatten();
      const active$ = xs.merge(on$, close$);
      const transition$ = active$.fold((prevAnim, active) => prevAnim.direction === Direction.None
        ? { animation: Animation.None, direction: active ? Direction.In : Direction.Out }
        : { animation: Animation.Fade, direction: active ? Direction.In : Direction.Out }
        , { animation: Animation.None, direction: Direction.None });
      const animatedVTree$ = Transition.run({ DOM: sources.DOM, target$: vTree$, args$: transition$ }).DOM;
      return {
        DOM: animatedVTree$,
        Events: (type) => sources.DOM.select(".message").events(type)
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * A message component to present messages to users.
   * Accepts the following properties:
   *   on$?: Stream<boolean> - When to show/hide the message.
   *   closeable?: boolean - Provides a close icon for the message for dismissal.
   *   icon?: boolean - Formats the message to support an icon.
   *   floating?: boolean - Formats the message to float above related content.
   *   compact?: boolean - Formats a message to only occupy width needed by its content.
   *   attached?: boolean - Formats the message to appear attached to other content.
   *   size?: Size - The size of the message.
   *   color?: Color - The color of the message.
   * Expects the following type of content: {}
   *   icon?: String|VNode - A message can have an icon signifying the type of message.
   *   header?: String|VNode - A message can have a header text.
   *   body?: String|VNode - A message can have additionaly body content.
   */
  export function render(pOrC: Props | Content = {}, c: Content = {}): VNode {
    let props = isContent(pOrC) ? {} : pOrC;
    let content = isContent(pOrC) ? pOrC : c;
    const closeIcon = Icon.render({}, IconType.Close);
    return div({ props: { className: getClassname(props) } }, [
      content.icon ? Icon.render(content.icon) : "",
      props.closeable ? closeIcon : "",
      div({ props: { className: "content" } }, [].concat(
        content.header ? div({ props: { className: "header" } }, content.header) : "",
        content.body
      ))
    ]);
  }

  function getClassname(props: Props): string {
    let className = "ui";
    if (props.icon) {
      className += " icon";
    }
    if (props.floating) {
      className += " floating";
    }
    if (props.compact) {
      className += " compact";
    }
    if (props.attached) {
      className += " attached";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    className += " message";
    return className;
  }

  function isContent(content): content is Content {
    return content !== undefined && (isDOMContent(content.icon) || isDOMContent(content.header) || isDOMContent(content.body));
  }
}
