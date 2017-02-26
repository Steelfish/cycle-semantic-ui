import isolate from "@cycle/isolate";
import xs, {Stream, MemoryStream} from "xstream";
import {DOMSource} from "@cycle/dom";
import switchPath from "switch-path";

interface ComponentRouterSources {
  routes: any;
  router: MemoryStream<Location>;
  DOM: DOMSource;
}

const callPage = function (sources: ComponentRouterSources) {
  return ({value}) => {
    const isolatedPage = isolate(value)(sources) as any;
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
  
  const component$ = 
  sources.router.map(l => switchPath(l.pathname, sources.routes))
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
