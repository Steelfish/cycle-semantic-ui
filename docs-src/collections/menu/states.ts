import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { p, VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace States {
  export function run(sources): Stream<VNode[]> {
    let ex = Example.run(sources, {
      header: "Hover",
      description: [
        p("A menu item can be hovered"),
        UI.Message.render({ color: UI.Color.Warning }, "Menu items are only hoverable if they have the href or link property.")
      ],
      VNode$: xs.of(UI.Menu.render({ compact: true }, [
        { href: "#", main: "A link" },
        { link: true, main: "div link" }
      ])),
      code: `UI.Menu.render({compact: true}, [
        {href: "#", main: "A link"},
        {link: true, main: "div link"}
      ])`
    });

    let ex2 = Example.run(sources, {
      header: "Active",
      description: "A menu item can be active",
      VNode$: xs.of(UI.Menu.render({ compact: true }, [
        { active: true, main: "Link" }
      ])),
      code: `UI.Menu.render({compact: true}, [
        {active: true, main: "Link"}
      ])`
    });

    return xs.combine(ex.DOM, ex2.DOM);
  }
}
