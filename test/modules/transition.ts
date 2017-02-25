import * as assert from "assert";
import { Transition, Menu } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Transition", function () {
  describe("run", function () {
    let dom = mockDOMSource({
      ".transition": {
        "click": xs.of("Clicked")
      },
    });
    it("should preserve component isolation", function (done) {
      let menu = Menu.run({ DOM: dom }, "menu");
      let animatedMenu = Transition.run({ DOM: dom, target$: menu.DOM, transition$: xs.of({ animation: "fade", direction: "in" }) });
      animatedMenu.DOM.addListener({
        next: (x) => {
          assert.equal(x.sel, "div.___menu");
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let menu = Menu.run({ DOM: dom }, "menu");
      let animatedMenu = Transition.run({ DOM: dom, target$: menu.DOM, transition$: xs.of({ animation: "fade", direction: "in" }) });
      animatedMenu.events("click").addListener({
        next: (x) => {
          assert.equal(x, "Clicked");
          done();
        }
      });
    });
  });
});
