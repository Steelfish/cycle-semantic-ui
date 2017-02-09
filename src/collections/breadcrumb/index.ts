import { IInteractiveComponentSources, IInteractiveComponentSinks} from "interfaces";
import {div, a, span, i, VNode} from "@cycle/dom";
import xs from "xstream";
import isolate from "@cycle/isolate";

export namespace Breadcrumb {
  export interface Props {
    arrow?: boolean;
    chevron?: boolean;
  }
  export type Content = Array<BreadCrumbItem>;
  export interface BreadCrumbItem{
    active?: boolean;
    text?: string;
    href?: string;
  }
  /**
   * An interactive Breadcrumb component for displaying a history of links.
   * Accepts the following properties in props$:
   *  arrow?: boolean - Styles the breadcrumb to use arrow icons.
   *  checvron?: boolean - Styles the breadcrumb to use chevron icons.
   * Expects the following type of content: Array of {}
   *   active?: boolean - Highlights the section as the current state.
   *   text?: string - The text for the section.
   *   href?: string - The location for the section to point towards.
   */
  export function run(sources: IInteractiveComponentSources<Props, Content>) : IInteractiveComponentSinks {
    function main(sources: IInteractiveComponentSources<Props, Content>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of([]);
      const breadcrumb$ = xs.combine(sources.props$, sources.content$).map(
        ([props, content]) => render(props, content)
      );
      return {
        DOM: breadcrumb$,
        Events: type => sources.DOM.select(".breadcrumb").events(type),
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * A static Breadcrumb component for displaying a history of links.
   * Accepts the following properties
   *  arrow?: boolean - Styles the breadcrumb to use arrow icons.
   *  checvron?: boolean - Styles the breadcrumb to use chevron icons.
   * Expects the following type of content: Array of {}
   *   active?: boolean - Highlights the section as the current state.
   *   text?: string - The text for the section.
   *   href?: string - The location for the section to point towards.
   */
  export function render(pOrC: Props|Content = {}, c: Content = []): VNode {
    let props = isContent(pOrC) ? {} : pOrC;
    let content = isContent(pOrC) ? pOrC : c;
    let children = content.map(c => [
      section(c), divider(props)
    ]).reduce((a, n) => a.concat(n));
    children.splice(-1, 1);
    return div({ props: { className: "ui breadcrumb"}}, children);
  }
  function section(section: BreadCrumbItem) : VNode {
    return section.active
      ? div({ props: { className: "active section"}}, section.text)
      : a({ props: { className: "section", href: section.href}}, section.text);
  }
  function divider(props: Props) : VNode {
    return span({ props: { className: "divider"}}, dividerIcon(props));
  }
  function dividerIcon(props: Props) : VNode {
    if (props.arrow) {
      return i({ props: { className: "right arrow icon divider"}});
    }
    if (props.chevron) {
      return i({ props: { className: "right chevron icon divider"}});
    }
    return (" / ");
  }
  
  function isContent(propsOrContent: Props | Content): propsOrContent is Content {
    return propsOrContent !== undefined && (<Content>propsOrContent).push !== undefined;
  }
}
