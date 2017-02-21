import { DOMContent, VNode, IInteractiveComponentSources, IValueComponentSinks } from "../../interfaces";
import { IconType, Color, Size, Animation, Direction } from "../../enums";
import xs, { Stream } from "xstream";
import dropRepeats from "xstream/extra/dropRepeats";
import debounce from "xstream/extra/debounce";
import concat from "xstream/extra/concat";
import isolate from "@cycle/isolate";
import delay from "xstream/extra/delay";
import { div, input } from "@cycle/dom";

import { Menu } from "../../collections/menu";
import { Icon } from "../../elements/icon";
import { Transition } from "../../modules/transition";

export namespace Dropdown {
  export interface Props {
    static?: DOMContent;
    rightAligned?: boolean;
    active?: boolean;
    initial?: any;
    default?: string;
    selection?: boolean;
    inline?: boolean;
    floating?: boolean;
    loading?: boolean;
    disabled?: boolean;
    scrolling?: boolean;
    compact?: boolean;
    search?: boolean;
    pointing?: boolean;
    size?: Size;
    color?: Color;
  }
  export type Content<V> = Array<DropdownItem<V>>;
  export interface DropdownItem<V> {
    main?: DOMContent;
    value?: V;
    header?: boolean;
    fitted?: boolean;
    disabled?: boolean;
    active?: boolean;
  }

  /**
   * A dropdown component for capturing user input.
   * Accepts the following properties in props$:
   *  active?: boolean,
   *  initial?: any
   *  default?: string
   *  selection?: boolean
   *  inline?: boolean
   *  floating?: boolean
   *  loading?: boolean
   *  disabled?: boolean
   *  scrolling?: boolean
   *  search?: boolean
   *  compact?: boolean
   *  size?: Size
   *  color?: Color
   * Expects the following type of content in content$: Array of {
   *  body: DOMContent,
   *  value: any,
   *  header?: boolean,
   *  fitted?: boolean,
   *  disabled?: boolean,
   *  active?: boolean
   * }
   */
  export function run<V>(sources: IInteractiveComponentSources<Props, Content<V>>): IValueComponentSinks<V> {
    function main(sources: IInteractiveComponentSources<Props, Content<V>>) {
      const evt = (type) => sources.DOM.select(".dropdown").events(type);
      sources.props$ = sources.props$ ? sources.props$ : xs.of({});
      sources.content$ = sources.content$ ? sources.content$ : xs.of([]);

      const props$ = sources.props$.remember();
      const itemClick$proxy = xs.create() as Stream<Event>;
      const itemClick$ = itemClick$proxy.remember();
      const value$proxy = xs.create();

      const dropdownClick$ = evt("click")
        .filter(evt => !(evt.srcElement as HTMLElement).classList.contains("item"))
        .mapTo(Direction.In);
      const mouseleave$ = xs.merge(evt("mouseleave").filter(
        evt => evt.srcElement.className.indexOf("icon") === -1
      ), evt("mouseenter"))
        .map(evt => (evt as MouseEvent).type === "mouseenter" ? Direction.In : Direction.Out)
        .compose(debounce(250))
        .filter(dir => dir === Direction.Out);
      const transition$ = xs.merge(dropdownClick$, itemClick$.mapTo(Direction.Out), mouseleave$)
        .startWith(Direction.Out)
        .map(dir => ({
          animation: Animation.Fade,
          direction: dir
        }))
        .compose(dropRepeats(
          (a, b) => (a as any).direction === (b as any).direction
            && (a as any).animation === (b as any).animation
        ))
        .drop(1)
        .startWith({ animation: Animation.None, direction: Direction.Out });

      const filter$ = sources.DOM.select("input").events("keyup")
        .map(ev => (ev.target as HTMLInputElement).value)
        .startWith("") as Stream<string>;
      const filteredContent$ = xs.combine(sources.content$, filter$).map(
        ([content, filter]) => content.filter(c => filterContent(c, filter))
      ).remember();

      const content$ = xs.combine(filteredContent$, value$proxy).map(
        ([content, value]) => content.map(
          item => item.value === value ? Object.assign({}, item, { active: true }) : item
        )
      ).remember();
      const menu = Menu.run({ DOM: sources.DOM, content$ });

      const transitionedMenu = Transition.run({ DOM: sources.DOM, target$: menu.DOM, args$: transition$ as any });
  
      itemClick$proxy.imitate(evt("click").filter(x => x.target.classList.contains("item")));

      const clickedId$ = itemClick$
        .map(ev => parseInt((ev.target as HTMLElement).id))
        .filter(n => !isNaN(n) && typeof (n) !== "undefined");
      const emittedValue$ = clickedId$.map(id => filteredContent$.map(items => items[id].value).take(1)).flatten().remember() as any;
      const initialValue$ = props$.map(props => props.initial).remember();
      value$proxy.imitate(xs.merge(initialValue$ as any, emittedValue$));

      const icon = Icon.render({}, IconType.Dropdown);
      const active$ = xs.merge(
        transition$.filter(x => x.direction === Direction.In).mapTo(true),
        transition$.filter(x => x.direction === Direction.Out).compose(delay(250)).mapTo(false)
      );
      const streams = xs.combine(
        props$,
        active$,
        transitionedMenu.DOM,
        content$.map(content => content.filter(item => item.active)[0])
      );
      const vtree$ = streams.map(
        ([props, active, menu, item]) =>
          div({ props: { className: getClassName(props, active) } }, [
            getText(item, props),
            props.search ? input({ props: { className: "search" } }) : "",
            icon, menu
          ])
      ).remember();

      //Todo find cleaner way to clear input using snabbdom hooks?
      emittedValue$.map(_ => vtree$.take(1)).flatten().addListener(new ExecuteListener(function (vnode: VNode) {
        function clear() {
          if (typeof (vnode.elm) !== "undefined") {
            let elm = (vnode.elm as Element).getElementsByTagName("input");
            if (elm[0] && elm[0].value !== "") {
              {
                console.log("Sending next");
              }
              elm[0].value = "";
              filter$.shamefullySendNext("");
            }
          } else {
            setTimeout(clear, 100);
          }
        }
        clear();
      }));

      return {
        DOM: vtree$,
        Events: evt,
        value$: concat(initialValue$, emittedValue$)
      };
    }
    const isolatedMain = isolate(main);
    return isolatedMain(sources);
  }

