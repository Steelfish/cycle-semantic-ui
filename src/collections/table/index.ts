import { VNode, table, tr, th, td, thead, tbody, tfoot } from "@cycle/dom";
import { DOMContent, isDOMContent, StyleAndContentArgs, ComponentSources, ComponentSinks } from "../../types";
import { Size, Color } from "../../enums";
import { renderPropsAndContent, runPropsAndContent } from "../../common";

export namespace Table {
  export interface Props {
    singleLine: boolean;
    fixed: boolean;
    selectable: boolean;
    striped: boolean;
    celled: boolean;
    basic: boolean;
    veryBasic: boolean;
    collapsing: boolean;
    padded: boolean;
    veryPadded: boolean;
    compact: boolean;
    veryCompact: boolean;
    size: Size | string;
    color: Color | string;
  }
  export interface Content {
    header: Array<DOMContent>;
    main: Array<Array<DOMContent>>;
    footer: Array<DOMContent> | DOMContent;
  }

  export type TableArgs = StyleAndContentArgs<Props, Array<Array<DOMContent>>, Content>;
  export type TableSources = ComponentSources<Props, Array<Array<DOMContent>>, Content>;

  export function render(arg1?: Partial<Props> | Array<Array<DOMContent>> | TableArgs, arg2?: Array<Array<DOMContent>>): VNode {
    return renderPropsAndContent(tableR, isArgs, isMain, arg1, arg2);
  }

  export function run(sources: TableSources, scope?: string): ComponentSinks {
    return runPropsAndContent(sources, tableR, ".table", scope);
  }


  function tableR(args: TableArgs): VNode {
    let props = args.props ? args.props : {};
    let content = args.content ? isContent(args.content) ? args.content : { main: args.content } : { main: [] };
    let header = content.header ? thead([tr(content.header.map(h => th(h)))]) : [];
    let footer;
    if (isDOMContent(content.footer)) {
      footer = tfoot(content.footer);
    }
    else {
      footer = content.footer ? tfoot([tr(content.footer.map(f => th(f)))]) : [];
    }

    return table({ props: { className: getClassname(props) } }, [].concat(
      header,
      tbody(content.main.map(r => tr(r.map(c => td(c))))),
      footer
    ));
  }

  function getClassname(props: Partial<Props>) {
    let className = "ui";
    if (props.singleLine) {
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
    if (props.veryBasic) {
      className += " very basic";
    }
    if (props.collapsing) {
      className += " collapsing";
    }
    if (props.padded) {
      className += " padded";
    }
    if (props.veryPadded) {
      className += " very padded";
    }
    if (props.compact) {
      className += " compact";
    }
    if (props.veryCompact) {
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

  function isArgs(obj): obj is TableArgs {
    return typeof (obj) !== "undefined" && (
      typeof (obj.props) !== "undefined" ||
      (typeof (obj.content) !== "undefined" && (isContent(obj.content) || isMain(obj.content)))
    );
  }

  function isContent(content): content is Partial<Content> {
    return content !== undefined && (
      (<Content>content).main !== undefined ||
      ((<Content>content).header !== undefined ||
        (<Content>content).footer !== undefined));
  }

  function isMain(obj): obj is Array<Array<DOMContent>> {
    return typeof (obj) !== "undefined" && obj instanceof Array;
  }
}
