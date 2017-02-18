import * as UI from "../../../ui";
import xs, { Stream } from "xstream";
import { p, div, VNode } from "@cycle/dom";
import { Example } from "../../../components";

export namespace ResponsiveVariations {
  export function run(sources): Stream<VNode[]> {
    let doublingEx = createDoublingExamples(sources);
    let stackableEx = createStackableExamples(sources);
    let reversedEx = createReversedExamples(sources);
    let deviceVisibilityEx = createDeviceVisiblityExamples(sources);
    let responsiveWidthEx = createResponsiveWithExamples(sources);

    let examples = [].concat(doublingEx, stackableEx, reversedEx, deviceVisibilityEx, responsiveWidthEx);
    return xs.combine.apply(null, examples);
  }

  function createDoublingExamples(sources): Stream<VNode>[] {

    let doublingEx = Example.run(sources, {
      header: "Doubling",
      description: [
        p("A grid can double its column width on tablet and mobile sizes"),
        UI.Message.render({ color: UI.Color.Info }, {
          body: "A grid will round its columns to the closest reasonable value when doubling, for example a five column grid will use 2 mobile, 3 tablet, 5 desktop. To force 1 column on mobile you can add stackable"
        })
      ],
      VNode$: xs.of(UI.Grid.render({ width: 5, doubling: true }, [
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
      ])),
      code: `UI.Grid.render({width: 5, doubling: true}, [
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render()
      ])`
    });

    return [doublingEx.DOM];
  }

  function createStackableExamples(sources): Stream<VNode>[] {
    let stackableEx = Example.run(sources, {
      header: "Stackable",
      description: [
        p("A grid can have its columns stack on-top of each other after reaching mobile breakpoints"),
        UI.Message.render({ color: UI.Color.Info }, {
          body: "To see a grid stack, try resizing your browser to a small width"
        })
      ],
      VNode$: xs.of(UI.Grid.render({ width: 2, stackable: true }, [
        UI.Column.render([
          UI.Segment.render([
            p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
          ])
        ]),
        UI.Column.render([
          UI.Segment.render([
            p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
          ])
        ])
      ])),
      code: `UI.Grid.render({ width: 2, stackable: true }, [
        UI.Column.render([
          UI.Segment.render([

          ])
        ]),
        UI.Column.render([
          UI.Segment.render([

          ])
        ])
      ])`
    });

    return [stackableEx.DOM];
  }

