import isolate from "@cycle/isolate";
import xs, {Stream} from "xstream";
import {DOMSource} from "@cycle/dom";

interface ComponentRouterSources {
  routes: any;
  router: any;
  DOM: DOMSource;
}

const callPage = function (sources: ComponentRouterSources) {
  return ({path, value}) => {
    const pSources = Object.assign({}, sources, {router: sources.router.path(path)});
    const isolatedPage = isolate(value)(pSources) as any;
    return isolatedPage;
  };
};

function propOrNever(key: string, x: Object) {
  if (x.hasOwnProperty(key)){
    return x[key];
  }
  return xs.never();
}

function flattenByKey(key: string, stream: Stream<any>) {
    return stream.map(x => propOrNever(key, x)).flatten();
}

function ComponentRouter (sources: ComponentRouterSources) {
  const component$ = sources.router.define(sources.routes)
    .map(route => callPage(sources)(route))
    .remember()
    .debug(() => {}); //State$ does not work without this line. Unable to reproduce in webpackbin.
  const pluck = key => flattenByKey(key, component$);
  const sinks = {
    pluck: pluck,
    DOM: pluck("DOM"),
    router: pluck("router"),
  };
  return sinks;
}

export default sources => isolate(ComponentRouter)(sources);
