import * as assert from "assert";
import { Dimmer } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Dimmer", function () {
  describe("run", function () {
    let dom = mockDOMSource(xsAdapter, {
      ".___dimmer": {
        ".dimmer": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a dimmer stream", function (done) {
      let dimmer = Dimmer.run({ DOM: dom });
      dimmer.DOM.addListener({
        next: (x) => {
          assert.equal(x.data.props.className, "ui dimmer modals page dimmer transition hidden ");
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let dimmer = Dimmer.run({ DOM: dom }, "dimmer");
      dimmer.DOM.addListener({
        next: (x) => {
          assert.equal(x.sel, "div.___dimmer");
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let dimmer = Dimmer.run({ DOM: dom }, "dimmer");
      dimmer.events("click").addListener({
        next: (x) => {
          assert.equal(x, "Clicked");
          done();
        }
      });
    });
    it("should support the inverted variation", function (done) {
      
    });
  });
});
