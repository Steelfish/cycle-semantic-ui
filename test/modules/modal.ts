import * as assert from "assert";
import { Modal } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Modal", function () {
  describe("run", function () {
    let dom = mockDOMSource(xsAdapter, {
      ".___modal": {
        ".modal": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a modal stream", function (done) {
      let modal = Modal.run({ DOM: dom });
      modal.DOM.addListener({
        next: (x) => {
          assert.equal(x.data.props.className, "ui dimmer modals page dimmer transition visible active");
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let modal = Modal.run({ DOM: dom }, "modal");
      modal.DOM.addListener({
        next: (x) => {
          assert.equal(x.sel, "div.___modal");
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let modal = Modal.run({ DOM: dom }, "modal");
      modal.events("click").addListener({
        next: (x) => {
          assert.equal(x, "Clicked");
          done();
        }
      });
    });
  });
});
