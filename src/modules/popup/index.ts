import { DOMContent, VNode, ITargettingComponentSources, IInteractiveComponentSinks } from "interfaces";
import { Size, Animation, Direction } from "enums";
import { Transition } from "modules/transition";
import { div } from "@cycle/dom";
import xs, { Stream } from "xstream";
import isolate from "@cycle/isolate";
import debounce from "xstream/extra/debounce";
import dropRepeats from "xstream/extra/dropRepeats";
import delay from "xstream/extra/delay";

export namespace Popup {
  export interface Args {
    active: boolean;
    attachment: PopupAttachment;
    header?: string;
    wide?: boolean;
    veryWide?: boolean;
    flowing?: boolean;
    inverted?: boolean;
    size?: Size;
  }

  export interface ITetheredInteractiveComponentSinks extends IInteractiveComponentSinks {
    tether: any;
  }

  export function run(sources: ITargettingComponentSources<VNode, Args, DOMContent>): ITetheredInteractiveComponentSinks {
    function main(sources: ITargettingComponentSources<VNode, Args, DOMContent>) {
      sources.args$ = sources.args$ ? sources.args$ : xs.of({ active: false, attachment: PopupAttachment.BottomLeft });
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");

      const args$ = sources.args$.remember();
      const vTree$ = xs.combine(args$, sources.content$).map(
        ([args, content]) => render(args, content)
      );

      const mouseleave$proxy = xs.create();
      const mouseenter$proxy = xs.create();
      const active$ = args$.map(arg => arg.active ? Direction.In : Direction.Out).drop(1);
      const timer$ = active$.map(dir => dir === Direction.Out ? xs.of(Direction.Out)
        : xs.of(Direction.Out).compose(delay(1000)).endWhen(mouseenter$proxy)
      ).flatten();
      const transition$ = xs.merge(active$, mouseleave$proxy, timer$)
        .map(dir => ({
          animation: Animation.Fade,
          direction: dir
        }))
        .compose(dropRepeats(
          (a, b) => (a as any).direction === (b as any).direction
            && (a as any).animation === (b as any).animation
        ))
        .startWith({ animation: Animation.None, direction: Direction.Out }) as Stream<any>;
      const animatedPopup = Transition.run({ DOM: sources.DOM, target$: vTree$, args$: transition$ });
      const mouseenter$ = animatedPopup.Events("mouseenter");
      const mouseleave$ = xs.merge(animatedPopup.Events("mouseleave"), mouseenter$)
        .map(evt => evt.type === "mouseenter" ? Direction.In : Direction.Out)
        .compose(debounce(200))
        .filter(dir => dir === Direction.Out);
      mouseleave$proxy.imitate(mouseleave$);
      mouseenter$proxy.imitate(mouseenter$);

      const popup$ = animatedPopup.DOM.remember();
      return {
        DOM: popup$,
        Events: animatedPopup.Events,
        tether: xs.combine(popup$, sources.target$, args$)
          .map(([element, target, args]) => ({ element, target, args }))
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  export function render(args: Args = { active: true, attachment: PopupAttachment.BottomLeft }, content: DOMContent = ""): VNode {
    return div({ props: { className: getClassname(args) } }, [
      args.header ? div({ props: { className: "header" } }, args.header) : "",
      content
    ]);
  }

  function getClassname(props: Args): string {
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
    className += PopupAttachment.ToClassname(props.attachment) + " popup";
    return className;
  }
  export enum PopupAttachment {
    TopLeft, TopMiddle, TopRight, LeftCenter, RightCenter,
    BottomLeft, BottomMiddle, BottomRight,
    Center
  }
  export namespace PopupAttachment {
    export function ToClassname(attachment: PopupAttachment) {
      switch (attachment) {
        case PopupAttachment.TopLeft: return " top left";
        case PopupAttachment.TopMiddle: return " top center";
        case PopupAttachment.TopRight: return " top right";
        case PopupAttachment.LeftCenter: return " left center";
        case PopupAttachment.RightCenter: return " right center";
        case PopupAttachment.BottomLeft: return " bottom left";
        case PopupAttachment.BottomMiddle: return " bottom center";
        case PopupAttachment.BottomRight: return " bottom right";
        case PopupAttachment.Center: return " center";
        default: return " bottom left";
      }
    }
    export function ToTether(attachment: PopupAttachment) {
      switch (attachment) {
        case PopupAttachment.TopLeft: return "top left";
        case PopupAttachment.TopMiddle: return "top center";
        case PopupAttachment.TopRight: return "top right";
        case PopupAttachment.LeftCenter: return "left middle";
        case PopupAttachment.RightCenter: return "right middle";
        case PopupAttachment.BottomLeft: return "bottom left";
        case PopupAttachment.BottomMiddle: return "bottom center";
        case PopupAttachment.BottomRight: return "bottom right";
        case PopupAttachment.Center: return "center";
        default: return "bottom left";
      }
    }
    export function ToOppositeTether(attachment: PopupAttachment) {
      switch (attachment) {
        case PopupAttachment.TopLeft: return "bottom right";
        case PopupAttachment.TopMiddle: return "bottom center";
        case PopupAttachment.TopRight: return "bottom left";
        case PopupAttachment.LeftCenter: return "right middle";
        case PopupAttachment.RightCenter: return "left middle";
        case PopupAttachment.BottomLeft: return "top right";
        case PopupAttachment.BottomMiddle: return "top center";
        case PopupAttachment.BottomRight: return "top left";
        case PopupAttachment.Center: return "center";
        default: return "bottom left";
      }
    }
  }
}
