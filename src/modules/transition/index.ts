import { VNode, ITargettingComponentSources, IInteractiveComponentSinks } from "interfaces";
import { Animation, AnimationDirection, Direction } from "enums";
import xs, { Stream } from "xstream";
import { h } from "@cycle/dom";
import isolate from "@cycle/isolate";

export namespace Transition {
  export interface Transition {
    animation: Animation;
    direction?: Direction;
    animationDirection?: AnimationDirection;
  }

  /**
   * A transition wrapper for animating dom content.
   * Accepts the following targets: VNode
   * Expects the following arguments: {} of
   *   animation: Animation - The animation to use.
   *   direction?: Direction - Wether to animate to visible or invisible.
   *   animationDirection?: AnimationDirection - The direction for the animation.
   * Disregards any content.
   */
  export function run(sources: ITargettingComponentSources<VNode, Transition, any>): IInteractiveComponentSinks {
    function main(sources: ITargettingComponentSources<VNode, Transition, any>) {
      const evt = (type) => sources.DOM.select(".transition").events(type);
      sources.args$ = sources.args$ ? sources.args$ : xs.of({ animation: Animation.None, direction: Direction.Out });

      let animationEnd$ = evt("animationend").map(evt => ({
        animation: Animation.None,
        direction: (evt.currentTarget as HTMLElement).classList.contains("out") ? Direction.Out : Direction.In
      })) as Stream<Transition>;
      let animation$ = xs.merge(sources.args$, animationEnd$);

      let vTree$ = xs.combine(animation$, sources.target$).map(
        ([transition, target]) => render(target, transition)
      );
      return {
        DOM: vTree$,
        Events: (type) => sources.DOM.select(".transition").events(type)
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * A transition wrapper for animating dom content.
   * Accepts the following targets: VNode
   * Expects the following arguments: {} of
   *   animation: Animation - The animation to use.
   *   direction?: Direction - Wether to animate to visible or invisible.
   *   animationDirection?: AnimationDirection - The direction for the animation.
   * Disregards any content.
   */
  export function render(target: VNode, args: Transition = { animation: Animation.None }): VNode {
    let className = "", c;
    if (target.data) {
      let classList = target.data.props.className.split(" ") as Array<string>;
      classList.forEach(item => {
        if (["hidden", "visible", "animating", "transition"].indexOf(item) === -1) {
          className += item + " ";
        }
      });
    }
    className += getClassName(args);
    const data = Object.assign({}, target.data, {
      "props": {
        className
      }
    });
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
