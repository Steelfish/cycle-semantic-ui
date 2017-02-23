import * as assert from "assert";
import { Popup } from "../../src";
import { mockDOMSource, VNode, div } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Popup", function () {
  describe("run", function () {
    let clickEvt = {
      srcElement: {
        classList: {
          contains: (x) => false
        }
      }
    };
    let dom = mockDOMSource(xsAdapter, {
      ".___popup": {
        ".popup": {
          "click": xs.of(clickEvt)
        }
      }
    });
    it("should return a popup stream", function (done) {
      let popup = Popup.run({ DOM: dom, args: { target$: xs.of(div())} }, "popup");
      popup.DOM.addListener({
        next: (x) => {
          assert.equal(x.data.props.className, "ui bottom left popup transition hidden");
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let popup = Popup.run({ DOM: dom, args: { target$: xs.of(div())} }, "popup");
      popup.DOM.addListener({
        next: (x) => {
          assert.equal(x.sel, "div.___popup");
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let popup = Popup.run({ DOM: dom, args: { target$: xs.of(div())} }, "popup");
      popup.events("click").addListener({
        next: (x) => {
          assert.equal(x, clickEvt);
          done();
        }
      });
    });
  });
});
