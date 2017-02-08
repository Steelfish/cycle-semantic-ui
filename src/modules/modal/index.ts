import { DOMContent, VNode, DOMSource } from "interfaces";
import isolate from "@cycle/isolate";
import { div } from "@cycle/dom";
import xs, { Stream, MemoryStream } from "xstream";

import { IconType, Direction, Animation} from "enums";
import { Dimmer} from "modules/dimmer";
import { Icon } from "elements/icon";
import { Transition } from "modules/transition";

export namespace Modal {
  export interface Props {
    header?: string;
    inverted?: boolean;
  }
  export interface ModalSources {
    DOM: DOMSource;
    on$: Stream<boolean>;
    props$?: Stream<Props>;
    content$?: Stream<DOMContent>;
    actions$?: Stream<DOMContent>;
    target$?: Stream<VNode>;
  }
  /**
   * A modal component for displaying content in a modal.
   * Accepts the following type of properties in props$:
   *   header: String - The header text for the component.
   *   on$: Stream<Boolean> - When to display the modal.
   * Expects the following type of content in content$: DOMContent
   */
  export function run(sources: ModalSources) {
    function main(sources: ModalSources) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({ on$: xs.of(false) });
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");
      sources.actions$ = sources.actions$ ? sources.actions$ : xs.of("");
      sources.target$ = sources.target$ ? sources.target$ : xs.of("page");

      const closeIcon = Icon.run({ DOM: sources.DOM, props$: xs.of({ link: true }), content$: xs.of(IconType.Close) });
      const close$ = closeIcon.Events("click").mapTo(false);

      /*** Render modal ***/
      let dimmerclick$proxy = xs.create() as Stream<boolean>;
      const on$ = xs.merge(sources.on$, dimmerclick$proxy, close$).remember() as MemoryStream<boolean>;
      const content$ = xs.combine(sources.props$, sources.content$, sources.actions$, closeIcon.DOM).map(
        ([props, content, actions, icon]) =>
          div({ props: { className: "ui scrolling active modal" } }, [
            icon,
            div({ props: { className: "header" } }, props.header),
            div({ props: { className: "content" } }, content),
            actions ? div({ props: { className: "actions" } }, actions) : ""
          ])
      ).remember();

      /*** Animation ***/
      const transition$ = on$
        .fold((prevAnim, active) => prevAnim.direction === Direction.None
          ? ({ animation: Animation.None, direction: active ? Direction.In : Direction.Out })
          : {
            animation: Animation.Fade, direction: active ? Direction.In : Direction.Out
          }
        , ({ animation: Animation.None, direction: Direction.None }));
      const animatedContent = Transition.run({ DOM: sources.DOM, target$: content$, args$: transition$ });

      /*** Activate dimmer ***/
      let dimmerContent$ = animatedContent.DOM.map(x => [x]);
      const dimmer = Dimmer.run({ DOM: sources.DOM, target$: sources.target$, args$: on$, content$: dimmerContent$ }, sources.props$.map(x => x.inverted));
      const dimmerclick$ = dimmer.Events("mousedown")
        .filter(evt => evt.srcElement === (evt as MouseEvent).currentTarget)
        .mapTo(false);
      dimmerclick$proxy.imitate(dimmerclick$);

      const fadeOutEnd$ = on$.map(active => !active ? dimmer.Events("animationend") : xs.never()).flatten().mapTo(false);
      // const active$ = xs.merge(sources.on$, fadeOutEnd$).remember();
      return {
        active$: xs.merge(sources.on$, fadeOutEnd$),
        DOM: dimmer.DOM,
        Events: animatedContent.Events
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }
}
