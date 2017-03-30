import xs, { Stream } from "xstream";
import isolate from "@cycle/isolate";
import { div, p, VNode } from "@cycle/dom";
import { Icon } from "../../elements/icon";
import { Transition } from "../../modules/transition";
import { DOMContent, isDOMContent, StyleAndContentArgs, ComponentSources, ComponentSinks } from "../../types";
import { Size, Color, Attachment, Animation, Direction, IconType } from "../../enums";
import { renderPropsAndContent } from "../../common";
import { getScope} from "../../utils";

export namespace Message {
  export interface Props {
    icon: boolean;
    floating: boolean;
    compact: boolean;
    hidden: boolean;
    forceVisible: boolean;
    attachment: Attachment | string;
    size: Size | string;
    color: Color | string;
  }
  export interface Content {
    icon: DOMContent;
    header: DOMContent;
    main: DOMContent;
  }

  export type MessageArgs = StyleAndContentArgs<Props, DOMContent, Content>;

  export interface MessageSources extends ComponentSources<Props, DOMContent, Content> {
    args?: {
      closeable?: true,
      on$?: Stream<boolean>
    };
  }

  export function render(arg1?: Partial<Props> | DOMContent | MessageArgs, arg2?: DOMContent): VNode {
    return renderPropsAndContent(message, isArgs, isDOMContent, arg1, arg2);
  }

  export function run(sources: MessageSources, scope: string = getScope()): ComponentSinks {
    function main(sources: MessageSources) {
      let props$ = sources.props$ ? sources.props$ : xs.of({});
      let content$ = sources.content$ ? sources.content$.map(c => isDOMContent(c) ? { main: c } : c) : xs.of({ main: [] });
      let on$ = sources.args && sources.args.on$ ? sources.args.on$ : xs.of(true);

      let vTree$:Stream<VNode>, active$:Stream<boolean>, icon:ComponentSinks;
      if (sources.args && sources.args.closeable) {
        icon = Icon.run({ DOM: sources.DOM, content$: xs.of(IconType.Close) }, scope);
        const close$ = icon.events("click").mapTo(false);
        vTree$ = xs.combine(props$, content$, icon.DOM)
          .map(([props, content, closeIcon]) => message({ props, content }, closeIcon));
        active$ = xs.merge(on$, close$);
      } else {
        vTree$ = xs.combine(props$, content$).map(([props, content]) => message({ props, content }));
        active$ = on$;
      }
      const transition$ = active$.fold((prevAnim, active) => prevAnim.direction === Direction.None
        ? { animation: Animation.None, direction: active ? Direction.In : Direction.Out }
        : { animation: Animation.Fade, direction: active ? Direction.In : Direction.Out }
        , { animation: Animation.None, direction: Direction.None });
        
      const animation = Transition.run({ DOM: sources.DOM, target$: vTree$, transition$ }, scope);
      
      let evt;
      if (sources.args && sources.args.closeable) {
        evt = (type) => xs.merge(sources.DOM.select(".message").events(type), icon.events(type), animation.events(type));
      } else {
        evt = (type) => sources.DOM.select(".message").events(type);
      }

      return {
        DOM: animation.DOM,
        events: evt
      };
    }
    if (scope === null) {
      return main(sources);
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }

  function message(args: MessageArgs, closeIcon?: VNode) {
    let props = args.props ? args.props : {};
    let content = args.content ? isDOMContent(args.content) ? { main: args.content } : args.content : { main: [] };
    if (content.icon) {
      props.icon = true;
    }
    if (typeof (content.main) === "string") {
      content.main = [p(content.main)];
    }
    return div({ props: { className: getClassname(props) } }, [].concat(
      content.icon ? content.icon : [], closeIcon ? closeIcon : [],
      div({ props: { className: "content" } }, [].concat(
        content.header ? div({ props: { className: "header" } }, content.header) : [],
        content.main
      ))
    ));
  }

  function getClassname(props: Partial<Props>): string {
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
    if (props.forceVisible) {
      className += " visible";
    }
    if (props.hidden) {
      className += " hidden";
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
    className += " message";
    return className;
  }

  function isArgs(obj): obj is MessageArgs {
    return typeof (obj) !== "undefined" && (typeof (obj.props) !== "undefined" || isContent(obj.content) || isDOMContent(obj.content));
  }

  function isContent(content): content is Content {
    return content !== undefined && (isDOMContent(content.icon) || isDOMContent(content.header) || isDOMContent(content.main));
  }
}
