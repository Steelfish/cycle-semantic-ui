import * as UI from "../../../ui";
import xs, { Stream } from "xstream";
import { VNode, p, div } from "@cycle/dom";
import { Example } from "../../../components";

export namespace Variations {
  export function run(sources): Stream<VNode[]> {

    let floatedEx = createFloatedExamples(sources);
    let widthEx = createWidthExamples(sources);
    let countEx = createCountExamples(sources);
    let equalWidthEx = createEqualWidthExamples(sources);
    let stretchedEx = createStretchedExamples(sources);
    let paddedEx = createPaddedExamples(sources);
    let relaxedEx = createRelaxedExamples(sources);
    let centeredEx = createCenteredExamples(sources);
    let textEx = createTextAlignmentExamples(sources);
    let alignmentEx = createAlignmentExamples(sources);

    let examples = [].concat(floatedEx, widthEx, countEx, equalWidthEx,
      stretchedEx, paddedEx, relaxedEx, centeredEx, textEx,
      alignmentEx);
    return xs.combine.apply(null, examples);
  }

  function createFloatedExamples(sources): Stream<VNode>[] {
    let floatedEx = Example.run(sources, {
      header: "Floated",
      description: "A column can sit flush against the left or right edge of a row",
      VNode$: xs.of(UI.Grid.render([
        UI.Column.render({ float: "left", width: 5 }, [p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
        UI.Column.render({ float: "right", width: 5 }, [p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
      ])),
      code: `UI.Grid.render([
        UI.Column.render({float: "left", width: 5}),
        UI.Column.render({float: "right", width: 5}),
      ])`
    });
    return [floatedEx.DOM];
  }

  function createWidthExamples(sources): Stream<VNode>[] {
    let widthEx = Example.run(sources, {
      header: "Column Width",
      description: "A column can vary in width taking up more than a single grid column.",
      VNode$: xs.of(UI.Grid.render([
        UI.Column.render({ width: 4 }, [
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
        ]),
        UI.Column.render({ width: 9 }, [p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
        UI.Column.render({ width: 3 }, [p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
      ])),
      code: `UI.Grid.render([
        UI.Column.render({width: 4}),
        UI.Column.render({width: 9}),
        UI.Column.render({width: 3})
      ])`
    });

    return [widthEx.DOM];
  }

  function createCountExamples(sources): Stream<VNode>[] {
    let countEx = Example.run(sources, {
      header: "Column Count",
      description: "A grid can have a different number of columns per row",
      VNode$: xs.of(UI.Grid.render([
        UI.Row.render({ width: 3 }, [
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ]),
        UI.Row.render({ width: 4 }, [
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ]),
        UI.Row.render({ width: 5 }, [
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ])
      ])),
      code: `UI.Grid.render([
        UI.Row.render({ width: 3 }, [
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ]),
        UI.Row.render({ width: 4 }, [
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ]),
        UI.Row.render({ width: 5 }, [
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ])
      ])`
    });
    return [countEx.DOM];
  }

  function createEqualWidthExamples(sources): Stream<VNode>[] {
    let equalWidthEx = Example.run(sources, {
      header: "Equal Width",
      description: "A grid can automatically resize all elements to split the available width evenly",
      VNode$: xs.of(UI.Grid.render({ equalWidth: true }, [
        UI.Column.render([
          UI.Segment.render("1")
        ]),
        UI.Column.render({ width: 8 }, [
          UI.Segment.render("2")
        ]),
        UI.Column.render([
          UI.Segment.render("3")
        ])
      ])),
      code: `UI.Grid.render({ equalWidth: true }, [
        UI.Column.render([
          UI.Segment.render("1")
        ]), 
        UI.Column.render({width: 8}, [
          UI.Segment.render("2")
        ]), 
        UI.Column.render([
          UI.Segment.render("3")
        ])
      ])`
    });

    let equalWidthEx2 = Example.run(sources, {
      VNode$: xs.of(UI.Grid.render({ equalWidth: true }, [
        UI.Row.render([
          UI.Column.render([
            UI.Segment.render("1")
          ]),
          UI.Column.render([
            UI.Segment.render("2")
          ]),
          UI.Column.render([
            UI.Segment.render("3")
          ]),
          UI.Column.render([
            UI.Segment.render("4")
          ])
        ]),
        UI.Row.render([
          UI.Column.render([
            UI.Segment.render("1")
          ]),
          UI.Column.render([
            UI.Segment.render("2")
          ]),
          UI.Column.render([
            UI.Segment.render("3")
          ])
        ]),
        UI.Row.render([
          UI.Column.render([
            UI.Segment.render("1")
          ]),
          UI.Column.render([
            UI.Segment.render("2")
          ])
        ])
      ])),
      code: `UI.Grid.render({ equalWidth: true }, [
        UI.Row.render([
          UI.Column.render([
            UI.Segment.render("1")
          ]),
          UI.Column.render([
            UI.Segment.render("2")
          ]),
          UI.Column.render([
            UI.Segment.render("3")
          ]),
          UI.Column.render([
            UI.Segment.render("4")
          ])
        ]),
        UI.Row.render([
          UI.Column.render([
            UI.Segment.render("1")
          ]),
          UI.Column.render([
            UI.Segment.render("2")
          ]),
          UI.Column.render([
            UI.Segment.render("3")
          ])
        ]),
        UI.Row.render([
          UI.Column.render([
            UI.Segment.render("1")
          ]),
          UI.Column.render( [
            UI.Segment.render("2")
          ])
        ])
      ])`
    });
    return [equalWidthEx.DOM, equalWidthEx2.DOM];
  }

  function createStretchedExamples(sources): Stream<VNode>[] {
    let stretchedEx = Example.run(sources, {
      header: "Stretched",
      description: "A row can stretch its contents to take up the entire column height",
      VNode$: xs.of(UI.Grid.render({ width: 3, divided: true }, [
        UI.Row.render({ stretched: true }, [
          UI.Column.render([
            UI.Segment.render("1")
          ]),
          UI.Column.render([
            UI.Segment.render("1"),
            UI.Segment.render("2")
          ]),
          UI.Column.render([
            UI.Segment.render("1"),
            UI.Segment.render("2"),
            UI.Segment.render("3")
          ])
        ])
      ])),
      code: `UI.Grid.render({width: 3, divided: true}, [
        UI.Row.render({ stretched: true }, [
          UI.Column.render([
            UI.Segment.render("1")
          ]),
          UI.Column.render([
            UI.Segment.render("1"),
            UI.Segment.render("2")
          ]), 
          UI.Column.render([
            UI.Segment.render("1"),
            UI.Segment.render("2"),
            UI.Segment.render("3")
          ])
        ])
      ])`
    });

    let stretchedEx2 = Example.run(sources, {
      VNode$: xs.of(UI.Grid.render({ equalWidth: true }, [
        UI.Row.render({ stretched: true }, [
          UI.Column.render([
            UI.Segment.render("1"),
            UI.Segment.render("2")
          ]),
          UI.Column.render({ width: 6 }, [
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Segment.render("1"),
            UI.Segment.render("2")
          ])
        ]),
        UI.Row.render([
          UI.Column.render([
            UI.Segment.render("1"),
            UI.Segment.render("2")
          ]),
          UI.Column.render({ width: 6 }, [
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Segment.render("1"),
            UI.Segment.render("2")
          ])
        ])
      ])),
      code: `UI.Grid.render({ equalWidth: true }, [
        UI.Row.render({ stretched: true }, [
          UI.Column.render([
            UI.Segment.render("1"),
            UI.Segment.render("2")
          ]),
          UI.Column.render({ width: 6 }, [
            UI.Image.render({ size: UI.Size.Fluid })
          ]),
          UI.Column.render([
            UI.Segment.render("1"),
            UI.Segment.render("2")
          ])
        ]),
        UI.Row.render([
          UI.Column.render([
            UI.Segment.render("1"),
            UI.Segment.render("2")
          ]),
          UI.Column.render({ width: 6 }, [
            UI.Image.render({ size: UI.Size.Fluid })
          ]),
          UI.Column.render([
            UI.Segment.render("1"),
            UI.Segment.render("2")
          ])
        ])
      ])`
    });
    return [stretchedEx.DOM, stretchedEx2.DOM];
  }

  function createPaddedExamples(sources): Stream<VNode>[] {
    let paddedEx = Example.run(sources, {
      header: "Padded",
      description: [
        p("A grid can preserve its vertical and horizontal gutters on first and last columns"),
        p("The following grid has vertical and horizontal gutters")
      ],
      VNode$: xs.of(div([
        UI.Divider.render(),
        UI.Grid.render({ width: 2, padded: true }, [
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
        ])
      ])),
      code: `UI.Divider.render(),
        UI.Grid.render({ width: 2, padded: true }, [
          UI.Column.render(),
          UI.Column.render()
        ])`
    });
    let paddedEx2 = Example.run(sources, {
      description: "The following grid has vertical gutters.",
      VNode$: xs.of(div([
        UI.Divider.render(),
        UI.Grid.render({ width: 2, verticallyPadded: true }, [
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
        ])
      ])),
      code: `UI.Divider.render(),
        UI.Grid.render({ width: 2, verticallyPadded: true }, [
          UI.Column.render(),
          UI.Column.render()
        ])`
    });
    let paddedEx3 = Example.run(sources, {
      description: "The following grid has horizontal gutters.",
      VNode$: xs.of(div([
        UI.Divider.render(),
        UI.Grid.render({ width: 2, horizontallyPadded: true }, [
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
          UI.Column.render([p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
        ])
      ])),
      code: `UI.Divider.render(),
        UI.Grid.render({ width: 2, horizontallyPadded: true }, [
          UI.Column.render(),
          UI.Column.render()
        ])`
    });

    return [paddedEx.DOM, paddedEx2.DOM, paddedEx3.DOM];
  }

  function createRelaxedExamples(sources): Stream<VNode>[] {
    let relaxedEx = Example.run(sources, {
      header: "Relaxed",
      description: "A grid can increase its gutters to allow for more negative space",
      VNode$: xs.of(UI.Grid.render({ relaxed: true, width: 4 }, [
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
        ]),
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
        ]),
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
        ]),
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
        ])
      ])),
      code: `UI.Grid.render({relaxed: true, width: 4}, [
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render()
      ])`
    });

    let relaxedEx2 = Example.run(sources, {
      VNode$: xs.of(UI.Grid.render({ veryRelaxed: true, width: 4 }, [
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
        ]),
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
        ]),
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
        ]),
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
        ])
      ])),
      code: `UI.Grid.render({veryRelaxed: true, width: 4}, [
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render()
      ])`
    });
    return [relaxedEx.DOM, relaxedEx2.DOM];
  }

  function createCenteredExamples(sources): Stream<VNode>[] {
    let centeredEx = Example.run(sources, {
      header: "Centered",
      description: "A grid can have its columns centered",
      VNode$: xs.of(UI.Grid.render({ width: 2, centered: true }, [
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
        ]),
        UI.Row.render({ width: 4, centered: true }, [
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ]),
        UI.Row.render({ width: 4 }, [
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ])
      ])),
      code: `UI.Grid.render({width: 2, centered: true}, [
        UI.Column.render(),
        UI.Row.render({width:4, centered: true}, [
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ]),        
        UI.Row.render({width:4}, [
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render(),
          UI.Column.render()
        ])
      ])`
    });
    return [centeredEx.DOM];
  }

  function createTextAlignmentExamples(sources): Stream<VNode>[] {
    let textEx = Example.run(sources, {
      header: "Text Alignment",
      description: "A grid, row, or column can specify its text alignment",
      VNode$: xs.of(UI.Grid.render({ textAlignment: "center" }, [
        UI.Row.render({ width: 3 }, [
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Cats" }
            ])
          ]),
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Dogs" },
              { main: "Poodle" },
              { main: "Cockerspaniel" }
            ])
          ]),
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Monkeys" }
            ])
          ])
        ])
      ])),
      code: `UI.Grid.render({ textAlignment: "center"}, [
        UI.Row.render({width: 3}, [
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Cats" }
            ])
          ]),
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Dogs" },
              { main: "Poodle" },
              { main: "Cockerspaniel" }
            ])
          ]),
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Monkeys" }
            ])
          ])
        ])
      ])`
    });

    let textEx2 = Example.run(sources, {
      VNode$: xs.of(UI.Grid.render({ textAlignment: "center" }, [
        UI.Row.render({ width: 3 }, [
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Cats" }
            ])
          ]),
          UI.Column.render({ textAlignment: "left" }, [
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Dogs" },
              { main: "Poodle" },
              { main: "Cockerspaniel" }
            ])
          ]),
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Monkeys" }
            ])
          ])
        ]),
        UI.Row.render({ textAlignment: "justified" }, [
          UI.Column.render("Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other.")
        ])
      ])),
      code: `UI.Grid.render({ textAlignment: "center"}, [
        UI.Row.render({width: 3}, [
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Cats" }
            ])
          ]),
          UI.Column.render({textAlignment: "left"}, [
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Dogs" },
              { main: "Poodle" },
              { main: "Cockerspaniel" }
            ])
          ]),
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Monkeys" }
            ])
          ])
        ]), 
        UI.Row.render({textAlignment: "justified"}, [
          UI.Column.render("Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other.")
        ])
      ])`
    });

    let textEx3 = Example.run(sources, {
      VNode$: xs.of(UI.Grid.render({ textAlignment: "right", width: 3 }, [
        UI.Row.render([
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Cats" }
            ])
          ]),
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Dogs" },
              { main: "Poodle" },
              { main: "Cockerspaniel" }
            ])
          ]),
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Monkeys" }
            ])
          ])
        ])
      ])),
      code: `UI.Grid.render({ textAlignment: "right", width: 3 }, [
        UI.Row.render([
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Cats" }
            ])
          ]),
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Dogs" },
              { main: "Poodle" },
              { main: "Cockerspaniel" }
            ])
          ]), 
          UI.Column.render([
            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
              { header: true, main: "Monkeys" }
            ])
          ])
        ])
      ])`
    });
    return [textEx.DOM, textEx2.DOM, textEx3.DOM];
  }

  function createAlignmentExamples(sources): Stream<VNode>[] {
    let alignmentEx = Example.run(sources, {
      header: "Vertical Alignment",
      description: "A grid, row, or column can specify its vertical alignment to have all its columns vertically centered.",
      VNode$: xs.of(UI.Grid.render({ alignment: "middle", centered: true, width: 4 }, [
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
        ]),
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000"),
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
        ]),
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
        ])
      ])),
      code: `UI.Grid.render({ alignment: "middle", centered: true, width: 4 }, [
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "")
        ]),
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, ""),
          UI.Image.render({ size: UI.Size.Fluid }, "")
        ]),
        UI.Column.render([
          UI.Image.render({ size: UI.Size.Fluid }, "")
        ])
      ])`
    });

    let alignmentEx2 = Example.run(sources, {
      VNode$: xs.of(UI.Grid.render({ centered: true, width: 4 }, [
        UI.Row.render({ alignment: "top" }, [
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000"),
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ]),
        UI.Row.render({ alignment: "middle" }, [
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000"),
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ]),
        UI.Row.render({ alignment: "bottom" }, [
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000"),
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ])
      ])),
      code: `UI.Grid.render({ centered: true, width: 4 }, [
        UI.Row.render({ alignment: "top" }, [
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, ""),
            UI.Image.render({ size: UI.Size.Fluid }, "")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "")
          ])
        ]),
        UI.Row.render({ alignment: "middle" }, [
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, ""),
            UI.Image.render({ size: UI.Size.Fluid }, "")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "")
          ])
        ]),
        UI.Row.render({ alignment: "bottom" }, [
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, ""),
            UI.Image.render({ size: UI.Size.Fluid }, "")
          ]),
          UI.Column.render([
            UI.Image.render({ size: UI.Size.Fluid }, "")
          ])
        ])
      ])`
    });

    return [alignmentEx.DOM, alignmentEx2.DOM];
  }
}
