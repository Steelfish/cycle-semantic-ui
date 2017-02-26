import * as UI from "../ui";
import xs from "xstream";
// tslint:disable-next-line:no-unused-variable
import { div, VNode } from "@cycle/dom";

export namespace Index {
  export function run(sources) {
    const vTree$ = xs.of(
      div(".centered", [
        UI.Container.render([
          UI.Grid.render({ centered: true }, [
            UI.Row.render([
              UI.Header.render({
                props: { size: UI.Size.Huge },
                content: {
                  main: "Welcome.",
                  subtext: "At the moment the docs are a WIP. Planned pages are scaffolded in the sidemenu."
                }
              }),
            ])
          ])
        ])
      ])
    );
    return {
      DOM: vTree$,
      router: xs.never()
    };
  }
}
