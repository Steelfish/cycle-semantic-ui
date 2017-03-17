import isolate from "@cycle/isolate";
import { VNode, div } from "@cycle/dom";
import xs, { Stream, MemoryStream } from "xstream";

import { IconType, Direction, Animation } from "../../enums";
import { Dimmer } from "../../modules/dimmer";
import { Icon } from "../../elements/icon";
import { Transition } from "../../modules/transition";
import { DOMContent, isDOMContent, ComponentSources, ComponentSinks } from "../../types";
import { getScope} from "../../utils";

export namespace Modal {
  export interface Props {
    inverted: boolean;
  }
  export interface ContentObj {
    main: DOMContent;
    header: DOMContent;
    actions: DOMContent;
  }
  export interface ModalSources extends ComponentSources<Props, DOMContent, ContentObj> {
    args?: {
      on$?: Stream<boolean>;
      target$?: Stream<VNode>;
    };
  }

  export function run(sources: ModalSources, scope: string = getScope()) : ComponentSinks {
    function main(sources: ModalSources) {
      const props$ = sources.props$ ? sources.props$ : xs.of({}) as Stream<Partial<Props>>;
      const content$ = sources.content$ ? sources.content$.map(c => isDOMContent(c) ? { main: c } : c) : xs.of({ main: [] });
      const target$ = sources.args && sources.args.target$ ? sources.args.target$ : xs.of("page");
      const show$= sources.args && sources.args.on$ ? sources.args.on$ : xs.of(true);

      const closeIcon = Icon.run({ DOM: sources.DOM, props$: xs.of({ link: true }), content$: xs.of(IconType.Close) }, scope);
      const close$ = closeIcon.events("click").mapTo(false);

      /*** Render modal ***/
      let dimmerclick$proxy = xs.create() as Stream<boolean>;
      const on$ = xs.merge(show$, dimmerclick$proxy, close$).remember() as MemoryStream<boolean>;
      const modal$ = xs.combine(content$, closeIcon.DOM).map(
        ([content, icon]) =>
          div({ props: { className: "ui scrolling active modal" } }, [].concat(
            icon,
            content.header ? div({ props: { className: "header" } }, content.header) : [],
            div({ props: { className: "content" } }, content.main),
            content.actions ? div({ props: { className: "actions" } }, content.actions) : []
          ))
      ).remember();

      /*** Animation ***/
      const transition$ = on$
        .fold((prevAnim, active) => prevAnim.direction === Direction.None
          ? ({ animation: Animation.None, direction: active ? Direction.In : Direction.Out })
          : {
            animation: Animation.Scale, direction: active ? Direction.In : Direction.Out
          }
        , ({ animation: Animation.None, direction: Direction.None }));
      const animatedContent = Transition.run({ DOM: sources.DOM, target$: modal$, transition$ }, scope + "_transition");

      /*** Activate dimmer ***/
      let dimmerContent$ = animatedContent.DOM.map(x => [x]);
      const dimmer = Dimmer.run({
        DOM: sources.DOM,
        props$: props$.map(x => ({ inverted: x.inverted })),
        content$: dimmerContent$,
        args: { target$, on$ }
      }, scope);
      const dimmerclick$ = dimmer.events("mousedown")
        .filter(evt => evt.srcElement === (evt as MouseEvent).currentTarget)
        .mapTo(false);
      dimmerclick$proxy.imitate(dimmerclick$);
      
      return {
        DOM: dimmer.DOM,
        events: (type) => xs.merge(sources.DOM.select(".modal").events(type), dimmer.events(type), closeIcon.events(type))
      };
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }
}
