import { DOMContent, VNode, IInteractiveComponentSources, IValueComponentSinks } from "../../interfaces";
import { Color, Size, Attachment, Float } from "../../enums";
import { numToText } from "../../utils";
import isolate from "@cycle/isolate";
import { div, a } from "@cycle/dom";
import xs from "xstream";

export namespace Menu {
  export interface Props {
    submenu?: boolean;
    secondary?: boolean;
    pointing?: boolean;
    tabular?: boolean;
    text?: boolean;
    vertical?: boolean;
    pagination?: boolean;
    fixed?: boolean;
    stackable?: boolean;
    inverted?: boolean;
    icon?: boolean;
    labelled?: boolean;
    compact?: boolean;
    evenlyDivided?: boolean;
    borderless?: boolean;
    color?: Color;
    attachment?: Attachment;
    size?: Size;
  }
  export type Content = Array<MenuItem>;
  export interface MenuItem {
    link?: boolean;
    down?: boolean;
    active?: boolean;
    disabled?: boolean;
    header?: boolean;
    fitted?: boolean;
    icon?: boolean;
    color?: Color;
    float?: Float;
    href?: string;
    body: DOMContent;
  }
  /**
   * A menu component for displaying an assortment of items.
   * Accepts the following properties:
   * 	secondary?: boolean - Styles the menu to de-emphasize its content.
   * 	pointing?: boolean - Styles the menu to be pointing to nearby content.
   * 	tabular?: boolean - Styles the menu to be suited for tabs.
   * 	text?: boolean - Styles the menu for text content.
   * 	vertical?: boolean - Styles the menu to display its content vertically.
   * 	pagination?: boolean - Formats the menu content to present links to pages of content.
   * 	fixed?: boolean - Styles the menu to appear fixed to its context.
   * 	stackable?: boolean - Ensures the menu content stacks on mobile resolutions.
   * 	inverted?: boolean - Styles the menu to have its colors inverted.
   * 	icon?: boolean - Styles the menu for icon content.
   * 	labelled?: boolean - Styles the menu for labelled icon content.
   * 	compact?: boolean - Styles the menu so that it takes only the amount of space neccesary.
   * 	evenlyDivided?: boolean - Styles the menu so that its content is evenly divided.
   * 	borderless?: boolean - Styles the menu so that there are no borders between its content.
   * 	color?: Color - The color of the menu.
   * 	attachment?: Attachment - The attachment of the menu.
   * 	size?: Size - The size of the menu.
   * Expects the following type of content: Array of {}
   * 	link?: boolean - Styles the item to appear clickable.
   * 	down?: boolean - Styles the item to appear pressed.
   * 	active?: boolean - Styles the item to be more pronounced.
   * 	disabled?: boolean - Styles the item to appear disabled.
   * 	header?: boolean - Styles the item text to be more pronounced.
   * 	fitted?: boolean - Removes the padding of the item.
   *         icon?: boolean - Styles the item for icon content.
   * 	color?: Color - The color of the item.
   * 	float? Float - The alignment of the item.
   * 	href?: string - The link for the item.
   * 	body: DOMContent - The content of the item.
   */
  export function run(sources: IInteractiveComponentSources<Props, Content>): IValueComponentSinks<Content> {
    function main(sources: IInteractiveComponentSources<Props, Content>) {
      sources.content$ = sources.content$ ? sources.content$ : xs.of([]);
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});

      const click$ = sources.DOM.select(".ui.menu > .item").events("click");
      const items$ = sources.content$.remember();
      const clickedId$ = click$.map(ev => parseInt((ev as any).currentTarget.id))
        .filter(n => !isNaN(n) && typeof (n) !== "undefined");
      const clickedItem$ = items$.map(items => clickedId$.map(id => items[id])).flatten()
        .filter(item => !item.disabled);

