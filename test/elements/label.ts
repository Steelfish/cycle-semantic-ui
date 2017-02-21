import * as assert from "assert";
import { Label } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Label", function () {
  describe("render", function () {
    it("should return a basic label when called without any arguments", function () {
      let label = Label.render();
      assert.equal(label.data.props.className, "ui label");
      assert.equal(label.children.length, 0);
    });
    it("should support argument syntax", function () {
      let label = Label.render({ floating: true }, ["Content"]);
      assert.equal(label.children.length, 1);
      assert.equal(label.data.props.className, "ui floating label");
      assert.equal((label.children[0] as VNode).text, "Content");
      label = Label.render(["Content"]);
      assert.equal(label.children.length, 1);
      assert.equal(label.data.props.className, "ui label");
      assert.equal((label.children[0] as VNode).text, "Content");
      label = Label.render({ floating: true });
      assert.equal(label.children.length, 0);
      assert.equal(label.data.props.className, "ui floating label");
    });
    it("should support verbose argument object syntax", function () {
      let label = Label.render({
        props: { floating: true },
        content: {
          main: "Content",
          detail: "Hidden"
        }
      });
      assert.equal(label.children.length, 2);
      assert.equal(label.data.props.className, "ui floating label");
      assert.equal((label.children[0] as VNode).text, "Content");
      assert.equal((label.children[1] as VNode).text, "Hidden");
      label = Label.render({
        content: {
          main: "Content",
          detail: "Hidden"
        }
      });
      assert.equal(label.children.length, 2);
      assert.equal(label.data.props.className, "ui label");
      assert.equal((label.children[0] as VNode).text, "Content");
      assert.equal((label.children[1] as VNode).text, "Hidden");
      label = Label.render({
        content: {
          detail: "Hidden"
        }
      });
      assert.equal(label.children.length, 1);
      assert.equal((label.children[0] as VNode).text, "Hidden");
      label = Label.render({
        props: { floating: true }
      });
      assert.equal(label.children.length, 0);
      assert.equal(label.data.props.className, "ui floating label");
    });
    it("should support shorthand argument object syntax", function () {
      let label = Label.render({
        props: { floating: true },
        content: ["Content"]
      });
      assert.equal(label.children.length, 1);
      assert.equal(label.data.props.className, "ui floating label");
      assert.equal((label.children[0] as VNode).text, "Content");
      label = Label.render({
        content: ["Content"]
      });
      assert.equal(label.children.length, 1);
      assert.equal(label.data.props.className, "ui label");
      assert.equal((label.children[0] as VNode).text, "Content");
      label = Label.render({
        props: { floating: true }
      });
      assert.equal(label.children.length, 0);
      assert.equal(label.data.props.className, "ui floating label");
    });
    it("should support the circular variation", function () {
      let label = Label.render({ circular: true });
      assert.equal(label.data.props.className, "ui circular label");
    });
    it("should support the empty variation", function () {
      let label = Label.render({ empty: true });
      assert.equal(label.data.props.className, "ui empty label");
    });
    it("should support the pointing variation", function () {
      let label = Label.render({ pointing: true });
      assert.equal(label.data.props.className, "ui pointing label");
    });
    it("should support the left pointing variation", function () {
      let label = Label.render({ leftPointing: true });
      assert.equal(label.data.props.className, "ui left pointing label");
    });
    it("should support the right pointing variation", function () {
      let label = Label.render({ rightPointing: true });
      assert.equal(label.data.props.className, "ui right pointing label");
    });
    it("should support the basic variation", function () {
      let label = Label.render({ basic: true });
      assert.equal(label.data.props.className, "ui basic label");
    });
    it("should support the left corner variation", function () {
      let label = Label.render({ leftCorner: true });
      assert.equal(label.data.props.className, "ui left corner label");
    });
    it("should support the right corner variation", function () {
      let label = Label.render({ rightCorner: true });
      assert.equal(label.data.props.className, "ui right corner label");
    });
    it("should support the tag variation", function () {
      let label = Label.render({ tag: true });
      assert.equal(label.data.props.className, "ui tag label");
    });
    it("should support the ribbon variation", function () {
      let label = Label.render({ ribbon: true });
      assert.equal(label.data.props.className, "ui ribbon label");
    });
    it("should support the inverse ribbon variation", function () {
      let label = Label.render({ rightRibbon: true });
      assert.equal(label.data.props.className, "ui right ribbon label");
    });
    it("should support the horizontal variation", function () {
      let label = Label.render({ horizontal: true });
      assert.equal(label.data.props.className, "ui horizontal label");
    });
    it("should support the floating variation", function () {
      let label = Label.render({ floating: true });
      assert.equal(label.data.props.className, "ui floating label");
    });
    it("should support the size enum", function () {
      let label = Label.render({ size: "massive" });
      assert.equal(label.data.props.className, "ui massive label");
    });
    it("should support the color enum", function () {
      let label = Label.render({ color: "primary" });
      assert.equal(label.data.props.className, "ui primaryColored label");
    });
    it("should support the attachment enum", function () {
      let label = Label.render({ attachment: "top" });
      assert.equal(label.data.props.className, "ui top attached label");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource(xsAdapter, {
      ".___label": {
        ".label": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a label stream", function (done) {
      let label = Label.run({ DOM: dom });
      label.DOM.addListener({
        next: (x) => {
          assert.equal("ui label", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let label = Label.run({ DOM: dom }, "label");
      label.DOM.addListener({
        next: (x) => {
          assert.equal("div.___label", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let label = Label.run({ DOM: dom }, "label");
      label.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
