import {DOMContent, ITargettingComponentSources, IInteractiveComponentSinks, VNode, EventSelector} from "interfaces";
import isolate from "@cycle/isolate";
import xs from "xstream";
import {Animation, Direction} from "enums";
import {h, div} from "@cycle/dom";
import {Transition} from "modules/transition";
import {patchClassList, addElement} from "utils";
;

export namespace Dimmer {
  /**
   * A dimmer wrapper to show extra hidden content on an element.
   * Accepts the following type of target:
   *   VNode - The element to attach the dimmer to.
   *   "Page" - Creates a dimmer for the entire page.
   * Expects the following type of args: Boolean
   * Expects the following type of content: DOMContent
   * @param  {ComponentSources} sources The Component's sources.
   * @return {ComponentSinks} The Dimmer Component.
   */
  export function run(sources: ITargettingComponentSources<String|VNode, boolean, DOMContent>, invert$ = xs.of(false))
    : IInteractiveComponentSinks {
    function main(sources: ITargettingComponentSources<String|VNode, boolean, DOMContent>) {
      const evt = (type) => sources.DOM.select(".dimmable").events(type);
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");
      sources.args$ = sources.args$ ? sources.args$ : onHover(evt);

      const target$ = sources.target$.remember();
      const active$ = sources.args$.remember();
      const transition$ = active$
        .fold((prevAnim, active) => prevAnim.direction === Direction.None
          ? ({ animation: Animation.None, direction: active ? Direction.In : Direction.Out})
          : { animation: Animation.Fade, direction: active ? Direction.In : Direction.Out
          }
        , ({ animation: Animation.None, direction: Direction.None }));
      const content$ = xs.combine(sources.content$, target$, invert$)
        .map(([content, target, inverted]) => render(content, target, inverted));
      const animatedContent = Transition.run({DOM: sources.DOM, args$: transition$, target$: content$});

      const vTree$ = xs.combine(target$, animatedContent.DOM, active$)
        .map(([target, content, active]) => dimElement(target, content, active));
      return {
        DOM: vTree$,
        Events: animatedContent.Events,
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  export function render(content: DOMContent = "", target: String|VNode = "page", inverted = false) : VNode {
    return target === "page"
      ? div({ props: { className: "ui " + (inverted ? "inverted " : "") +  "dimmer modals page dimmer"}}, content)
      : div({ props: { className: "ui " + (inverted ? "inverted " : "") + "targetted dimmer"}}, [
          div({ props: { className: "content"}}, [
            div({ props: { className: "center"}}, 
              content
            )
          ])
      ]);
  }

  function onHover(events: EventSelector) {
    return xs.merge(events("mouseenter"), events("mouseleave"))
      .map(evt => (evt as MouseEvent).type === "mouseenter").startWith(false);
  }
  function dimElement(targetOrString: VNode | string, content: VNode, active: boolean) {
    const isPage = typeof(targetOrString) === "string";
    let target = isPage ? content : targetOrString as VNode;
    let className = isPage ? "" : "dimmable", c;
    if (active) {
      className += isPage ? "active": " dimmed";
    }
    const data = patchClassList(target, ["dimmable", "dimmed", "inverted", "active"], className);
    if (isPage) {
      if (target.children) {
        c = target.children;
      }
      else if (target.text) {
        c = target.text;
      }
    }
    else {
      c = addElement(content, target, "targetted");
    }
    return h(target.sel, data, c);
  }
}
