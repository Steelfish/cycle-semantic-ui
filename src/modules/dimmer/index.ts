
import isolate from "@cycle/isolate";
import xs, { Stream, MemoryStream } from "xstream";
import { h, div, VNode } from "@cycle/dom";
import { Transition } from "../../modules/transition";
import { patchClassList, addElement, getScope } from "../../utils";
import { Animation, Direction } from "../../enums";
import { DOMContent, isDOMContent, ContentObj, ComponentSources, ComponentSinks, EventSelector } from "../../types";

export namespace Dimmer {
  export interface Props {
    inverted: boolean;
  }

  export interface DimmerSources extends ComponentSources<Props, DOMContent, ContentObj<DOMContent>> {
    args?: {
      on$?: Stream<boolean>;
      target$?: Stream<string | VNode>;
    };
  }

  export function run(sources: DimmerSources, scope: string = getScope()): ComponentSinks {
    function main(sources: DimmerSources) {
      const evt = (type) => sources.DOM.select(".dimmable").events(type);
      const props$ = sources.props$ ? sources.props$ : xs.of({});
      const content$ = sources.content$ ? sources.content$.map(c => isDOMContent(c) ? c : c.main) : xs.of([]);

      /*** Create animation$ ***/
      const on$ = sources.args && sources.args.on$ ? sources.args.on$.remember() : onHover(evt);
      const target$ = sources.args && sources.args.target$ ? sources.args.target$.remember() : xs.of("page");
      const transition$ = on$
        .fold((prevAnim, active) => prevAnim.direction === Direction.None
          ? ({ animation: Animation.None, direction: active ? Direction.In : Direction.Out })
          : {
            animation: Animation.Fade, direction: active ? Direction.In : Direction.Out
          }
        , ({ animation: Animation.None, direction: Direction.None }));

      /*** Animate content ***/
      const children$ = xs.combine(content$, props$, target$)
        .map(([content, props, target]) => dimmer(content, props, target));
      const animatedContent = Transition.run({ DOM: sources.DOM, transition$, target$: children$ }, scope);

      /*** Render view ***/
      const vTree$ = xs.combine(target$, animatedContent.DOM, on$)
        .map(([target, content, active]) => dimElement(target, content, active));
      return {
        DOM: vTree$,
        events: (type) => sources.DOM.select(".dimmer").events(type),
      };
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }

  function dimmer(content: DOMContent, props: Partial<Props>, target: String | VNode = "page"): VNode {
    return target === "page"
      ? div({ props: { className: "ui " + (props.inverted ? "inverted " : "") + "dimmer modals page dimmer" } }, content)
      : div({ props: { className: "ui " + (props.inverted ? "inverted " : "") + "targetted dimmer" } }, [
        div({ props: { className: "content" } }, [
          div({ props: { className: "center" } },
            content
          )
        ])
      ]);
  }

  function dimElement(targetOrString: VNode | string, content: VNode, active: boolean) {
    const isPage = typeof (targetOrString) === "string";
    let target = isPage ? content : targetOrString as VNode;
    let className = isPage ? "" : "dimmable", c;
    if (active) {
      className += isPage ? "active" : " dimmed";
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
  function onHover(events: EventSelector): MemoryStream<boolean> {
    return xs.merge(events("mouseenter"), events("mouseleave"))
      .map(evt => (evt as MouseEvent).type === "mouseenter").startWith(false);
  }
}
