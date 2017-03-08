import xs, { Stream } from "xstream";
import dropRepeats from "xstream/extra/dropRepeats";
import debounce from "xstream/extra/debounce";
import isolate from "@cycle/isolate";
import delay from "xstream/extra/delay";
import { VNode, div, input } from "@cycle/dom";

import { Menu } from "../../collections/menu";
import { Icon } from "../../elements/icon";
import { Transition } from "../../modules/transition";
import { DOMContent, isVNode, EventSelector, ContentObj, ComponentSources, ValueComponentSinks } from "../../types";
import { IconType, Color, ColorString, Size, SizeString, Animation, Direction } from "../../enums";

export namespace Dropdown {
  export interface Props {
    rightAligned: boolean;
    active: boolean;
    initial: any;
    selection: boolean;
    simple: boolean;
    inline: boolean;
    floating: boolean;
    loading: boolean;
    disabled: boolean;
    scrolling: boolean;
    compact: boolean;
    pointing: boolean;
    default: DOMContent;
    size: Size | SizeString;
    color: Color | ColorString;
  }
  export type Content<V> = Array<Partial<DropdownItem<V>>>;
  export interface DropdownItem<V> extends Menu.MenuItem {
    value: V;
  }
  export interface DropdownSources<V> extends ComponentSources<Props, Content<V>, ContentObj<Content<V>>> {
    args?: {
      search?: boolean;
      static?: boolean;
    };
  }

  export function run<V>(sources: DropdownSources<V>, scope?: string): ValueComponentSinks<V> {
    function main(sources: DropdownSources<V>) {
      /*** Main streams ***/
      const evt = (type) => sources.DOM.select(".dropdown").events(type);
      const content$ = sources.content$ ? sources.content$.map(c => c instanceof Array ? c : c.main) : xs.of([]) as Stream<Content<V>>;
      const props$ = sources.props$ ? sources.props$.remember() : xs.of({}) as Stream<Partial<Props>>;
      const itemClick$proxy = xs.create() as Stream<Event>;
      const itemClick$ = itemClick$proxy.remember();
      const value$proxy = xs.create() as Stream<V>;

      let filter$: Stream<string>;
      if (sources.args && sources.args.search) {
        const input$ = sources.DOM.select("input").events("keyup")
          .map(ev => (ev.target as HTMLInputElement).value);
        filter$ = xs.merge(input$, value$proxy.map(v => "")) as Stream<string>;
      }
      /*** Compose component ***/
      let transition$ = createTransition$(evt, itemClick$);
      let menu = createMenuComponent<V>(sources, content$, value$proxy, transition$, filter$);
      const initialValue$ = props$.map(props => props.initial).remember();
      value$proxy.imitate(xs.merge(initialValue$, menu.value$.map(i => i.value)));
      let vTree$ = createView(sources, props$, content$, transition$, menu, filter$);

      return {
        DOM: vTree$,
        events: evt,
        value$: menu.value$.map(item => item.value)
      };
    }
    const isolatedMain = isolate(main, scope);
    return isolatedMain(sources);
  }

  /*** Show dropdown on click, hide on click/mouseleave ***/
  function createTransition$(evt: EventSelector, itemClick$) {
    const dropdownClick$ = evt("click")
      .filter(evt => 
        !(evt.srcElement as HTMLElement).classList.contains("item") || 
        (evt.srcElement as HTMLElement).classList.contains("dropdown") 
      )
      .mapTo(Direction.In);
    const mouseleave$ = xs.merge(evt("mouseleave").filter(
      evt => evt.srcElement.className.indexOf("icon") === -1
    ), evt("mouseenter"))
      .map(evt => (evt as MouseEvent).type === "mouseenter" ? Direction.In : Direction.Out)
      .compose(debounce(250))
      .filter(dir => dir === Direction.Out);
    return xs.merge(dropdownClick$, itemClick$.mapTo(Direction.Out), mouseleave$)
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
  }

