import * as UI from "../ui";
import xs, { Stream } from "xstream";
import { div, p, pre, code, VNode, br, } from "@cycle/dom";
declare var hljs: any;

export namespace Example {
  export interface Arguments {
    VNode$: Stream<VNode>;
    code: string;
    header?: string;
    description?: UI.DOMContent; 
    highlighted?: boolean;
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
    let codelines = args.code.split(/\r?\n/);
    //Trim leading whitespace
    let baseWhitespace = codelines.length > 1 ? countLeadingWhitespace(codelines[1]) - 2 : 0;
    codelines = codelines.map((line, i) => i === 0 ? line : line.substring(baseWhitespace));
    let code$ = xs.of(
      UI.Segment.render({ attachment: UI.Attachment.Bottom }, [pre([
        code({
          props: { className: "javascript" }, hook: {
            insert: (vnode) => { hljs.highlightBlock(vnode.elm); }
          }
        }, codelines.map(line => [line, br()]).reduce((acc, n) => acc.concat(n), []))
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
          content = typeof (args.description) === "string" ? [p(args.description)].concat(content) : [].concat(args.description, content);
        }
        if (typeof (args.header) !== "undefined") {
          content = [UI.Header.render(args.header)].concat(content);
        }
        return div({ props: { className: args.highlighted ? "highlighted example" : "example" } }, content);
      });
    return {
      DOM: vTree$
    };
  }
  function countLeadingWhitespace(string: string) {
    for (let i = 0; i < string.length; i++) {
      if (string[i] !== " " && string[i] !== "\t") {
        return (i);
      }
    }
    return (string.length);
  }
}