  function createReversedExamples(sources): Stream<VNode>[] {
    let reversedEx = Example.run(sources, {
      header: "Reversed",
      description: [
        p("A grid or row can specify that its columns should reverse order at different device sizes"),
        UI.Message.render({ color: UI.Color.Info }, {
          body: "Reversed grids are compatible with divided grids and other complex grid types."
        })
      ],
      VNode$: xs.of(div([
        UI.Grid.render({ reversedComputer: true, equalWidth: true }, [
          UI.Row.render([
            UI.Column.render("Computer A Fourth"),
            UI.Column.render("Computer A Third"),
            UI.Column.render("Computer A Second"),
            UI.Column.render("Computer A First")
          ]),
          UI.Row.render([
            UI.Column.render("Computer B Fourth"),
            UI.Column.render("Computer B Third"),
            UI.Column.render("Computer B Second"),
            UI.Column.render("Computer B First")
          ]),
        ]),
        UI.Grid.render({ reversedTablet: true, equalWidth: true }, [
          UI.Row.render([
            UI.Column.render("Tablet A Fourth"),
            UI.Column.render("Tablet A Third"),
            UI.Column.render("Tablet A Second"),
            UI.Column.render("Tablet A First")
          ])
        ]),
        UI.Grid.render({ reversedMobile: true, equalWidth: true }, [
          UI.Row.render([
            UI.Column.render("Mobile A Fourth"),
            UI.Column.render("Mobile A Third"),
            UI.Column.render("Mobile A Second"),
            UI.Column.render("Mobile A First")
          ])
        ]),
      ])),
      code: `UI.Grid.render({ reversedComputer: true, equalWidth: true }, [
          UI.Row.render([
            UI.Column.render("Computer A Fourth"),
            UI.Column.render("Computer A Third"),
            UI.Column.render("Computer A Second"),
            UI.Column.render("Computer A First")
          ]),
          UI.Row.render([
            UI.Column.render("Computer B Fourth"),
            UI.Column.render("Computer B Third"),
            UI.Column.render("Computer B Second"),
            UI.Column.render("Computer B First")
          ]),
        ]),
        UI.Grid.render({ reversedTablet: true, equalWidth: true }, [
          UI.Row.render([
            UI.Column.render("Tablet A Fourth"),
            UI.Column.render("Tablet A Third"),
            UI.Column.render("Tablet A Second"),
            UI.Column.render("Tablet A First")
          ])
        ]),
        UI.Grid.render({ reversedMobile: true, equalWidth: true }, [
          UI.Row.render([
            UI.Column.render("Mobile A Fourth"),
            UI.Column.render("Mobile A Third"),
            UI.Column.render("Mobile A Second"),
            UI.Column.render("Mobile A First")
          ])
        ])`
    });

    let reversedEx2 = Example.run(sources, {
      VNode$: xs.of(UI.Grid.render({ vertReversedComputer: true, equalWidth: true }, [
        UI.Row.render([
          UI.Column.render("Computer Row 4")
        ]),
        UI.Row.render([
          UI.Column.render("Computer Row 3")
        ]),
        UI.Row.render([
          UI.Column.render("Computer Row 2")
        ]),
        UI.Row.render([
          UI.Column.render("Computer Row 1")
        ])
      ])),
      code: `UI.Grid.render({ vertReversedComputer: true, equalWidth: true }, [
        UI.Row.render([
          UI.Column.render("Computer Row 4")
        ]),
        UI.Row.render([
          UI.Column.render("Computer Row 3")
        ]),
        UI.Row.render([
          UI.Column.render("Computer Row 2")
        ]),
        UI.Row.render([
          UI.Column.render("Computer Row 1")
        ])
      ])`
    });

    let reversedEx3 = Example.run(sources, {
      VNode$: xs.of(UI.Grid.render({ vertReversedTablet: true, equalWidth: true }, [
        UI.Row.render([
          UI.Column.render("Tablet Row 4")
        ]),
        UI.Row.render([
          UI.Column.render("Tablet Row 3")
        ]),
        UI.Row.render([
          UI.Column.render("Tablet Row 2")
        ]),
        UI.Row.render([
          UI.Column.render("Tablet Row 1")
        ])
      ])),
      code: `UI.Grid.render({ vertReversedTablet: true, equalWidth: true }, [
        UI.Row.render([
          UI.Column.render("Tablet Row 4")
        ]),
        UI.Row.render([
          UI.Column.render("Tablet Row 3")
        ]),
        UI.Row.render([
          UI.Column.render("Tablet Row 2")
        ]),
        UI.Row.render([
          UI.Column.render("Tablet Row 1")
        ])
      ])`
    });

    let reversedEx4 = Example.run(sources, {
      VNode$: xs.of(UI.Grid.render({ vertReversedMobile: true, equalWidth: true }, [
        UI.Row.render([
          UI.Column.render("Mobile Row 4")
        ]),
        UI.Row.render([
          UI.Column.render("Mobile Row 3")
        ]),
        UI.Row.render([
          UI.Column.render("Mobile Row 2")
        ]),
        UI.Row.render([
          UI.Column.render("Mobile Row 1")
        ])
      ])),
      code: `UI.Grid.render({ vertReversedMobile: true, equalWidth: true }, [
        UI.Row.render([
          UI.Column.render("Mobile Row 4")
        ]),
        UI.Row.render([
          UI.Column.render("Mobile Row 3")
        ]),
        UI.Row.render([
          UI.Column.render("Mobile Row 2")
        ]),
        UI.Row.render([
          UI.Column.render("Mobile Row 1")
        ])
      ])`
    });

    return [reversedEx.DOM, reversedEx2.DOM, reversedEx3.DOM, reversedEx4.DOM];
  }
  function createDeviceVisiblityExamples(sources): Stream<VNode>[] {
    let visibilityEx = Example.run(sources, {
      header: "Device Visibility",
      description: [
        p("A columns or row can appear only for a specific device, or screen sizes"),
        UI.Message.render({ color: UI.Color.Info }, {
          body: "See container documentation for information on breakpoint calculations"
        })
      ],
      VNode$: xs.of(UI.Grid.render([
        UI.Row.render({ width: 2, largescreenOnly: true }, [
          UI.Column.render([
            UI.Segment.render("Large Screen")
          ]),
          UI.Column.render([
            UI.Segment.render("Large Screen")
          ])
        ]),
        UI.Row.render({ width: 2, mobileOnly: true }, [
          UI.Column.render([
            UI.Segment.render("Mobile")
          ]),
          UI.Column.render([
            UI.Segment.render("Mobile")
          ])
        ]),
        UI.Row.render({ width: 3 }, [
          UI.Column.render({ computerOnly: true }, [
            UI.Segment.render("Computer")
          ]),
          UI.Column.render({ mobileOnly: true }, [
            UI.Segment.render("Tablet and Mobile")
          ]),
          UI.Column.render([
            UI.Segment.render("All Sizes")
          ]),
          UI.Column.render([
            UI.Segment.render("All Sizes")
          ])
        ]),
        UI.Row.render({ width: 4, computerOnly: true }, [
          UI.Column.render([
            UI.Segment.render("Computer")
          ]),
          UI.Column.render([
            UI.Segment.render("Computer")
          ]),
          UI.Column.render([
            UI.Segment.render("Computer")
          ]),
          UI.Column.render([
            UI.Segment.render("Computer")
          ])
        ]),
        UI.Row.render({ width: 3, tabletOnly: true }, [
          UI.Column.render([
            UI.Segment.render("Tablet")
          ]),
          UI.Column.render([
            UI.Segment.render("Tablet")
          ]),
          UI.Column.render([
            UI.Segment.render("Tablet")
          ])
        ]),
      ])),
      code: `UI.Grid.render([
        UI.Row.render({ width: 2, largescreenOnly: true }, [
          UI.Column.render([
            UI.Segment.render("Large Screen")
          ]),
          UI.Column.render([
            UI.Segment.render("Large Screen")
          ])
        ]),
        UI.Row.render({ width: 2, mobileOnly: true }, [
          UI.Column.render([
            UI.Segment.render("Mobile")
          ]),
          UI.Column.render([
            UI.Segment.render("Mobile")
          ])
        ]),
        UI.Row.render({ width: 3 }, [
          UI.Column.render({ computerOnly: true }, [
            UI.Segment.render("Computer")
          ]),
          UI.Column.render({ mobileOnly: true }, [
            UI.Segment.render("Tablet and Mobile")
          ]),
          UI.Column.render([
            UI.Segment.render("All Sizes")
          ]),
          UI.Column.render([
            UI.Segment.render("All Sizes")
          ])
        ]),
        UI.Row.render({ width: 4, computerOnly: true }, [
          UI.Column.render([
            UI.Segment.render("Computer")
          ]),
          UI.Column.render([
            UI.Segment.render("Computer")
          ]),
          UI.Column.render([
            UI.Segment.render("Computer")
          ]),
          UI.Column.render([
            UI.Segment.render("Computer")
          ])
        ]),
        UI.Row.render({ width: 3, tabletOnly: true }, [
          UI.Column.render([
            UI.Segment.render("Tablet")
          ]),
          UI.Column.render([
            UI.Segment.render("Tablet")
          ]),
          UI.Column.render([
            UI.Segment.render("Tablet")
          ])
        ]),
      ])`
    });

    return [visibilityEx.DOM];
  }
  function createResponsiveWithExamples(sources): Stream<VNode>[] {
    let widthEx = Example.run(sources, {
      header: "Responsive Width",
      description: [
        p("A column can specify a width for a specific device"),
        UI.Message.render({ color: UI.Color.Info }, {
          body: "It's recommended to use a responsive pattern like doubling or stackable to reduce complexity when designing responsively, however in some circumstances specifying exact widths for screen sizes may be necessary."
        })
      ],
      VNode$: xs.of(UI.Grid.render([
        UI.Column.render({ mobile: 16, tablet: 8, computer: 4 }, [
          p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
        ]),
        UI.Column.render({ mobile: 16, tablet: 8, computer: 4 }, [
          p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
        ]),
        UI.Column.render({ mobile: 16, tablet: 8, computer: 4 }, [
          p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
        ]),
        UI.Column.render({ mobile: 16, tablet: 8, computer: 4 }, [
          p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
        ]),
        UI.Column.render({ mobile: 16, tablet: 8, computer: 4 }, [
          p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
        ]),
      ])),
      code: `UI.Grid.render([
        UI.Column.render({mobile: 16, tablet: 8, computer: 4}),
        UI.Column.render({mobile: 16, tablet: 8, computer: 4}),
        UI.Column.render({mobile: 16, tablet: 8, computer: 4}),
        UI.Column.render({mobile: 16, tablet: 8, computer: 4}),
        UI.Column.render({mobile: 16, tablet: 8, computer: 4})
      ])`
    });

    let widthEx2 = Example.run(sources, {
      VNode$: xs.of(UI.Grid.render([
        UI.Column.render({ width: 4, largescreen: 2 }, [
          p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
        ]),
        UI.Column.render({ width: 4, largescreen: 2 }, [
          p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
        ]),
        UI.Column.render({ width: 4, largescreen: 2 }, [
          p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
        ]),
        UI.Column.render({ width: 4, largescreen: 2 }, [
          p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
        ]),
      ])),
      code: `UI.Grid.render([
        UI.Column.render({width: 4, largescreen: 2}),
        UI.Column.render({width: 4, largescreen: 2}),
        UI.Column.render({width: 4, largescreen: 2}),
        UI.Column.render({width: 4, largescreen: 2}),
      ])`
    });

    return [widthEx.DOM, widthEx2.DOM];
  }
}
