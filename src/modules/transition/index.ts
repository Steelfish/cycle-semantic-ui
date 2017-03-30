import xs, { Stream } from "xstream";
import isolate from "@cycle/isolate";
import { VNode, h, DOMSource } from "@cycle/dom";
import { ComponentSinks } from "../../types";
import { Animation, AnimationDirection, Direction } from "../../enums";
import { patchClassList, getScope } from "../../utils";

export namespace Transition {
  export interface Transition {
    animation: Animation | string;
    direction?: Direction | string;
    animationDirection?: AnimationDirection | string;
  }

  export interface TransitionSources {
    DOM: DOMSource;
    target$: Stream<VNode>;
    transition$: Stream<Transition>;
  }

  export function run(sources: TransitionSources, scope: string = getScope()): ComponentSinks {
    function main(sources: TransitionSources) : ComponentSinks {
      const evt = (type) => sources.DOM.select(".transition").events(type);

      let animationEnd$ = evt("animationend").map(evt => ({
        animation: Animation.None,
        direction: (evt.currentTarget as HTMLElement).classList.contains("out") ? Direction.Out : Direction.In
      })) as Stream<Transition>;
      let animation$ = xs.merge(sources.transition$, animationEnd$);

      let vTree$ = xs.combine(animation$, sources.target$).map(
        ([transition, target]) => render(target, transition)
      );
      return {
        DOM: vTree$,
        events: evt
      };
    }
    if (scope === null) {
      return main(sources);
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }

  export function render(target: VNode, args: Transition = { animation: Animation.None }): VNode {
    let c;
    let data = patchClassList(target, ["hidden", "visible", "animating", "transition"], getClassName(args));
    if (target.children) {
      c = target.children;
    }
    if (target.text) {
      c = target.text;
    }
    return h(target.sel, data, c);
  }
  function getClassName(transition: Transition): string {
    if (transition.animation === Animation.None) {
      return transition.direction === Direction.Out ? "transition hidden" : "transition visible";
    }
    let animation = Animation.ToClassname(transition.animation);
    if (Animation.isStatic(transition.animation)) {
      return "visible animating transition " + animation;
    }
    let direction = Direction.ToClassname(transition.direction);
    if (Animation.isDirectional(transition.animation)) {
      animation += AnimationDirection.ToClassname(transition.animationDirection);
    }
    return "visible transition animating " + direction + animation;
  }
}
