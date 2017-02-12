import * as UI from "../ui";
import xs, { Stream } from "xstream";
import { div, p, pre, code, VNode, br, } from "@cycle/dom";
declare var hljs: any;

export namespace Example {
  export interface Arguments {
    VNode$: Stream<VNode>;
    code: string;
    header?: string;
    description?: string;
  }
  export function run(sources, args: Arguments) {
    //Show code icon
    let btnShow = UI.Icon.run({
      DOM: sources.DOM,
      content$: xs.of(UI.IconType.Code)
    });
    let animation$ = btnShow.Events("click").fold((prev, n) => !prev, false).drop(1).map(
      n => ({
        animation: UI.Animation.Slide,
        direction: n ? UI.Direction.In : UI.Direction.Out
      })
    ).startWith({
      animation: UI.Animation.None,
      direction: UI.Direction.Out
    });

    //Sliding code view
    let code$ = xs.of(
      UI.Segment.render({ attachment: UI.Attachment.Bottom }, [pre([
        code({
          props: { className: "javascript" }, hook: {
            insert: (vnode) => { hljs.highlightBlock(vnode.elm); }
          }
        }, args.code.split(/\r?\n/).map(line => [line, br()]).reduce((acc, n) => acc.concat(n), []))
      ])
      ])
    );
    let animatedCode$ = UI.Transition.run({
      DOM: sources.DOM,
      target$: code$,
      args$: animation$
    });

    //Example bar
    let top$ = xs.combine(animation$, args.VNode$).map(([animation, obj]) => {
      let isActive = animation.direction === UI.Direction.In;
      let elem = div({ props: { className: isActive ? "ui top attached segment code" : "code" } }, [
        isActive ? UI.Label.render({ attachment: UI.Attachment.Top }, [
          "Example"
        ]) : div({ style: { display: "none" }, props: { className: "" } }),
        obj
      ]);
      return elem;
    });
    let vTree$ = xs.combine(btnShow.DOM, animatedCode$.DOM, top$).map(
      ([btnShow, code, top]) => {
        let content = [btnShow, top, code];
        if (typeof (args.description) !== "undefined") {
          content = [p(args.description)].concat(content);
        }
        if (typeof (args.header) !== "undefined") {
          content = [UI.Header.render(args.header)].concat(content);
        }
        return div({ props: { className: "example" } }, content);
      });
    return {
      DOM: vTree$
    };
  }
}
