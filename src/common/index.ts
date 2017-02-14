
import xs from "xstream";
import isolate from "@cycle/isolate";
import { VNode } from "@cycle/dom";
import { ComponentSources, ContentObj, ComponentSinks, StyleAndContentArgs } from "../types";

export type RenderFn<S, B, C extends ContentObj<B>> = (arg: StyleAndContentArgs<S, B, C>) => VNode;
export type IsBFn<B> = (obj) => obj is B;
export type IsArgsFn<S,B,C extends ContentObj<B>> = (obj) => obj is StyleAndContentArgs<S, B, C>;

//Common render function for all basic Components
//Reformats the various syntaxes into StyleAndContentArgs 
export function renderStyleAndContent<S, B, C extends ContentObj<B>>(
  renderFn: RenderFn<S, B, C>, isArgs: IsArgsFn<S,B,C>, isB: IsBFn<B>, 
  arg1?: Partial<S> | B | StyleAndContentArgs<S, B, C>, arg2?: B
) {
  if (isArgs(arg1)) {
    return renderFn(arg1);
  }
  let args = {} as StyleAndContentArgs<S, B, C>;
  if (isB(arg1)) {
    args.style = {} as Partial<S>;
    args.content = arg1;
  } else {
    args.style = arg1 || {} as Partial<S>;
    args.content = arg2;
  }
  return renderFn(args);
}

//Common run function for all basic Components
//Isolates the rendered component and exposes events
export function runStyleAndContent<S, B, C extends ContentObj<B>>(
  sources: ComponentSources<S, B, C>, render: RenderFn<S, B, C>,
  selector: string, scope?: string
): ComponentSinks {
  function main(sources: ComponentSources<S, B, C>) {
    sources.style$ = sources.style$ ? sources.style$ : xs.of({} as Partial<S>);
    sources.content$ = sources.content$ ? sources.content$ : xs.of({} as Partial<C>);
    const vTree$ = xs.combine(sources.style$, sources.content$)
      .map(([style, content]) => render({style,content})
      );
    return {
      DOM: vTree$,
      events: (type) => sources.DOM.select(selector).events(type),
    };
  }
  const isolatedMain = isolate(main, scope);
  return isolatedMain(sources);
}

export function makeIsArgs<S,B,C extends ContentObj<B>>(isB: IsBFn<B>) : IsArgsFn<S,B,C> {
  return <(obj) => obj is StyleAndContentArgs<S,B,C>>((obj) => isArgs(obj, isB));
}
export function isArgs<S, B, C>(obj, isB: IsBFn<B>): obj is StyleAndContentArgs<S, B, C> {
  return obj && (
    typeof (obj.style) !== "undefined" ||
    (typeof (obj.content) !== "undefined" && (isB(obj.content) || isB(obj.content.main)))
  );
}
