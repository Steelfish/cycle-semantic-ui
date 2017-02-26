import * as UI from "../../../ui";
import xs, { Stream } from "xstream";
import { p, a, i, div, code, VNode } from "@cycle/dom";
import { Example } from "../../../components";

export namespace Introduction {
  export function run(sources): Stream<VNode[]> {
    let gridEx = Example.run(sources, {
      highlighted: true,
      header: "Grids",
      description: [p(["A grid is a structure with a ", a({ attrs: { href: "http://99designs.com/designer-blog/2013/03/21/history-of-the-grid-part-1/" } }, "long history"), " used to align negative space in designs."]),
      p("Using a grid makes content appear to flow more naturally on your page.")
      ],
      VNode$: xs.of(UI.Grid.render([
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 })
      ])),
      code: `UI.Grid.render([
        UI.Column.render({width: 4}),
        UI.Column.render({width: 4}),
        UI.Column.render({width: 4}),
        UI.Column.render({width: 4})
      ])`
    });

    let columnsEx = Example.run(sources, {
      highlighted: true,
      header: "Columns",
      description: [
        p("Grids divide horizontal space into indivisible units called \"columns\". All columns in a grid must specify their width as proportion of the total available row width."),
        p("All grid systems chooses an arbitrary column count to allow per row. Semantic's default theme uses 16 columns."),
        p(["The example below shows four four wide columns will fit in the first row, ", code("16 / 4 = 4"), " and three various sized columns in the second row. ", code("2 + 8 + 6 = 16")]),
        p("The default column count, and other arbitrary features of grids can be changed by adjusting Semantic UI's underlying theming variables.")
      ],
      VNode$: xs.of(UI.Grid.render([
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 2 }),
        UI.Column.render({ width: 8 }),
        UI.Column.render({ width: 6 }),
      ])),
      code: `UI.Grid.render([
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 2 }),
        UI.Column.render({ width: 8 }),
        UI.Column.render({ width: 6 }),
      ])`
    });

    let rowsEx = Example.run(sources, {
      highlighted: true,
      header: "Rows",
      description: [
        p("Rows are groups of columns which are aligned horizontally."),
        p(["Rows can either be ", i("explicit"), " marked with an additional row element, or ", i("implicit"), ", automatically occurring when no more space is left in a previous row."])
      ],
      VNode$: xs.of(UI.Grid.render({ width: 4 }, [
        UI.Row.render([
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ]),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
      ])),
      code: `UI.Grid.render({ width: 4 }, [
        UI.Row.render([
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ]),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
      ])`
    });

    let guttersEx = Example.run(sources, {
      highlighted: true,
      header: "Gutters",
      description: [
        p(["Grid columns are separated by areas of white space referred to as \"gutters\". Gutters improve legibility by providing, ",
          a({ attrs: { href: "https://en.wikipedia.org/wiki/Negative_space" } }, "negative space"), " between page elements."]),
        p("Gutters remain a constant size regardless of the width of the grid, or how many columns are in a row. To increase the size of gutters in a particular grid, you can use a relaxed grid variation.")
      ],
      VNode$: xs.of(div([
        UI.Grid.render([
          UI.Row.render({ equalWidth: true }, [
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
          ]),
          UI.Row.render({ equalWidth: true }, [
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render()
          ])
        ]),
        UI.Grid.render({relaxed: true}, [
          UI.Row.render({ equalWidth: true }, [
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
          ]),
          UI.Row.render({ equalWidth: true }, [
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render()
          ])
        ])
      ])),
      code: `UI.Grid.render([
          UI.Row.render({ equalWidth: true }, [
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
          ]),
          UI.Row.render({ equalWidth: true }, [
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render()
          ])
        ]),
        UI.Grid.render({relaxed: true}, [
          UI.Row.render({ equalWidth: true }, [
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
          ]),
          UI.Row.render({ equalWidth: true }, [
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render(),
            UI.Column.render()
          ])
        ])`
    });

    let negMarginsEx = Example.run(sources, {
      highlighted: true,
      header: "Negative margins",
      description: [p(["Since all grid columns include gutters, grids use ", a({attrs: {href: "https://csswizardry.com/2011/08/building-better-grid-systems/"}}, "negative margins"), 
      " to make sure that the first and last columns sit flush with content outside the grid."]),
        p("In the following example, you can see even though the top row has padding, the attached button still sits flush with the edge of the grid."),
        p("In some cases you may want to avoid using negative margins. You can do this by using a padded grid variation.")
      ],
      VNode$: xs.of(div([
        UI.Button.render({attachment: UI.Attachment.Top}, "Button before grid"),
        UI.Grid.render([
          UI.Column.render({width: 16}),
          UI.Column.render({width: 10}),
          UI.Column.render({width: 6})
        ]),
        UI.Grid.render([
          UI.Column.render({width: 16}),
        ]),
        UI.Button.render({attachment: UI.Attachment.Bottom}, "Button after grid")
      ])),
      code: `UI.Button.render({attachment: UI.Attachment.Top}, "Button before grid"),
        UI.Grid.render([
          UI.Column.render({width: 16}),
          UI.Column.render({width: 10}),
          UI.Column.render({width: 6})
        ]),
        UI.Grid.render([
          UI.Column.render({width: 16}),
        ]),
        UI.Button.render({attachment: UI.Attachment.Bottom}, "Button after grid")`
    });

    let containerEx = Example.run(sources, {
      highlighted: true,
      header: "Container grids",
      description: [
        p("Grids are fluid and will automatically flow in size to take the maximum available width."),
        p("Containers are elements designed to limit page content to a reasonable maximum width for display based on the size of the user's screen."),
        p("Using a grid container is the best way to include top-level page content inside a grid.")
      ],
      VNode$: xs.of(UI.Grid.render({container: true}, [
        UI.Column.render({width: 16})
      ])),
      code: `UI.Grid.render({container: true}, [
        UI.Column.render({width: 16})
      ])`
    });

    return xs.combine(gridEx.DOM, columnsEx.DOM, rowsEx.DOM, guttersEx.DOM, negMarginsEx.DOM, containerEx.DOM);
  }
}
