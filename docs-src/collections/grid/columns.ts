import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace Columns {
  export function run(sources): Stream<VNode> {
    let flowEx = Example.run(sources, {
      highlighted: true,
      header: "Automatic Flow",
      description: "Most grids do not need to specify rows. Content will automatically flow to the next row when all the grid columns are taken in the current row.",
      VNode$: xs.of(UI.Grid.render([
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 4 })
      ])),
      code: `UI.Grid.render([
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

    let contentEx = Example.run(sources, {
      header: "Column Content",
      description: "Since columns use padding to create gutters, content stylings should not be applied directly to columns, but to elements inside of columns.",
      VNode$: xs.of(UI.Grid.render({ width: 3 }, [
        UI.Column.render([
          UI.Segment.render([
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ]),
        UI.Column.render([
          UI.Segment.render([
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ]),
        UI.Column.render([
          UI.Segment.render([
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ])
      ])),
      code: `UI.Grid.render([
        UI.Column.render([
          UI.Segment.render([
            UI.Image.render("")
          ])
        ]),
        UI.Column.render([
          UI.Segment.render([
            UI.Image.render("")
          ])
        ]),
        UI.Column.render([
          UI.Segment.render([
            UI.Image.render("")
          ])
        ])
      ])`
    });

    let widthEx = Example.run(sources, {
      highlighted: true,
      header: "Column Widths",
      description: "Column widths can be specified using the width property. If a column cannot fit in a row it will automatically flow to the next row",
      VNode$: xs.of(UI.Grid.render([
        UI.Column.render({ width: 8 }),
        UI.Column.render({ width: 8 }),
        UI.Column.render({ width: 10 }),
        UI.Column.render({ width: 6 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 12 }),
        UI.Column.render({ width: 2}),
        UI.Column.render({ width: 14 }),
        UI.Column.render({ width: 16})
      ])),
      code: `UI.Grid.render([
       UI.Column.render({ width: 8 }),
        UI.Column.render({ width: 8 }),
        UI.Column.render({ width: 10 }),
        UI.Column.render({ width: 6 }),
        UI.Column.render({ width: 4 }),
        UI.Column.render({ width: 12 }),
        UI.Column.render({ width: 2}),
        UI.Column.render({ width: 14 }),
        UI.Column.render({ width: 16})
      ])`
    });

    return xs.combine(flowEx.DOM, contentEx.DOM, widthEx.DOM);
  }
}
