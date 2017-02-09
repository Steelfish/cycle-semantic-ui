// tslint:disable-next-line:no-unused-variable
import xs, { Stream } from "xstream";
// tslint:disable-next-line:no-unused-variable
import { div, VNode } from "@cycle/dom";
import { Sidebar } from "./sidebar";

export namespace Layout {
  export function run(sources: any, page: any) {

    /*** Create components ***/
    let sidebar = Sidebar.run(sources);
    /*** Compose view ***/
    const vTree$ = xs.combine(sidebar.DOM, page.DOM,)
      .map(([sidebar, page]) =>
        div(".full.height", [
          div(".content.pusher", [
            sidebar,
            page
          ]),
        ])
      );
    return {
      DOM: vTree$,
      router: page.router
    };
  }
}
