import * as assert from "assert";
import { Segment } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Segment", function () {
  describe("render", function () {
    it("should return a basic segment when called without any arguments", function () {
      let segment = Segment.render();
      assert.equal(segment.data.props.className, "ui segment");
      assert.equal(segment.children.length, 0);
    });
    it("should support argument syntax", function () {
      let segment = Segment.render({ loading: true }, ["Content"]);
      assert.equal(segment.children.length, 1);
      assert.equal(segment.data.props.className, "ui loading segment");
      assert.equal((segment.children[0] as VNode).text, "Content");
      segment = Segment.render(["Content"]);
      assert.equal(segment.children.length, 1);
      assert.equal(segment.data.props.className, "ui segment");
      assert.equal((segment.children[0] as VNode).text, "Content");
      segment = Segment.render({ loading: true });
      assert.equal(segment.children.length, 0);
      assert.equal(segment.data.props.className, "ui loading segment");
    });
    it("should support verbose argument object syntax", function () {
      let segment = Segment.render({
        props: { loading: true },
        content: {
          main: ["Content"]
        }
      });
      assert.equal(segment.children.length, 1);
      assert.equal(segment.data.props.className, "ui loading segment");
      assert.equal((segment.children[0] as VNode).text, "Content");
      segment = Segment.render({
        content: {
          main: ["Content"]
        }
      });
      assert.equal(segment.children.length, 1);
      assert.equal(segment.data.props.className, "ui segment");
      assert.equal((segment.children[0] as VNode).text, "Content");
      segment = Segment.render({
        props: { loading: true }
      });
      assert.equal(segment.children.length, 0);
      assert.equal(segment.data.props.className, "ui loading segment");
    });
    it("should support shorthand argument object syntax", function () {
      let segment = Segment.render({
        props: { loading: true },
        content: ["Content"]
      });
      assert.equal(segment.children.length, 1);
      assert.equal(segment.data.props.className, "ui loading segment");
      assert.equal((segment.children[0] as VNode).text, "Content");
      segment = Segment.render({
        content: ["Content"]
      });
      assert.equal(segment.children.length, 1);
      assert.equal(segment.data.props.className, "ui segment");
      assert.equal((segment.children[0] as VNode).text, "Content");
      segment = Segment.render({
        props: { loading: true }
      });
      assert.equal(segment.children.length, 0);
      assert.equal(segment.data.props.className, "ui loading segment");
    });
    it("should support the raised variation", function () {
      let segment = Segment.render({ raised: true });
      assert.equal(segment.data.props.className, "ui raised segment");
    });
    it("should support the stacked variation", function () {
      let segment = Segment.render({ stacked: true });
      assert.equal(segment.data.props.className, "ui stacked segment");
    });
    it("should support the tall stacked variation", function () {
      let segment = Segment.render({ tallStacked: true });
      assert.equal(segment.data.props.className, "ui tall stacked segment");
    });
    it("should support the piled variation", function () {
      let segment = Segment.render({ piled: true });
      assert.equal(segment.data.props.className, "ui piled segment");
    });
    it("should support the vertical variation", function () {
      let segment = Segment.render({ vertical: true });
      assert.equal(segment.data.props.className, "ui vertical segment");
    });
    it("should support the loading variation", function () {
      let segment = Segment.render({ loading: true });
      assert.equal(segment.data.props.className, "ui loading segment");
    });
    it("should support the inverted variation", function () {
      let segment = Segment.render({ inverted: true });
      assert.equal(segment.data.props.className, "ui inverted segment");
    });
    it("should support the padded variation", function () {
      let segment = Segment.render({ padded: true });
      assert.equal(segment.data.props.className, "ui padded segment");
    });
    it("should support the very padded variation", function () {
      let segment = Segment.render({ veryPadded: true });
      assert.equal(segment.data.props.className, "ui very padded segment");
    });
    it("should support the compact variation", function () {
      let segment = Segment.render({ compact: true });
      assert.equal(segment.data.props.className, "ui compact segment");
    });
    it("should support the circular variation", function () {
      let segment = Segment.render({ circular: true });
      assert.equal(segment.data.props.className, "ui circular segment");
    });
    it("should support the clearing variation", function () {
      let segment = Segment.render({ clearing: true });
      assert.equal(segment.data.props.className, "ui clearing segment");
    });
    it("should support the basic variation", function () {
      let segment = Segment.render({ basic: true });
      assert.equal(segment.data.props.className, "ui basic segment");
    });
    it("should support the color enum", function () {
      let segment = Segment.render({ color: "primary" });
      assert.equal(segment.data.props.className, "ui primaryColored segment");
    });
    it("should support the attachment enum", function () {
      let segment = Segment.render({ attachment: "top" });
      assert.equal(segment.data.props.className, "ui top attached segment");
    });
    it("should support the float enum", function () {
      let segment = Segment.render({ float: "right" });
      assert.equal(segment.data.props.className, "ui right floated segment");
    });
    it("should support the text alignment enum", function () {
      let segment = Segment.render({ textAlignment: "right" });
      assert.equal(segment.data.props.className, "ui right aligned segment");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource(xsAdapter, {
      ".___segment": {
        ".segment": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a segment stream", function (done) {
      let segment = Segment.run({ DOM: dom });
      segment.DOM.addListener({
        next: (x) => {
          assert.equal("ui segment", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let segment = Segment.run({ DOM: dom }, "segment");
      segment.DOM.addListener({
        next: (x) => {
          assert.equal("div.___segment", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let segment = Segment.run({ DOM: dom }, "segment");
      segment.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
