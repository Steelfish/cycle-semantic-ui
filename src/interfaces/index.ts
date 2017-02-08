import {DOMSource} from "@cycle/dom";
export {DOMSource} from "@cycle/dom";
import {VNode} from "@cycle/dom";
export {VNode} from "@cycle/dom";
import xs, {Stream} from "xstream";

export type DOMContent = String | VNode[];
export type EventSelector = (type:string) => Stream<Event>;

export function isDOMContent(content) : content is DOMContent {
  if (!content){
    return false;
  }
  if (typeof(content) === "string"){
    return true;
  }
  if (content instanceof(Array)) {
    if (content.length === 0){
      return true;
    }
    else {
      return content[0].sel !== undefined;
    };
  }
  return false;
}

export interface IInteractiveComponentSources<P,C> {
  DOM: DOMSource;
  props$?: xs<P>;
  content$?: xs<C>;
}

export interface IInteractiveExtraComponentSources<P,C,E> {
  DOM: DOMSource;
  props$?: xs<P>;
  content$?: xs<C>;
  extras$?: xs<E>;
}

export interface ITargettingComponentSources<T,A,C> {
  DOM: DOMSource;
  target$: xs<T>;
  args$?: xs<A>;
  content$?: xs<C>;
}

export interface IInteractiveComponentSinks {
  DOM: xs<VNode>;
  Events: EventSelector;
}

export interface IValueComponentSinks<V> extends IInteractiveComponentSinks {
  value$: xs<V>;
}
