import { DOMContent, VNode, IInteractiveComponentSources, IInteractiveComponentSinks, isDOMContent } from "interfaces";
import { Size, Color } from "enums";
import xs from "xstream";
import isolate from "@cycle/isolate";
import { table, tr, th, td, thead, tbody, tfoot } from "@cycle/dom";

export namespace Table {
  export interface Props {
    singleline?: boolean;
    fixed?: boolean;
    selectable?: boolean;
    striped?: boolean;
    celled?: boolean;
    basic?: boolean;
    verybasic?: boolean;
    collapsing?: boolean;
    padded?: boolean;
    verypadded?: boolean;
    compact?: boolean;
    verycompact?: boolean;
    size?: Size;
    color?: Color;
  }
  export interface Content {
    header?: Array<DOMContent>;
    body: Array<Array<DOMContent>>;
    footer?: Array<DOMContent> | DOMContent;
  }


  /**
   * A table component to show content in a table.
   * Accepts the following properties in props$:
   *   singleline?: boolean - Formats the content of the table to fit on a single line.
   *   fixed?: boolean - Stops resizing of table cells based on content.
   *   selectable?: boolean - Styles the rows of the table to be selectable.
   *   striped?: boolean - Styles the rows of the table to alternate colors.
   *   celled?: boolean - Divides each row into seperate cells.
   *   basic?: boolean - Reduces the complexity of the table.
   *   verybasic?: boolean - Reduces the complexity of the table by a lot.
   *   collapsing?: boolean - Makes the table only take up as much space as needed.
   *   padded?: boolean - Adds extra padding to the table content.
   *   verypadded?: boolean - Adds a lot of extra padding to the table content.
   *   compact?: boolean - Styles the table content to be more compact, to allow for more rows.
   *   verycompact?: boolean - Styles the table content to be greatly compacted.
   *   size?: Size - The size of the table content.
   *   color?: Color - The colour of the table.
   * Expects the following type of content in content$: {} of
   * 	headers: [DOMContent]
   * 	body: [[DomContent]]
   */
  export function run(sources: IInteractiveComponentSources<Props, Content>): IInteractiveComponentSinks {
    function main(sources: IInteractiveComponentSources<Props, Content>) {
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of({ body: [] });

      const vTree$ = xs.combine(sources.props$, sources.content$).map(
        ([props, content]) => render(props, content)
      );
      return {
        DOM: vTree$,
        Events: (type) => sources.DOM.select(".table").events(type)
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * A table component to show content in a table.
   * Accepts the following properties in props$:
   *   singleline?: boolean - Formats the content of the table to fit on a single line.
   *   fixed?: boolean - Stops resizing of table cells based on content.
   *   selectable?: boolean - Styles the rows of the table to be selectable.
   *   striped?: boolean - Styles the rows of the table to alternate colors.
   *   celled?: boolean - Divides each row into seperate cells.
   *   basic?: boolean - Reduces the complexity of the table.
   *   verybasic?: boolean - Reduces the complexity of the table by a lot.
   *   collapsing?: boolean - Makes the table only take up as much space as needed.
   *   padded?: boolean - Adds extra padding to the table content.
   *   verypadded?: boolean - Adds a lot of extra padding to the table content.
   *   compact?: boolean - Styles the table content to be more compact, to allow for more rows.
   *   verycompact?: boolean - Styles the table content to be greatly compacted.
   *   size?: Size - The size of the table content.
   *   color?: Color - The colour of the table.
   * Expects the following type of content in content$: {} of
   * 	headers: [DOMContent]
   * 	body: [[DomContent]]
   */
  export function render(pOrC: Props | Content = {}, c: Content = { body: [] }): VNode {
    let props = isContent(pOrC) ? {} : pOrC;
    let content = isContent(pOrC) ? pOrC : c;

    let header = content.header ? thead([tr(content.header.map(h => th(h)))]) : "";
    let footer;
    if (isDOMContent(content.footer)) {
      footer = tfoot(content.footer);
    }
    else {
      footer = content.footer ? tfoot([tr(content.footer.map(f => th(f)))]) : "";
    }

    return table({ props: { className: getClassname(props) } }, [
      header,
      tbody(content.body.map(r => tr(r.map(c => td(c))))),
      footer
    ]);
  }

  function getClassname(props: Props) {
    let className = "ui";
    if (props.singleline) {
      className += " single line";
    }
    if (props.fixed) {
      className += " fixed";
    }
    if (props.selectable) {
      className += " selectable";
    }
    if (props.striped) {
      className += " striped";
    }
    if (props.celled) {
      className += " celled";
    }
    if (props.basic) {
      className += " basic";
    }
    if (props.verybasic) {
      className += " very basic";
    }
    if (props.collapsing) {
      className += " collapsing";
    }
    if (props.padded) {
      className += " padded";
    }
    if (props.verypadded) {
      className += " very padded";
    }
    if (props.compact) {
      className += " compact";
    }
    if (props.verycompact) {
      className += " very compact";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    className += " table";
    return className;
  }

  function isContent(content): content is Content {
    return content !== undefined && (
      (<Content>content).body !== undefined &&
      ((<Content>content).header !== undefined ||
        (<Content>content).footer !== undefined));
  }
}
