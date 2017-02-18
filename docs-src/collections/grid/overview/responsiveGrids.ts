import * as UI from "../../../ui";
import xs, { Stream } from "xstream";
import { VNode } from "@cycle/dom";
import { Example } from "../../../components";

export namespace ResponsiveGrids {
  export function run(sources): Stream<VNode> {
    let containerEx = Example.run(sources, {
      highlighted: true,
      header: "Containers",
      description: "A grid container variant can be used to provide a responsive, fixed width container for wrapping the contents of a page.",
      VNode$: xs.of(UI.Grid.render({ container: true }, [
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 })
      ])),
      code: `UI.Grid.render({container: true}, [
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 })
      ])`
    });

    let stackableEx = Example.run(sources, {
      highlighted: true,
      header: "Stackable",
      description: "A stackable grid will automatically stack rows to a single columns on mobile devices",
      VNode$: xs.of(UI.Grid.render({ stackable: true, width: 4 }, [
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render()
      ])),
      code: `UI.Grid.render({ stackable: true, width: 4 }, [
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render()
      ])`
    });

    let reverseEx = Example.run(sources, {
      header: "Reverse Order",
      description: "Semantic includes special reversed variations that allow you to reverse the order of columns or rows by device",
      VNode$: xs.of(UI.Grid.render({ reversedMobile: true, equalWidth: true }, [
        UI.Column.render("First"),
        UI.Column.render("Second"),
        UI.Column.render("Third"),
      ])),
      code: `UI.Grid.render({ reversedMobile: true, equalWidth: true }, [
        UI.Column.render("First"),
        UI.Column.render("Second"),
        UI.Column.render("Third"),
      ])`
    });

    let doublingEx = Example.run(sources, {
      highlighted: true,
      header: "Doubling",
      description: "A doubling grid will double column widths for each device jump.",
      VNode$: xs.of(UI.Grid.render([
        UI.Row.render({ doubling: true, width: 8 }, [
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ]),
        UI.Row.render({ doubling: true, width: 6 }, [
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ]),
        UI.Row.render({ doubling: true, width: 4 }, [
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ])
      ])),
      code: `UI.Grid.render([
        UI.Row.render({ doubling: true, width: 8 }, [
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ]),
        UI.Row.render({ doubling: true, width: 6 }, [
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ]),
        UI.Row.render({ doubling: true, width: 4 }, [
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ])
      ])`
    });

    let manualEx = Example.run(sources, {
      highlighted: true,
      header: "Manual Tweaks",
      description: "Although design patterns like doubling or stackable are useful at simplifying responsive styling, you can also manually tweak device presentation by specifying the width for a devicetype on columns or setting the device only properties on grids, rows or columns.",
      VNode$: xs.of(UI.Grid.render({centered: true}, [
        UI.Row.render({computerOnly: true}, [
          UI.Column.render()
        ]),
        UI.Column.render({tablet: 6, computer: 8}),
        UI.Column.render({tablet: 6, computer: 8}),
        UI.Column.render({tablet: 6, computer: 8}),
        UI.Column.render({tablet: 6, computer: 8}),
        UI.Column.render({tablet: 6, computer: 8}),
      ])),
      code: `UI.Grid.render({centered: true}, [
        UI.Row.render({computerOnly: true}, [
          UI.Column.render()
        ]),
        UI.Column.render({tablet: 6, computer: 8}),
        UI.Column.render({tablet: 6, computer: 8}),
        UI.Column.render({tablet: 6, computer: 8}),
        UI.Column.render({tablet: 6, computer: 8}),
        UI.Column.render({tablet: 6, computer: 8}),
      ])`
    });

    return xs.combine(containerEx.DOM, stackableEx.DOM, reverseEx.DOM, doublingEx.DOM, manualEx.DOM);
  }
}