  function createMenuComponent<V>(sources: DropdownSources<V>, content$: Stream<Content<V>>, value$proxy: Stream<V>, transition$, filter$?: Stream<string>) {
    /*** Create child menu items ***/
    let menuContent$: Stream<Content<V>>;
    if (sources.args && sources.args.search) {
      const filteredContent$ = xs.combine(content$, filter$).map(
        ([content, filter]) => content.filter(c => filterContent(c, filter))
      ).remember();
      menuContent$ = xs.combine(filteredContent$, value$proxy).map(
        ([content, value]) => content.map(
          item => item.value === value ? Object.assign({}, item, { active: true }) : item
        )
      ).remember();
    } else {
      menuContent$ = xs.combine(content$, value$proxy).map(
        ([content, value]) => content.map(
          item => item.value === value ? Object.assign({}, item, { active: true }) : item
        )
      );
    }
    const menu = Menu.run<DropdownItem<V>>({ DOM: sources.DOM, props$: xs.of({submenu: true}), content$: menuContent$ });
    const animatedMenu = Transition.run({ DOM: sources.DOM, target$: menu.DOM, transition$ });
    return {
      DOM: animatedMenu.DOM,
      events: menu.events,
      value$: menu.value$
    };
  }

  function createView<V>(sources: DropdownSources<V>, props$: Stream<Partial<Props>>,
    content$: Stream<Content<V>>, transition$, menu, filter$?): Stream<VNode> {
    const active$ = xs.merge(
      transition$.filter(x => x.direction === Direction.In).mapTo(true),
      transition$.filter(x => x.direction === Direction.Out).compose(delay(250)).mapTo(false)
    ) as Stream<boolean>;
    let activeItem$ = content$.map(content => content.filter(item => item.active)[0]);
    if (sources.args && sources.args.search) {
      return xs.combine(props$, active$, menu.DOM, filter$, activeItem$).map(
        ([props, isActive, menu, filter, activeItem]) => div(
          { props: { className: getClassName(props, sources.args && sources.args.search, isActive) } }, [].concat(
            getText(activeItem, props, sources.args && sources.args.static),
            input({ props: { className: "search", value: filter } }),
            !props.simple ? Icon.render(IconType.Dropdown) : [],
            menu
          )
        )
      );
    } else {
      return xs.combine(props$, active$, menu.DOM, activeItem$).map(
        ([props, isActive, menu, activeItem]) => div(
          { props: { className: getClassName(props, sources.args && sources.args.search, isActive) } }, [].concat(
            getText(activeItem, props, sources.args && sources.args.static),
            !props.simple ? Icon.render(IconType.Dropdown) : [],
            menu
          )
        )
      );
    }
  }

  function getClassName(props: Partial<Props>, search?: boolean, active?: boolean, ) {
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
    if (search) {
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
  function getText<V>(item: Partial<DropdownItem<V>>, props: Partial<Props>, stat?: boolean): VNode {
    if (typeof (stat) !== "undefined") {
      return div({ props: { className: "text" } }, props.default);
    }
    if (item === null || typeof (item) === "undefined") {
      return div({ props: { className: "default text" } }, props.default);
    }
    return div({ props: { className: "text" } }, item.main);
  }
  function filterContent<V>(item: Partial<DropdownItem<V>>, filter: string): boolean {
    function f(node: VNode | string) {
      if (typeof (node) === "string") {
        return node === filter;
      }
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
    if (typeof (item.main) === "undefined") {
      return true;
    }
    else if (typeof (item.main) === "string") {
      return (item.main as string).indexOf(filter) !== -1 || !filter;
    }
    else if (isVNode(item.main)) {
      return f(item.main);
    }
    else if (item.main instanceof Array) {
      for (let c of item.main) {
        if (isMenuItem(c)) {
          return filterContent(c, filter);
        }
        if (f(c)) {
          return true;
        }
      }
    }
    return false;
  }

  function isMenuItem(obj): obj is Partial<Menu.MenuItem> {
    return obj && obj.main;
  }
}
