import { run } from "@cycle/xstream-run";
import { makeDOMDriver, div } from "@cycle/dom";
import { makeHistoryDriver, captureClicks } from "@cycle/history";
import xs from "xstream";

import Router from "./router";
import routes from "./routes";
import {Layout} from "./layout";
function app(drivers) {
  const page = Router(Object.assign({}, drivers, {routes}));
  const layout = Layout.run(drivers, page);
  const sinks = {
    DOM: layout.DOM.map(layout => div("#app.app", layout)),
    router: xs.merge(page.router, layout.router),
  };
  return sinks;
}

run(app, {
  DOM: makeDOMDriver(".app"),
  router: captureClicks(makeHistoryDriver())
});
