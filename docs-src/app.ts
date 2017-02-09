import { run } from "@cycle/xstream-run";
import { makeDOMDriver } from "@cycle/dom";
import { makeRouterDriver, supportsHistory } from "cyclic-router";
import { createHashHistory, createHistory } from "history";
import xs from "xstream";
import switchPath from "switch-path";

import Router from "./router";
import routes from "./routes";
import {Layout} from "./layout";

const history = supportsHistory()
  ? [createHistory(), switchPath, {capture: true}]
  : [createHashHistory(), switchPath, {capture: true}];

function app(drivers) {
  const page = Router(Object.assign({}, drivers, {routes}));
  const layout = Layout.run(drivers, page);
  const sinks = {
    DOM: layout.DOM,
    router: xs.merge(page.router, layout.router),
  };
  return sinks;
}

run(app, {
  DOM: makeDOMDriver(".app"),
  router: makeRouterDriver.apply(null, history),
});
