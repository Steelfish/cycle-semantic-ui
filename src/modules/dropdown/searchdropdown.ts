import xs, { Stream, MemoryStream } from "xstream";
import isolate from "@cycle/isolate";
import delay from "xstream/extra/delay";
import { VNode, div, input } from "@cycle/dom";

import { Dropdown } from "./index";
import { getClassName, getText, isMenuItem, createTransition$ } from "./common";

import { Menu } from "../../collections/menu";
import { Icon } from "../../elements/icon";
import { Transition } from "../../modules/transition";
import { isVNode, ValueComponentSinks } from "../../types";
import { IconType, Direction } from "../../enums";
import { getScope, deepArrayCopy } from "../../utils";



export default function run<V>(sources: Dropdown.DropdownSources<V>, scope: string = getScope()): ValueComponentSinks<V> {
  function main(sources: Dropdown.DropdownSources<V>) {
    /*** Main streams ***/
    const evt = (type) => sources.DOM.select(".dropdown").events(type);
    const content$ = (sources.content$ ? sources.content$.map(c => c instanceof Array ? c : c.main) : xs.of([])) as Stream<Dropdown.Content<V>>;
    const props$ = (sources.props$ ? sources.props$.remember() : xs.of({})) as MemoryStream<Partial<Dropdown.Props>>;

    const value$proxy = xs.create() as Stream<V>;
    const initialValue$ = props$.map(props => props.initial).remember();
    const value$ = initialValue$.map(value => value$proxy.startWith(value)).flatten().remember();

    const input$ = sources.DOM.select("input").events("keyup")
      .map(ev => (ev.target as HTMLInputElement).value);
    const filter$ = xs.merge(input$, value$proxy.map(v => "")).startWith("") as Stream<string>;

    /** Create menu component **/
    const menuItems$ = xs.combine(content$, value$).map(
      ([content, value]) => content.map(
        item => item.value === value ? Object.assign({}, item, { active: true }) : item
      )
    ).remember();
    const activeItem$ = menuItems$.map(content => content.filter(item => item.active)[0]);
    const filteredItems$ = xs.combine(menuItems$, filter$).map(
      ([content, filter]) => deepArrayCopy(content.filter(c => filterContent(c, filter)))
    ).remember();
    const menu = Menu.run<Dropdown.DropdownItem<V>>({ DOM: sources.DOM, props$: xs.of({ submenu: true }), content$: filteredItems$ }, scope);

    const inputEnter$ = sources.DOM.select("input").events("keypress") as Stream<KeyboardEvent>;
    const enterValue$ = inputEnter$.map(evt =>
      (evt.charCode === 13 || evt.charCode === 9) ? filteredItems$.map(items => items[0]).take(1) : xs.never()
    ).flatten();

    value$proxy.imitate(xs.merge(menu.value$, enterValue$).map(item => item.value));

    const transition$ = createTransition$(evt, sources.args);
    const active$ = xs.merge(
      transition$.filter(x => x.direction === Direction.In).mapTo(true),
      transition$.filter(x => x.direction === Direction.Out).compose(delay(250)).mapTo(false)
    ) as Stream<boolean>;
    const animatedMenu = Transition.run({ DOM: sources.DOM, target$: menu.DOM, transition$ }, scope);

    const vTree$ = xs.combine(props$, active$, animatedMenu.DOM, filter$, activeItem$).map(
      ([props, isActive, menu, filter, activeItem]) => div(
        { props: { className: getClassName(isActive ? "ui active search " : "ui search", props) } }, [].concat(
          input({ props: { className: "search", value: filter } }),
          getText(activeItem, props, sources.args && sources.args.static, filter),
          !props.simple ? Icon.render(IconType.Dropdown) : [],
          menu
        )
      )
    );
    return {
      DOM: vTree$,
      events: (type) => xs.merge(evt(type), menu.events(type), animatedMenu.events(type)),
      value$: value$proxy
    };
  }
  if (scope === null) {
    return main(sources);
  }
  const isolatedMain = isolate(main, scope);
  return isolatedMain(sources);
}

function filterContent<V>(item: Partial<Dropdown.DropdownItem<V>>, filter: string): boolean {
  function f(node: VNode | string) {
    if (typeof (node) === "string") {
      return node.indexOf(filter) !== -1 || !filter;
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
