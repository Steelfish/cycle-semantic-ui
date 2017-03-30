import { VNode, div } from "@cycle/dom";
import xs, { Stream } from "xstream";
import isolate from "@cycle/isolate";
import debounce from "xstream/extra/debounce";
import dropRepeats from "xstream/extra/dropRepeats";
import delay from "xstream/extra/delay";
import * as Tether from "tether";

import { DOMContent, isDOMContent, ComponentSources, ComponentSinks } from "../../types";
import { Size, Animation, Direction } from "../../enums";
import { Transition } from "../../modules/transition";
import { capitalize, getScope } from "../../utils";


export namespace Popup {
  export interface Props {
    wide: boolean;
    veryWide: boolean;
    flowing: boolean;
    inverted: boolean;
    size: Size | string;
    attachment: Popup.Attachment | string;
  }
  export interface ContentObj {
    main: DOMContent;
    header: DOMContent;
  }
  export interface PopupSources extends ComponentSources<Props, DOMContent, ContentObj> {
    args: {
      target$: Stream<VNode | Element>,
      on$?: Stream<boolean>,
    };
  }

  export function run(sources: PopupSources, scope: string = getScope()): ComponentSinks {
    function main(sources: PopupSources) {
      if (!(sources.args && sources.args.target$)) {
        throw ("Popups must be attached to an element");
      }
      const props$ = sources.props$ ? sources.props$ : xs.of({ attachment: Attachment.BottomLeft });
      const content$ = sources.content$ ? sources.content$.map(c => isDOMContent(c) ? { main: c } : c) : xs.of({ main: [] });
      const on$ = sources.args.on$ ? sources.args.on$ : xs.of(true);
      const evt = (type) => sources.DOM.select(".popup").events(type) as Stream<Event>;

      const vTree$ = xs.combine(props$, content$, sources.args.target$).map(
        ([props, content, target]) => popup(props, content, target)
      );

      const mouseenter$proxy = xs.create() as xs<Event>;
      const mouseleave$proxy = xs.create() as xs<Event>;
      const mouserInteract$ = xs.merge(mouseleave$proxy, mouseenter$proxy)
        .map(evt => evt.type === "mouseenter" ? Direction.In : Direction.Out)
        .compose(debounce(200))
        .filter(dir => dir === Direction.Out);
      const active$ = on$.map(active => active ? Direction.In : Direction.Out).drop(1);
      const timer$ = active$.map(dir => dir === Direction.Out ? xs.never()
        : xs.of(Direction.Out).compose(delay(1000)).endWhen(mouseenter$proxy)
      ).flatten();
      const transition$ = xs.merge(active$, mouserInteract$, timer$)
        .map(dir => ({
          animation: Animation.Fade,
          direction: dir
        }))
        .compose(dropRepeats(
          (a, b) => (a as any).direction === (b as any).direction
            && (a as any).animation === (b as any).animation
        ))
        .startWith({ animation: Animation.None, direction: Direction.Out }) as Stream<any>;
      const animatedPopup = Transition.run({ DOM: sources.DOM, target$: vTree$, transition$ }, scope);
      mouseenter$proxy.imitate(animatedPopup.events("mouseenter"));
      mouseleave$proxy.imitate(animatedPopup.events("mouseleave"));
      return {
        DOM: animatedPopup.DOM,
        events: (type) => xs.merge(evt(type), animatedPopup.events(type))
      };
    }
    if (scope === null) {
      return main(sources);
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }

  function popup(props: Partial<Props>, content: Partial<ContentObj>, target: VNode | Element): VNode {
    return div({
      props: { className: getClassname(props) }, hook: {
        insert: (vnode) => {
          new Tether({
            element: vnode.elm,
            target: target.hasOwnProperty("elm") ? target["elm"] : target,
            attachment: Attachment.ToOppositeTether(props.attachment),
            targetAttachment: Attachment.ToTether(props.attachment)
          });
        }
      }
    }, [].concat(
      content.header ? div({ props: { className: "header" } }, content.header) : [],
      content.main
    ));
  }

  function getClassname(props: Partial<Props>): string {
    let className = "ui";
    if (props.wide) {
      className += " wide";
    }
    if (props.veryWide) {
      className += " very wide";
    }
    if (props.flowing) {
      className += " flowing";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    className += Attachment.ToClassname(props.attachment) + " popup";
    return className;
  }
  export enum Attachment {
    TopLeft, TopMiddle, TopRight, LeftCenter, RightCenter,
    BottomLeft, BottomMiddle, BottomRight,
    Center
  }
  export namespace Attachment {
    export function ToEnum(attachmentstring: Attachment | string): Attachment {
      if (typeof (attachmentstring) === "number") {
        return attachmentstring;
      }
      return Attachment[attachmentstring.split(" ").map(capitalize).join("")];
    }
    export function ToClassname(attachment: Attachment | string) {
      attachment = Attachment.ToEnum(attachment);
      switch (attachment) {
        case Attachment.TopLeft: return " top left";
        case Attachment.TopMiddle: return " top center";
        case Attachment.TopRight: return " top right";
        case Attachment.LeftCenter: return " left center";
        case Attachment.RightCenter: return " right center";
        case Attachment.BottomLeft: return " bottom left";
        case Attachment.BottomMiddle: return " bottom center";
        case Attachment.BottomRight: return " bottom right";
        case Attachment.Center: return " center";
        default: return " bottom left";
      }
    }
    export function ToTether(attachment: Attachment | string) {
      attachment = Attachment.ToEnum(attachment);
      switch (attachment) {
        case Attachment.TopLeft: return "top left";
        case Attachment.TopMiddle: return "top center";
        case Attachment.TopRight: return "top right";
        case Attachment.LeftCenter: return "left middle";
        case Attachment.RightCenter: return "right middle";
        case Attachment.BottomLeft: return "bottom left";
        case Attachment.BottomMiddle: return "bottom center";
        case Attachment.BottomRight: return "bottom right";
        case Attachment.Center: return "center";
        default: return "bottom left";
      }
    }
    export function ToOppositeTether(attachment: Attachment | string) {
      attachment = Attachment.ToEnum(attachment);
      switch (attachment) {
        case Attachment.TopLeft: return "bottom right";
        case Attachment.TopMiddle: return "bottom center";
        case Attachment.TopRight: return "bottom left";
        case Attachment.LeftCenter: return "right middle";
        case Attachment.RightCenter: return "left middle";
        case Attachment.BottomLeft: return "top right";
        case Attachment.BottomMiddle: return "top center";
        case Attachment.BottomRight: return "top left";
        case Attachment.Center: return "center";
        default: return "bottom left";
      }
    }
  }
}
