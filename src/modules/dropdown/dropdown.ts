import xs, { Stream, MemoryStream } from "xstream";
import isolate from "@cycle/isolate";
import delay from "xstream/extra/delay";
import { div } from "@cycle/dom";

import { Dropdown } from "./index";
import { createTransition$, getClassName, getText } from "./common";
import { Menu } from "../../collections/menu";
import { Icon } from "../../elements/icon";
import { Transition } from "../../modules/transition";
import { ValueComponentSinks } from "../../types";
import { IconType, Direction } from "../../enums";
import { getScope } from "../../utils";


export default function run<V>(sources: Dropdown.DropdownSources<V>, scope: string = getScope()): ValueComponentSinks<V> {
  function main(sources: Dropdown.DropdownSources<V>) {
    /*** Main streams ***/
    const evt = (type) => sources.DOM.select(".dropdown").events(type);
    const content$ = sources.content$ ? sources.content$.map(c => c instanceof Array ? c : c.main) : xs.of([]) as Stream<Dropdown.Content<V>>;
    const props$ = sources.props$ ? sources.props$.remember() : xs.of({}) as MemoryStream<Partial<Dropdown.Props>>;

    const value$proxy = xs.create() as Stream<V>;
    const initialValue$ = props$.map(props => props.initial).remember();
    const value$ = initialValue$.map(value => value$proxy.startWith(value)).flatten().remember();

    const menuItems$ = xs.combine(content$, value$).map(
      ([content, value]) => content.map(
        item => item.value === value ? Object.assign({}, item, { active: true }) : item
      )
    ).remember();
    const activeItem$ = menuItems$.map(content => content.filter(item => item.active)[0]);
    const menu = Menu.run<Dropdown.DropdownItem<V>>({ DOM: sources.DOM, props$: xs.of({ submenu: true }), content$: menuItems$ }, scope);
    value$proxy.imitate(menu.value$.map(item => item.value));

    let transition$ = createTransition$(evt, sources.args);

    const active$ = xs.merge(
      transition$.filter(x => x.direction === Direction.In).mapTo(true),
      transition$.filter(x => x.direction === Direction.Out).compose(delay(250)).mapTo(false)
    ) as Stream<boolean>;
    const animatedMenu = Transition.run({ DOM: sources.DOM, target$: menu.DOM, transition$ }, scope);
    const vTree$ = xs.combine(props$, active$, animatedMenu.DOM, activeItem$).map(
      ([props, isActive, menu, activeItem]) => div(
        { props: { className: getClassName(isActive ? "ui active" : "ui", props) } }, [].concat(
          getText(activeItem, props, sources.args && sources.args.static),
          !props.simple ? Icon.render(IconType.Dropdown) : [],
          menu
        )
      )
    );
    return {
      DOM: vTree$,
      events: (type) => xs.merge(evt(type), menu.events(type), animatedMenu.events(type)),
      value$: menu.value$.map(item => item.value)
    };
  }
  const isolatedMain = isolate(main, scope);
  return isolatedMain(sources);
}

