import * as UI from "../../../ui";
import xs, { Stream } from "xstream";
import { p, VNode } from "@cycle/dom";
import { Example } from "../../../components";

export namespace Rows {
  export function run(sources): Stream<VNode[]> {
    let groupingEx = Example.run(sources, {
      highlighted: true,
      header: "Grouping",
      description: "Row wrappers allow you to apply variations to a group of columns.",
      VNode$: xs.of(UI.Grid.render({ width: 4 }, [
        UI.Row.render({ width: 2 }, [
          UI.Column.render()
        ]),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render()
      ])),
      code: `UI.Grid.render({width: 4}, [
        UI.Row.render({width: 2}, [
          UI.Column.render()
        ]),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render(),
        UI.Column.render()
      ])`
    });

    let clearEx = Example.run(sources, {
      highlighted: true,
      header: "Clearing Content",
      description: "Row wrappers will automatically clear previous columns, making them useful when using floated variations.",
      VNode$: xs.of(UI.Grid.render([
        UI.Row.render({ width: 4 }, [
          UI.Column.render({ float: "left" }),
          UI.Column.render({ float: "right" })
        ]),
        UI.Row.render([
          UI.Column.render({width: 3}),
          UI.Column.render({width: 8}),
          UI.Column.render({width: 5})
        ])
      ])),
      code: `UI.Grid.render([
        UI.Row.render({ width: 4 }, [
          UI.Column.render({ float: "left" }),
          UI.Column.render({ float: "right" })
        ]),
        UI.Row.render([
          UI.Column.render({width: 3}),
          UI.Column.render({width: 8}),
          UI.Column.render({width: 5})
        ])
      ])`
    });

    let specialEx = Example.run(sources, {
      header: "Special Grids",
      description: "Additionally, some types of grids, like divided or celled require row wrappers to apply formatting correctly.",
      VNode$: xs.of(UI.Grid.render({intCelled: true}, [
        UI.Row.render([
          UI.Column.render({width: 3}, [
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render({width: 10}, [
            p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at purus nibh. Cras metus nulla, vestibulum in auctor ac, fermentum vitae tellus. Donec sed aliquam nisl. Sed eu leo id est pretium euismod. Nulla id justo at mi venenatis volutpat. Fusce nisi leo, placerat id condimentum a, accumsan vitae tortor. Nunc magna nunc, venenatis nec elementum eu, ultrices in sem. Maecenas tincidunt semper molestie. Nulla nec neque sit amet libero molestie feugiat. Cras id metus velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis arcu non leo porta ut euismod ante luctus. Praesent elementum sodales dolor id scelerisque.")
          ]),
          UI.Column.render({width: 3}, [
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ]),
        UI.Row.render([
          UI.Column.render({width: 3}, [
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ]),
          UI.Column.render({width: 10}, [
            p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at purus nibh. Cras metus nulla, vestibulum in auctor ac, fermentum vitae tellus. Donec sed aliquam nisl. Sed eu leo id est pretium euismod. Nulla id justo at mi venenatis volutpat. Fusce nisi leo, placerat id condimentum a, accumsan vitae tortor. Nunc magna nunc, venenatis nec elementum eu, ultrices in sem. Maecenas tincidunt semper molestie. Nulla nec neque sit amet libero molestie feugiat. Cras id metus velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis arcu non leo porta ut euismod ante luctus. Praesent elementum sodales dolor id scelerisque.")
          ]),
          UI.Column.render({width: 3}, [
            UI.Image.render({size: UI.Size.Fluid},"https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
          ])
        ])
      ])),
      code: `UI.Grid.render({intCelled: true}, [
        UI.Row.render([
          UI.Column.render({width: 3}),
          UI.Column.render({width: 10}),
          UI.Column.render({width: 3})
        ]),
        UI.Row.render([
          UI.Column.render({width: 3}),
          UI.Column.render({width: 10}),
          UI.Column.render({width: 3})
        ])
      ])`
    });

    return xs.combine(groupingEx.DOM, clearEx.DOM, specialEx.DOM);
  }
}
