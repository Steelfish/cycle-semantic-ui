import {DOMSource, VNode} from "@cycle/dom";
import {Stream} from "xstream";

export interface StyleAndContentArgs<S,B,C extends ContentObj<B>> {
  style?: Partial<S>;
  content?: Partial<C>|B;
}

export interface ContentObj<C> {
  main: C;
}

export interface ComponentSources<S,B,C extends ContentObj<B>> {
  DOM: DOMSource;
  style$?: Stream<Partial<S>>;
  content$?: Stream<Partial<C>|B>;
}

export interface ComponentSinks {
  DOM: Stream<VNode>;
  events: EventSelector;
}

export type EventSelector = (type:string) => Stream<Event>;
