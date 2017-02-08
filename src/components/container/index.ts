import {DOMContent, VNode, IInteractiveComponentSources, IInteractiveComponentSinks, isDOMContent} from "../../interfaces";
import xs from "xstream";
import isolate from "@cycle/isolate";
import {div} from "@cycle/dom";

export namespace Container {
  /**
  * A responsive container component to host other content.
  * Does not accept any properties in props$.
  * Expects the following type of content in content$: DOMContent
  */
  export function run(sources: IInteractiveComponentSources<any, DOMContent>) : IInteractiveComponentSinks {
    function main(sources: IInteractiveComponentSources<any, DOMContent>) {
      sources.content$ = sources.content$ ? sources.content$ : xs.of("");

      const vTree$ = sources.content$.map(content => render(content));
      return {
        DOM: vTree$,
        Events: (type) => sources.DOM.select(".container").events(type)
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
  * A responsive container component to host other content.
  * Does not accept any properties.
  * Expects the following type of content: DOMContent
  */
  export function render(pOrC: Object|DOMContent = {}, c: DOMContent = "") : VNode {
    // let props = isDOMContent(pOrC) ? {} : pOrC;
    let content = isDOMContent(pOrC) ? pOrC: c;
    return div({ props: { className: "ui container"}}, content);
  }
}
