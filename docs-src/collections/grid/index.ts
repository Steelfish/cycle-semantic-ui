import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { div, VNode } from "@cycle/dom";
import { Overview } from "./overview";
import { Definition } from "./definition";

export namespace Grid {
  export function run(sources) {
    let overview = Overview.run(sources);
    let definition = Definition.run(sources);

    let tabs = UI.Tabs.run({
      DOM: sources.DOM,
      labels: ["Overview", "Definition"],
      content: [overview.map(o => [o]), definition.map(o => [o])],
      menuProps$: xs.of({ equalWidth: true }),
      segmentProps$: xs.of({ basic: true })
    });


    const vTree$ = xs.combine(tabs.DOM).map(
      ([tabs]) =>
        div({ props: { className: "article" } }, [
          UI.Segment.render({ vertical: true }, [
            UI.Container.render([
              UI.Header.render({
                props: { size: UI.Size.Huge },
                content: {
                  main: "Grid",
                  subtext: "A grid is used to harmonize negative space in a layout"
                }
              })
            ])
          ]),
          UI.Container.render([
            UI.Divider.render({ hidden: true }),
            tabs
          ])
        ])
    ) as Stream<VNode>;
    return {
      DOM: vTree$,
      router: xs.never()
    };
  }

}
