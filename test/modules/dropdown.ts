import * as assert from "assert";
import { Dropdown } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";
import delay from "xstream/extra/delay";

describe("Dropdown", function () {
  describe("run", function () {
    let clickEvt = {
      srcElement: {
        classList: {
          contains: (x) => false
        }
      }
    };
    let dom = mockDOMSource({
      ".___dropdown": {
        ".dropdown": {
          "click": xs.of(clickEvt)
        },
        "input": {
          "keyup": xs.of({target: {value: "1"}}).compose(delay(0))
        }
      }
    });
    it("should return a dropdown stream", function (done) {
      let dropdown = Dropdown.run({ DOM: dom });
      dropdown.DOM.addListener({
        next: (x) => {
          assert.equal(x.data.props.className, "ui dropdown");
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let dropdown = Dropdown.run({ DOM: dom }, "dropdown");
      dropdown.DOM.take(1).addListener({
        next: (x) => {
          assert.equal(x.sel, "div.___dropdown");
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let dropdown = Dropdown.run({ DOM: dom }, "dropdown");
      dropdown.events("click").addListener({
        next: (x) => {
          assert.equal(x, clickEvt);
          done();
        }
      });
    });
    it("should support filtering content with the search argument", function (done) {
      let dropdown = Dropdown.run({ DOM: dom, props$: xs.of({initial: "1"}), content$: xs.of([{main: "1", value: "1"}, {main: "2"}, {main: "3"}]), args: { search: true} }, "dropdown");
      dropdown.DOM.drop(3).take(1).addListener({
        next: (x) => {
          let text = x.children[1] as VNode;
          let input = x.children[0] as VNode;
          let menu = x.children[3] as VNode;

          assert.equal(menu.children.length, 1);
          assert.equal(text.data.props.className, "filtered text");
          assert.equal(input.data.props.value, "1");
          done();
        }
      });
    });
  });
});