  /**
   * A dropdown component for capturing user input.
   * Accepts the following properties:
   *  active?: boolean,
   *  initial?: any
   *  default?: string
   *  selection?: boolean
   *  inline?: boolean
   *  floating?: boolean
   *  loading?: boolean
   *  disabled?: boolean
   *  scrolling?: boolean
   *  search?: boolean
   *  compact?: boolean
   *  size?: Size
   *  color?: Color
   * Expects the following type of content: Array of {
   *  body: DOMContent,
   *  value: any,
   *  header?: boolean,
   *  fitted?: boolean,
   *  disabled?: boolean,
   *  active?: boolean
   * }
   */
  export function render(pOrC: Props | Content<any> = {}, c: Content<any> = []): VNode {
    let props = (pOrC instanceof Array) ? {} : pOrC;
    let content = (pOrC instanceof Array) ? pOrC : c;
    const icon = Icon.render({}, IconType.Dropdown);
    const menu = Menu.render({}, content);
    const item = content.filter(item => item.active)[0];
    return div({ props: { className: getClassName(props) } }, [
      getText(item, props),
      props.search ? input({ props: { className: "search" } }) : "",
      icon, menu
    ]);
  }

  function getClassName(props: Props, active?) {
    let className = "ui";
    if (props.rightAligned) {
      className += " right";

    }
    if (props.selection) {
      className += " selection";
    }

    if (props.inline) {
      className += " inline";
    }
    if (props.floating) {
      className += " floating";
    }
    if (props.loading) {
      className += " loading";
    }
    if (props.disabled) {
      className += " disabled";
    }
    if (props.scrolling) {
      className += " scrolling";
    }
    if (props.search) {
      className += " search";
    }
    if (props.compact) {
      className += " compact";
    }
    if (props.pointing) {
      className += " pointing";
    }
    if (active || props.active) {
      className += " active";
    }
    if (typeof (props.size) !== "undefined") {
      className += Size.ToClassname(props.size);
    }
    if (typeof (props.color) !== "undefined") {
      className += Color.ToClassname(props.color);
    }
    return className + " dropdown";
  }
  function getText<V>(item: DropdownItem<V>, props: Props): VNode {
    if (typeof (props.static) !== "undefined") {
      return div({ props: { className: "text" } }, props.static);
    }
    if (item === null || typeof(item) === "undefined") {
      return div({ props: { className: "default text" } }, props.default);
    }
    return div({ props: { className: "text" } }, item.main);
  }
  function filterContent<V>(item: DropdownItem<V>, filter: string): boolean {
    function f(node: VNode) {
      if (node.text) {
        return node.text.indexOf(filter) !== -1 || !filter;
      }
      else {
        for (let c in node.children) {
          if (f(c)) {
            return true;
          }
        }
        return false;
      }
    }
    if (typeof(item.main) === "undefined") {
      return true;
    }
    if (typeof (item.main) === "string") {
      return (item.main as string).indexOf(filter) !== -1 || !filter;
    }
    if (!(item.main as any).push) {
      return f(item.main as VNode);
    }
    for (let c in (item.main as VNode).children) {
      if (f(c)) {
        return true;
      }
    }
    return false;
  }
  class ExecuteListener {
    f: Function;
    constructor(f: Function) {
      this.f = f;
    }
    next(i) { this.f(i); }
    error(i) { }
    complete() { }
  }
}
