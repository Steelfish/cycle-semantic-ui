import * as assert from "assert";
import { Tabs } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Tabs", function () {
  describe("run", function () {
    let dom = mockDOMSource({});
    it("should wrap the content $s in a segment and add a menu", function (done) {
      let labels =  ["Tab1", "Tab2"];
      let tabs = Tabs.run({ DOM: dom, content: [xs.of("Tab1"), xs.of("Tab2")], labels });
      tabs.DOM.addListener({
        next: (x) => {
          let menu = x.children[0] as VNode;
          let segment = x.children[1] as VNode;
          assert.equal(menu.data.props.className, "ui tabular top attached menu");
          menu.children.map((c,i) => {
            assert.equal((c as VNode).text, labels[i]);
          });
          assert.equal(segment.data.props.className, "ui bottom attached segment");
          done();
        }
      });
    });
    it("should allow you to set the menu and segment properties", function (done) {
      let tabs = Tabs.run({ 
        DOM: dom, 
        content: [xs.of("Tab1"), xs.of("Tab2")], 
        labels: ["Tab1", "Tab2"],
        menuProps$: xs.of({equalWidth: true}),
        segmentProps$: xs.of({basic: true})
      });
      tabs.DOM.addListener({
        next: (x) => {
          let menu = x.children[0] as VNode;
          let segment = x.children[1] as VNode;
          assert.equal(menu.data.props.className, "ui two item menu");
          assert.equal(segment.data.props.className, "ui basic segment");
          done();
        }
      });
    });
    it("should return a stream of the current active tab", function (done) {
      let tabs = Tabs.run({ DOM: dom, content: [xs.of("Tab1"), xs.of("Tab2")], labels: ["Tab1", "Tab2"] });
      tabs.active$.addListener({
        next: (x) => {
          assert.equal(x, "Tab1");
          done();
        }
      });
    });
    it("should allow you to set the current active tab", function (done) {
      let tabs = Tabs.run({ DOM: dom, content: [xs.of("Tab1"), xs.of("Tab2")], labels: ["Tab1", "Tab2"], active: "Tab2" });
      tabs.active$.addListener({
        next: (x) => {
          assert.equal(x, "Tab2");
          done();
        }
      });
    });
  });
});
