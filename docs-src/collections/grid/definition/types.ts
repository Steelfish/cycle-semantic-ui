import * as UI from "../../../ui";
import xs, { Stream } from "xstream";
import { p, VNode } from "@cycle/dom";
import { Example } from "../../../components";

export namespace Types {
  export function run(sources): Stream<VNode[]> {
    let basicEx = Example.run(sources, {
      highlighted: true,
      header: ["Grid", UI.Label.render({ color: UI.Color.Primary }, "Flexbox")],
      description: "A basic grid",
      VNode$: xs.of(UI.Grid.render([
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render()
      ])),
      code: `UI.Grid.render([
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render()
      ])`
    });

    let dividedEx = Example.run(sources, {
      header: ["Divided", UI.Label.render({ color: UI.Color.Secondary }, "Requires rows")],
      description: "A grid can have dividers between its columns",
      VNode$: xs.of(UI.Grid.render({ width: 3, divided: true }, [
        UI.Row.render([
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
        ]),
        UI.Row.render([
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
        ])
      ])),
      code: `UI.Grid.render({width: 3, divided: true}, [
        UI.Row.render([
          UI.Column.render(),
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

    let verticalEx = Example.run(sources, {
      header: ["Vertical Divided", UI.Label.render({ color: UI.Color.Secondary }, "Requires Rows")],
      description: "A grid can have dividers between rows",
      VNode$: xs.of(UI.Grid.render({ verticallyDivided: true }, [
        UI.Row.render({ width: 2 }, [
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
        ]),
        UI.Row.render({ width: 3 }, [
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
        ])
      ])),
      code: `UI.Grid.render({ verticallyDivided: true }, [
        UI.Row.render({ width: 2 }, [
          UI.Column.render(),
          UI.Column.render()
        ]),
        UI.Row.render({ width: 3 }, [
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ])
      ])`
    });
    let celledEx = Example.run(sources, {
      header: ["Celled", UI.Label.render({ color: UI.Color.Secondary }, "Requires Rows")],
      description: "A grid can have rows divided into cells",
      VNode$: xs.of(UI.Grid.render({ celled: true }, [
        UI.Row.render([
          UI.Column.render({ width: 3 }, [
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render({ width: 13 }, [p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
        ]),
        UI.Row.render([
          UI.Column.render({ width: 3 }, [
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),          
          UI.Column.render({width: 10}, [p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render({ width: 3 }, [
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ]),
      ])),
      code: `UI.Grid.render({celled: true}, [
        UI.Row.render([
          UI.Column.render({width: 3}),
          UI.Column.render({width: 13})
        ]),
        UI.Row.render([
          UI.Column.render({width: 3}),
          UI.Column.render({width: 10}),
          UI.Column.render({width: 3})
        ]),
      ])`
    });
    let intCelledEx = Example.run(sources, {
      header: ["Internally Celled", UI.Label.render({ color: UI.Color.Secondary }, "Requires Rows")],
      description: "A grid can have rows divisions only between internal rows",
      VNode$: xs.of(UI.Grid.render({ intCelled: true }, [
        UI.Row.render([
          UI.Column.render({ width: 3 }, [
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),          
          UI.Column.render({width: 10}, [p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render({ width: 3 }, [
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ]),
        UI.Row.render([
          UI.Column.render({ width: 3 }, [
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),          
          UI.Column.render({width: 10}, [p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render({ width: 3 }, [
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ])
      ])),
      code: `UI.Grid.render({ intCelled: true }, [
        UI.Row.render([
          UI.Column.render({ width: 3 }),
          UI.Column.render({ width: 10 }),
          UI.Column.render({ width: 3 })
        ]),
        UI.Row.render([
          UI.Column.render({ width: 3 }),
          UI.Column.render({ width: 10 }),
          UI.Column.render({ width: 3 })
        ])
      ])`
    });

    return xs.combine(basicEx.DOM, dividedEx.DOM, verticalEx.DOM, celledEx.DOM, intCelledEx.DOM);
  }
}
