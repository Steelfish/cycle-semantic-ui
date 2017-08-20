import xs from "xstream";
import isolate from "@cycle/isolate";
import { VNode } from "@cycle/dom";
import { ComponentSources, ContentObj, ComponentSinks, StyleAndContentArgs } from "../types";

export type RenderFn<P, B, C extends ContentObj<B>> = (arg: StyleAndContentArgs<P, B, C>) => VNode;
export type IsBFn<B> = (obj) => obj is B;
export type IsArgsFn<P, B, C extends ContentObj<B>> = (obj) => obj is StyleAndContentArgs<P, B, C>;

export function addClassName(node: VNode, className: string): VNode {
  if (!node.data) {
    node.data = { props: { className } };
  }
  else if (node.data.props) {
    if (node.data.props.className === void 0) {
      node.data.props.className = className;
    } else if (className.indexOf("ui") !== -1) {
      node.data.props.className = node.data.props.className + className.substr(2);
    } else {
      node.data.props.className = node.data.props.className + " " + className;
    }
  } else if (node.data.attrs) {
    if (node.data.attrs.className === void 0) {
      node.data.props.className = className;
    } else if (className.indexOf("ui") !== -1) {
      node.data.attrs.className = node.data.attrs.className + className.substr(2);
    } else {
      node.data.attrs.className = node.data.attrs.className + " " + className;
    }
  } else {
    node.data.props = { className};
  }
  return node;
}

//Common render function for all basic Components
//Reformats the various syntaxes into StyleAndContentArgs 
export function renderPropsAndContent<P, B, C extends ContentObj<B>>(
  renderFn: RenderFn<P, B, C>, isArgs: IsArgsFn<P, B, C>, isB: IsBFn<B>,
  arg1?: Partial<P> | B | StyleAndContentArgs<P, B, C>, arg2?: B
) {
  if (isArgs(arg1)) {
    return renderFn(arg1);
  }
  let args = {} as StyleAndContentArgs<P, B, C>;
  if (isB(arg1)) {
    args.props = {} as Partial<P>;
    args.content = arg1;
  } else {
    args.props = arg1 || {} as Partial<P>;
    args.content = arg2;
  }
  return renderFn(args);
}

//Common run function for all basic Components
//Isolates the rendered component and exposes events
export function runPropsAndContent<P, B, C extends ContentObj<B>>(
  sources: ComponentSources<P, B, C>, render: RenderFn<P, B, C>,
  selector: string, scope?: string
): ComponentSinks {
  function main(sources: ComponentSources<P, B, C>) {
    sources.props$ = sources.props$ ? sources.props$ : xs.of({} as Partial<P>);
    sources.content$ = sources.content$ ? sources.content$ : xs.of(undefined as Partial<C>);
    const vTree$ = xs.combine(sources.props$, sources.content$)
      .map(([props, content]) => render({ props, content })
      );
    return {
      DOM: vTree$,
      events: (type) => sources.DOM.select(selector).events(type),
    };
  }
  if (scope === null) {
    return main(sources);
  }
  const isolatedMain = isolate(main, scope);
  return isolatedMain(sources);
}

export function makeIsArgs<P, B, C extends ContentObj<B>>(isB: IsBFn<B>): IsArgsFn<P, B, C> {
  return <(obj) => obj is StyleAndContentArgs<P, B, C>>((obj) => isArgs(obj, isB));
}
export function isArgs<P, B, C extends ContentObj<B>>(obj, isB: IsBFn<B>): obj is StyleAndContentArgs<P, B, C> {
  return obj && (
    typeof (obj.props) !== "undefined" ||
    (typeof (obj.content) !== "undefined" && (isB(obj.content) || isB(obj.content.main)))
  );
}