      const vtree$ = xs.combine(sources.props$, items$).map(
        ([props, content]) => render(props, content)
      );
      return {
        DOM: vtree$,
        Events: (type) => sources.DOM.select(".menu").events(type),
        value$: clickedItem$
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * A menu component for displaying an assortment of items.
   * Accepts the following properties:
   * 	secondary?: boolean - Styles the menu to de-emphasize its content.
   * 	pointing?: boolean - Styles the menu to be pointing to nearby content.
   * 	tabular?: boolean - Styles the menu to be suited for tabs.
   * 	text?: boolean - Styles the menu for text content.
   * 	vertical?: boolean - Styles the menu to display its content vertically.
   * 	pagination?: boolean - Formats the menu content to present links to pages of content.
   * 	fixed?: boolean - Styles the menu to appear fixed to its context.
   * 	stackable?: boolean - Ensures the menu content stacks on mobile resolutions.
   * 	inverted?: boolean - Styles the menu to have its colors inverted.
   * 	icon?: boolean - Styles the menu for icon content.
   * 	labelled?: boolean - Styles the menu for labelled icon content.
   * 	compact?: boolean - Styles the menu so that it takes only the amount of space neccesary.
   * 	evenlyDivided?: boolean - Styles the menu so that its content is evenly divided.
   * 	borderless?: boolean - Styles the menu so that there are no borders between its content.
   * 	color?: Color - The color of the menu.
   * 	attachment?: Attachment - The attachment of the menu.
   * 	size?: Size - The size of the menu.
   * Expects the following type of content: Array of {}
   * 	link?: boolean - Styles the item to appear clickable.
   * 	down?: boolean - Styles the item to appear pressed.
   * 	active?: boolean - Styles the item to be more pronounced.
   * 	disabled?: boolean - Styles the item to appear disabled.
   * 	header?: boolean - Styles the item text to be more pronounced.
   * 	fitted?: boolean - Removes the padding of the item.
   *  icon?: boolean - Styles the item for icon content.
   * 	color?: Color - The color of the item.
   * 	float? Float - The alignment of the item.
   * 	href?: string - The link for the item.
   * 	body: DOMContent - The content of the item.
   */
  export function render(pOrC: Props | Content = {}, c: Content = []): VNode {
    let props = (pOrC instanceof Array) ? {} : pOrC;
    let content = (pOrC instanceof Array) ? pOrC : c;
    let items = content.map(item => item.href
      ? a({ props: { className: getItemClassname(item), id: content.indexOf(item), href: item.href } }, item.body)
      : div({ props: { className: getItemClassname(item), id: content.indexOf(item) } }, item.body)
    );
    return div({ props: { className: getClassname(props, content.length) } }, items);
  }
  function getClassname(props: Props, length: number) {
    let className;
    if (!props.submenu) {
      className = "ui";
    }
    if (props.secondary) {
      className += " secondary";
    }
    if (props.pointing) {
      className += " pointing";
    }
    if (props.tabular) {
      className += " tabular";
    }
    if (props.text) {
      className += " text";
    }
    if (props.vertical) {
      className += " vertical";
    }
    if (props.pagination) {
      className += " pagination";
    }
    if (props.fixed) {
      className += " fixed";
    }
    if (props.stackable) {
      className += " stackable";
    }
    if (props.inverted) {
      className += " inverted";
    }
    if (props.icon) {
      className += " icon";
    }
    if (props.labelled) {
      className += " labelled icon";
    }
    if (props.compact) {
      className += " compact";
    }
    if (props.borderless) {
      className += " borderless";
    }
    if (props.evenlyDivided) {
      className += numToText(length) + " item";
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    if (typeof (props.attachment) !== "undefined") {
      className += Attachment.ToClassname(props.attachment);
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    className += " menu";
    return className;
  }
  function getItemClassname(item: MenuItem) {
    let className = "";
    if (item.down) {
      className += " down";
    }
    if (item.active) {
      className += " active";
    }
    if (item.header) {
      className += " header";
    }
    if (item.fitted) {
      className += " vertically fitted";
    }
    if (item.link) {
      className += " link";
    }
    if (item.icon) {
      className += " icon";
    }
    if (item.disabled) {
      className += " disabled";
    }
    if (typeof (item.float) !== "undefined") {
      className += Float.ToClassname(item.float);
    }
    if (typeof (item.color) !== "undefined") {
      className += Color.ToClassname(item.color);
    }
    className += " item";
    return className;
  }
}
