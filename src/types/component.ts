import {DOMSource, VNode} from "@cycle/dom";
import {Stream} from "xstream";

export interface StyleAndContentArgs<P,B,C extends ContentObj<B>> {
  props?: Partial<P>;
  content?: Partial<C>|B;
}

export interface ContentObj<C> {
  main: C;
}

export interface ComponentSources<P,B,C extends ContentObj<B>> {
  DOM: DOMSource;
  props$?: Stream<Partial<P>>;
  content$?: Stream<Partial<C>|B>;
}

export interface ComponentSinks {
  DOM: Stream<VNode>;
  events: EventSelector;
}

export interface ValueComponentSinks<V> extends ComponentSinks {
  value$: Stream<V>;
}

export type EventSelector = (type:string) => Stream<Event>;
