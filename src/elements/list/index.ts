import { DOMContent, VNode, IInteractiveComponentSources, IInteractiveComponentSinks } from "interfaces";
import { Size, VerticalAlignment, Float } from "enums";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { a, div } from "@cycle/dom";

export namespace List {
  export interface Props {
    bulleted?: boolean;
    ordered?: boolean;
    horizontal?: boolean;
    inverted?: boolean;
    selection?: boolean;
    animated?: boolean;
    relaxed?: boolean;
    divided?: boolean;
    celled?: boolean;
    size?: Size;
    alignment?: VerticalAlignment;
    float?: Float;
  }
  export type Content = Array<ListItem>;
  export interface ListItem {
    left?: DOMContent;
    content?: DOMContent;
    icon?: DOMContent;
    right?: DOMContent;
    header?: DOMContent;
    description?: DOMContent;
    href?: string;
  }
  /**
   * Creates a List component for showing lists of content.
   * Accepts the following properties in props$:
   *   bulleted?: boolean - Displays list as a bulleted list.
   *   ordered?: boolean - Displays list as an ordered list.
   *   link?: boolean - Styling for lists with links.
   *   horizontal?: boolean - Displays list horizontally.
   *   inverted?: boolean - Styling for lists on dark backgrounds.
   *   selection?: boolean - Styling for lists meant to display a selection.
   *   animated?: boolean - Adds an animation to display currently selected item.
   *   relaxed?: boolean - Adds more negative space arround the list.
   *   divided?: boolean - Adds horizontal dividers between content of list.
   *   celled?: boolean - Wraps content of list in cells.
   *   size?: Size - The size of the list and its content.
   *   alignment?: VerticalAlignment - The vertical alignment of list's content.
   *   float?: Float - Wether the list should be left or right floating.
   * Expects the following type of content: Array of {}
   *   left?: DOMContent - Left floated content for the item.
   *   body?: DOMContent - Body content for the item.
   *   right?: DOMContent - Right floated content for the item.
   *   header?: DOMContent - Name of the list item
   *   description?: DOMContent - Description of the list item.
   *   href?: string - Link for link lists
   */
  export function run(sources: IInteractiveComponentSources<Props, Content>): IInteractiveComponentSinks {
    function main(sources: IInteractiveComponentSources<Props, Content>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of([]);

      const vTree$ = xs.combine(sources.props$, sources.content$).map(
        ([props, content]) => render(props, content)
      );
      return {
        DOM: vTree$,
        Events: (type) => sources.DOM.select(".list").events(type),
        value$: xs.never()
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * Creates a List component for showing lists of content.
   * Accepts the following properties in props$:
   *   bulleted?: boolean - Displays list as a bulleted list.
   *   ordered?: boolean - Displays list as an ordered list.
   *   link?: boolean - Styling for lists with links.
   *   horizontal?: boolean - Displays list horizontally.
   *   inverted?: boolean - Styling for lists on dark backgrounds.
   *   selection?: boolean - Styling for lists meant to display a selection.
   *   animated?: boolean - Adds an animation to display currently selected item.
   *   relaxed?: boolean - Adds more negative space arround the list.
   *   divided?: boolean - Adds horizontal dividers between content of list.
   *   celled?: boolean - Wraps content of list in cells.
   *   size?: Size - The size of the list and its content.
   *   alignment?: VerticalAlignment - The vertical alignment of list's content.
   *   float?: Float - Wether the list should be left or right floating.
   * Expects the following type of content: Array of {}
   *   left?: DOMContent - Left floated content for the item.
   *   body?: DOMContent - Body content for the item.
   *   right?: DOMContent - Right floated content for the item.
   *   header?: DOMContent - Name of the list item
   *   description?: DOMContent - Description of the list item.
   *   href?: string - Link for link lists
   */
  export function render(pOrC: Props | Content = {}, c: Content = []): VNode {
    let props = (pOrC instanceof Array) ? {} : pOrC;
    let content = (pOrC instanceof Array) ? pOrC : c;
    return div({ props: { className: getClassname(props) } },
      content.map(({header, icon, content, description, href, left, right}) => {
        let l = left ? div({ props: { className: "left floated content" } }, left) : undefined;
        let r = right ? div({ props: { className: "right floated content" } }, right) : undefined;
        let h = header ? div({ props: { className: "header" } }, header) : undefined;
        let d = description ? div({ props: { className: "description" } }, description) : undefined;
        let i = icon ? icon : "";
        let c = div({ props: { className: "content" } },
          [].concat(h, d, content)
        );
        let children = [].concat(l, i, c, r);
        return href
          ? a({ props: { className: "item" } }, { props: { href: href } }, children)
          : div({ props: { className: "item" } }, children);
      })
    );
  }

  function getClassname(props: Props): string {
    let className = "ui";
    if (props.bulleted) {
      className += " bulleted";
    }
    if (props.ordered) {
      className += " ordered";
    }
    if (props.horizontal) {
      className += " horizontal";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (props.selection) {
      className += " selection";
    }
    if (props.animated) {
      className += " animated";
    }
    if (props.relaxed) {
      className += " relaxed";
    }
    if (props.divided) {
      className += " divided";
    }
    if (props.celled) {
      className += " celled";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.alignment) !== "undefined") {
      className += VerticalAlignment.ToClassname(props.alignment);
    }
    if (typeof (props.float) !== "undefined") {
      className += Float.ToClassname(props.float);
    }
    className += " list";
    return className;
  }
}
