import * as UI from "../../../ui";
import xs, { Stream } from "xstream";
import { p, VNode } from "@cycle/dom";
import { Example } from "../../../components";

export namespace Content {
  export function run(sources): Stream<VNode[]> {
    let rowsEx = Example.run(sources, {
      header: "Rows",
      description: "A row is a horizontal grouping of columns",
      VNode$: xs.of(UI.Grid.render({ width: 3 }, [
        UI.Row.render([
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
        ]),
        UI.Row.render([
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]), 
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]), 
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
        ])
      ])),
      code: `UI.Grid.render({ width: 3 }, [
        UI.Row.render([
          UI.Column.render(),
          UI.Column.render()
        ]),
        UI.Row.render([
          UI.Column.render(), 
          UI.Column.render(), 
          UI.Column.render()
        ])
      ])`
    });

    let columnsEx = Example.run(sources, {
      header: "Columns",
      description: "Columns each contain gutters giving them equal spacing from other columns.",
      VNode$: xs.of(UI.Grid.render([
        UI.Column.render({width: 8}, [p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
        UI.Column.render({width: 8}, [p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
        UI.Column.render({width: 8}, [p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
        UI.Column.render({width: 8}, [p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
      ])),
      code: `UI.Grid.render([
        UI.Column.render({width: 8}),
        UI.Column.render({width: 8}),
        UI.Column.render({width: 8}),
        UI.Column.render({width: 8})
      ])`
    });

    return xs.combine(rowsEx.DOM, columnsEx.DOM);
  }
}
