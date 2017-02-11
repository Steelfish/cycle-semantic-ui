import * as UI from "../ui";
import xs from "xstream";
// tslint:disable-next-line:no-unused-variable
import { div, VNode } from "@cycle/dom";

export namespace Index {
  export function run(sources) {
    const vTree$ = xs.of(
      UI.Container.render([
        UI.Grid.render([
          UI.Row.render([
            UI.Header.render({ size: UI.Size.Huge }, "Breadcrumb", {
            }),
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
