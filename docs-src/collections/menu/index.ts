import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { div, VNode } from "@cycle/dom";
import { Types } from "./types";
import { Content } from "./content";
import { States } from "./states";
import { Variations } from "./variations";

export namespace Menu {
  export function run(sources) {
    let types = Types.run(sources);
    let content = Content.run(sources);
    let states = States.run(sources);
    let variations = Variations.run(sources);

    const vTree$ = xs.combine(types, content, states, variations).map(
      ([types, content, states, variations]) =>
        div({ props: { className: "article" } }, [
          UI.Segment.render({ vertical: true }, [
            UI.Container.render([
              UI.Header.render({
                props: { size: UI.Size.Huge },
                content: {
                  main: "Menu",
                  subtext: "A menu displays grouped navigation actions"
                }
              }),
            ]),
          ]),
          UI.Container.render([
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Types")]
              .concat(types)
            ),
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Content")]
              .concat(content)
            ),
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "States")]
              .concat(states)
            ),
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Variations")]
              .concat(variations)
            ),
          ]),
        ])
    ) as Stream<VNode>;
    return {
      DOM: vTree$,
      router: xs.never()
    };
  }

}
