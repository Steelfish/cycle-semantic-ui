import {VNode} from "@cycle/dom";
import xs, {Stream} from "xstream";
import flattenConcurrently from "xstream/extra/flattenConcurrently";

export function patchClassList(target: VNode, classes: string[], classesToAdd: string) {
  let className = "";
  if (target.data) {
    let props = target.data.props ? target.data.props : { className: target.sel.split(".").join(" ")};
    let classList = props.className.split(" ") as Array<string>;
    classList.forEach(item => {
      if (classes.indexOf(item) === -1) {
        className += item + " ";
      }
    });
  }
  className += classesToAdd;
  return Object.assign({}, target.data, {
    "props": {
      className
    }
  });
}

/**
 * Adds one VNode to another and handles updates for stream by replacing based on the identifier class.
 * @param  {VNode}  element    The element to be added.
 * @param  {VNode}  target     The target for the element
 * @param  {string} identifier The identifying class for the element to be added.
 * @return {Array} The target element's children with the element added.
 */
export function addElement(element: VNode, target: VNode, identifier: string): Array<VNode> {
  let c = [];
  if (target.children) {
    c = target.children;
  }
  if (target.text) {
    c.push(target.text);
  }
  for(let i = 0; i < c.length; i++) {
    let child = c[i];
    let cProps = child.data ? child.data.props ? child.data.props : {} : {};
    if (typeof(child) !== "undefined" && typeof(cProps.className) !== "undefined")
    {
      let classList = child.data.props.className.split(" ") as Array<string>;
      for (let s of classList) {
        if (s === identifier)
        {
          c.splice(i, 1);
        }
      }
    }
  }
  c.push(element);
  return c;
}

/**
 * Converts anything to a stream
 * @param  {any} obj - The object.
 * @return {Stream<any>} The object as a stream.
 */
export function asStream(obj): Stream<any> {
  if (typeof(obj) !== "undefined") {
    if (typeof(obj.addListener) === "function") {
      return obj;
    }
    if (Object.prototype.toString.call(obj) === "[object Array]"){
        let isStreams = true;
        for (let subobj of obj) {
          if (typeof(subobj.addListener) !== "function"){
            isStreams = false;
          }
        }
        if (isStreams) {
          return xs.combine.apply(this, obj);
        }
    }
    return xs.of(obj);
  }
  return xs.of("");
}

/**
 * Converts a number of objects to a stream of an Array.
 * @param  {any} ...objs   The objects to include in the stream
 * @return {Stream<any[]>} The objects as a stream of an array.
 */
export function asArrayStream(...objs) : Stream<any[]> {
  let streams = Array.from(arguments);
  streams = streams.map(obj => asStream(obj));
  return xs.combine.apply(this, streams);
}

/**
 * Flattens a stream of an array of streams into a stream of an array.
 * @param  {Stream<Stream<any>[]>} stream The stream to flatten
 * @return {Stream<any[]>}                The flattened stream.
 */
export function flattenStreamArray(stream: Stream<Stream<any>[]>) : Stream<any[]> {
  return flattenConcurrently(
    stream.map(children => xs.combine.apply(this, children)
  )
  ) as Stream<any[]>;
}

/**
 * Converts a natural number between 1-16 to text.
 * @param  {number} num The number to convert.
 * @return {string}     That number as text.
 */
export function numToText(num: number) : string {
  switch(num) {
    case 1: return " one";
    case 2: return " two";
    case 3: return " three";
    case 4: return " four";
    case 5: return " five";
    case 6: return " six";
    case 7: return " seven";
    case 8: return " eight";
    case 9: return " nine";
    case 10: return " ten";
    case 11: return " eleven";
    case 12: return " twelve";
    case 13: return " thirteen";
    case 14: return " fourteen";
    case 15: return " fifteen";
    case 16: return " sixteen";
  }
}
