import * as assert from "assert";
import { Column } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Column", function () {
  describe("render", function () {
    it("should return a basic column when called without any arguments", function () {
      let column = Column.render();
      assert.equal(column.data.props.className, "ui column");
      assert.equal(column.children.length, 0);
    });
    it("should support argument syntax", function () {
      let column = Column.render({ width: 3 }, ["Content"]);
      assert.equal(column.children.length, 1);
      assert.equal(column.data.props.className, "ui three wide column");
      assert.equal((column.children[0] as VNode).text, "Content");
      column = Column.render(["Content"]);
      assert.equal(column.children.length, 1);
      assert.equal(column.data.props.className, "ui column");
      assert.equal((column.children[0] as VNode).text, "Content");
      column = Column.render({ width: 3 });
      assert.equal(column.children.length, 0);
      assert.equal(column.data.props.className, "ui three wide column");
    });
    it("should support verbose argument object syntax", function () {
      let column = Column.render({
        props: { width: 3 },
        content: {
          main: ["Content"]
        }
      });
      assert.equal(column.children.length, 1);
      assert.equal(column.data.props.className, "ui three wide column");
      assert.equal((column.children[0] as VNode).text, "Content");
      column = Column.render({
        content: {
          main: ["Content"]
        }
      });
      assert.equal(column.children.length, 1);
      assert.equal(column.data.props.className, "ui column");
      assert.equal((column.children[0] as VNode).text, "Content");
      column = Column.render({
        props: { width: 3 }
      });
      assert.equal(column.children.length, 0);
      assert.equal(column.data.props.className, "ui three wide column");
    });
    it("should support shorthand argument object syntax", function () {
      let column = Column.render({
        props: { width: 3 },
        content: ["Content"]
      });
      assert.equal(column.children.length, 1);
      assert.equal(column.data.props.className, "ui three wide column");
      assert.equal((column.children[0] as VNode).text, "Content");
      column = Column.render({
        content: ["Content"]
      });
      assert.equal(column.children.length, 1);
      assert.equal(column.data.props.className, "ui column");
      assert.equal((column.children[0] as VNode).text, "Content");
      column = Column.render({
        props: { width: 3 }
      });
      assert.equal(column.children.length, 0);
      assert.equal(column.data.props.className, "ui three wide column");
    });
    it("should support the width variation", function () {
      let column = Column.render({ width: 8 });
      assert.equal(column.data.props.className, "ui eight wide column");
    });
    it("should support setting the width for mobile", function () {
      let column = Column.render({ mobile: 4 });
      assert.equal(column.data.props.className, "ui four wide mobile column");
    });
    it("should support setting the width for tablets", function () {
      let column = Column.render({ tablet: 5 });
      assert.equal(column.data.props.className, "ui five wide tablet column");
    });
    it("should support setting the width for computer screens", function () {
      let column = Column.render({ computer: 6 });
      assert.equal(column.data.props.className, "ui six wide computer column");
    });
    it("should support setting the width for largescreens", function () {
      let column = Column.render({ largescreen: 12 });
      assert.equal(column.data.props.className, "ui twelve wide largescreen column");
    });
    it("should support the Size enum", function () {
      let column = Column.render({ size: "small" });
      assert.equal(column.data.props.className, "ui small column");
    });
    it("should support the Alignment enum", function () {
      let column = Column.render({ alignment: "top" });
      assert.equal(column.data.props.className, "ui top aligned column");
    });
    it("should support the TextAlignment enum", function () {
      let column = Column.render({ textAlignment: "right" });
      assert.equal(column.data.props.className, "ui right aligned column");
    });
    it("should support the Float enum", function () {
      let column = Column.render({ float: "right" });
      assert.equal(column.data.props.className, "ui right floated column");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource(xsAdapter, {
      ".___column": {
        ".column": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a column stream", function (done) {
      let column = Column.run({ DOM: dom });
      column.DOM.addListener({
        next: (x) => {
          assert.equal("ui column", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let column = Column.run({ DOM: dom }, "column");
      column.DOM.addListener({
        next: (x) => {
          assert.equal("div.___column", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let column = Column.run({ DOM: dom }, "column");
      column.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
