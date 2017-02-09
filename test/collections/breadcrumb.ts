import * as assert from "assert";
import { Breadcrumb } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Breadcrumb", function () {
  describe("render", function () {
    it("should return a basic breadcrumb when called without any arguments", function () {
      let breadcrumb = Breadcrumb.render();
      assert.equal("ui breadcrumb", breadcrumb.data.props.className);
      assert.equal(0, breadcrumb.children.length);
    });
    it("should have only one section when given only 1 child", function () {
      let breadcrumb = Breadcrumb.render([{ text: "Hello" }]);
      assert.equal(1, breadcrumb.children.length);
      let child = breadcrumb.children[0] as VNode;
      assert.equal("Hello", child.text);
      assert.equal("section", child.data.props.className);
    });
    it("should seperate multiple children with dividers", function () {
      let breadcrumb = Breadcrumb.render([{ text: "Child 1" }, { text: "Child 2" }, { text: "Child 3" }]);
      assert.equal(5, breadcrumb.children.length);
      let divider = breadcrumb.children[1] as VNode;
      assert.equal("divider", divider.data.props.className);
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
