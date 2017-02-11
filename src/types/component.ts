import {DOMSource, VNode} from "@cycle/dom";
import {Stream} from "xstream";

export interface ContentObj<C> {
  main?: C;
}

export interface ComponentSources<S,C> {
  DOM: DOMSource;
  style$?: Stream<S>;
  content$?: Stream<C>;
}

export interface ComponentSinks {
  DOM: Stream<VNode>;
  events: EventSelector;
}

export type EventSelector = (type:string) => Stream<Event>;
