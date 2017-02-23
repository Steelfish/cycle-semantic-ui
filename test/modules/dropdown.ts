import * as assert from "assert";
import { Dropdown } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Dropdown", function () {
  describe("run", function () {
    let clickEvt = {
      srcElement: {
        classList: {
          contains: (x) => false
        }
      }
    };
    let dom = mockDOMSource(xsAdapter, {
      ".___dropdown": {
        ".dropdown": {
          "click": xs.of(clickEvt)
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
      dropdown.DOM.addListener({
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
  });
});
