import * as UI from "../../../ui";
import xs, { Stream } from "xstream";
import { div, VNode } from "@cycle/dom";
import { Example } from "../../../components";

export namespace VaryingGrids {
  export function run(sources): Stream<VNode[]> {
    let nestedEx = Example.run(sources, {
      highlighted: true,
      header: "Nesting Grids",
      description: "Grids can be placed inside of other grids, letting you sub-divide columns.",
      VNode$: xs.of(UI.Grid.render({ width: 2 }, [
        UI.Column.render([
          UI.Grid.render({ width: 3 }, [
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
          ])
        ]),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render([
          UI.Grid.render([
            UI.Column.render({ width: 10 }),
            UI.Column.render({ width: 6 }),
          ])
        ]),
      ])),
      code: `UI.Grid.render({ width: 2}, [
        UI.Column.render({
          UI.Grid.render({width: 3}, [
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
          ])
        }),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render([
          UI.Grid.render([
            UI.Column.render({width: 10}),
            UI.Column.render({width: 6}),
          ])
        ]),
      ])`
    }).DOM.map(ex => div(".special", [ex]));

    let colCountEx = Example.run(sources, {
      highlighted: true,
      header: "Automatic Column Count",
      description: "The equalWidth variation will automatically divide column width evenly. This is useful with dynamic content where you do not know the column count in advance.",
      VNode$: xs.of(UI.Grid.render({ equalWidth: true }, [
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Row.render({ equalWidth: true }, [
          UI.Column.render(),
          UI.Column.render()
        ])
      ])),
      code: `UI.Grid.render({ equalWidth: true }, [
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Row.render({ equalWidth: true }, [
          UI.Column.render(),
          UI.Column.render()
        ])
      ])`
    });

    let centeringEx = Example.run(sources, {
      highlighted: true,
      header: "Centering Content",
      description: "If a row does not take up all sixteen grid columns, you can use a centered variation to center the column contents inside the grid.",
      VNode$: xs.of(UI.Grid.render({ centered: true, width: 2 }, [
        UI.Column.render(),
        UI.Row.render({ width: 4 }, [
          UI.Column.render(),
          UI.Column.render(),
        ])
      ])),
      code: `UI.Grid.render({ centered: true, width: 2 }, [
        UI.Column.render(),
        UI.Row.render({ width: 4 }, [
          UI.Column.render(),
          UI.Column.render(),
        ])
      ])`
    });

    return xs.combine(nestedEx, colCountEx.DOM, centeringEx.DOM);
  }
}
