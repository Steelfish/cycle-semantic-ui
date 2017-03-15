import * as assert from "assert";
import { Transition, Menu } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Transition", function () {
  describe("run", function () {
    let dom = mockDOMSource({
      ".___transition": {
        ".transition": {
          "click": xs.of("Clicked")
        },
      }
    });
    it("should return an isolated component", function (done) {
      let menu = Menu.run({ DOM: dom }, "transition");
      let animatedMenu = Transition.run({ DOM: dom, target$: menu.DOM, transition$: xs.of({ animation: "fade", direction: "in" }) }, "transition");
      animatedMenu.DOM.addListener({
        next: (x) => {
          assert.equal(x.sel, "div.___transition");
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let menu = Menu.run({ DOM: dom }, "menu");
      let animatedMenu = Transition.run({ DOM: dom, target$: menu.DOM, transition$: xs.of({ animation: "fade", direction: "in" }) }, "transition");
      animatedMenu.events("click").addListener({
        next: (x) => {
          assert.equal(x, "Clicked");
          done();
        }
      });
    });
  });
});
