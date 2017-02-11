import * as assert from "assert";
import { Breadcrumb, Icon, IconType } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Breadcrumb", function () {
  describe("render", function () {
    it("should return a basic breadcrumb when called without any arguments", function () {
      let breadcrumb = Breadcrumb.render();
      assert.equal(breadcrumb.data.props.className, "ui breadcrumb");
      assert.equal(breadcrumb.children.length, 0);
    });
    it("should support argument syntax", function () {
      assert.doesNotThrow(() => Breadcrumb.render({ divider: "|" }, [{ text: "Hello" }]));
    });
    it("should support verbose argument object syntax", function () {
      assert.doesNotThrow(() => Breadcrumb.render({
        style: { divider: "|" },
        content: {
          main: [{ text: "Hello" }]
        }
      }));
    });
    it("should support shorthand argument object syntax", function () {
      assert.doesNotThrow(() => Breadcrumb.render({
        style: { divider: "|" },
        content: [{ text: "Hello" }]
      }));
    });
    it("should have only one section when given only 1 child", function () {
      let breadcrumb = Breadcrumb.render([{ text: "Hello" }]);
      assert.equal(breadcrumb.children.length, 1);
      let child = breadcrumb.children[0] as VNode;
      assert.equal(child.text, "Hello");
      assert.equal(child.data.props.className, "section");
    });
    it("should seperate multiple children with dividers", function () {
      let breadcrumb = Breadcrumb.render([{ text: "Child 1" }, { text: "Child 2" }, { text: "Child 3" }]);
      assert.equal(breadcrumb.children.length, 5);
      let divider = breadcrumb.children[1] as VNode;
      assert.equal(divider.data.props.className, "divider");
    });
    it("should allow for icon and string dividers", function () {
      let breadcrumb = Breadcrumb.render({ divider: "|" }, [
        { text: "Child1" }, { text: "Child2" }
      ]);
      let divider = breadcrumb.children[1] as VNode;
      assert.equal(divider.text, "|");
      breadcrumb = Breadcrumb.render({ divider: Icon.render(IconType.AngleRight) }, [
        { text: "Child1" }, { text: "Child2" }
      ]);
      divider = breadcrumb.children[1] as VNode;
      assert.equal(divider.data.props.className, "ui angle right icon divider");
    });
    it("should support the size enum", function () {
      let breadcrumb = Breadcrumb.render({size: "massive"});
      assert.equal(breadcrumb.data.props.className, "ui massive breadcrumb");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource(xsAdapter, {
      ".___cycle2": {
        ".breadcrumb": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a breadcrumb stream", function (done) {
      let breadcrumb = Breadcrumb.run({
        DOM: dom
      });
      breadcrumb.DOM.addListener({
        next: (x) => {
          assert.equal("div.___cycle1", x.sel);
          assert.equal("ui breadcrumb", x.data.props.className);
          done();
        }
      });
    });
    it("should expose events through the Events function", function (done) {
      let breadcrumb = Breadcrumb.run({
        DOM: dom
      });
      breadcrumb.Events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
