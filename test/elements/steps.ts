import * as assert from "assert";
import { Steps } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Steps", function () {
  describe("render", function () {
    it("should return a basic steps when called without any arguments", function () {
      let steps = Steps.render();
      assert.equal(steps.data.props.className, "ui steps");
      assert.equal(steps.children.length, 0);
    });
    it("should support argument syntax", function () {
      let steps = Steps.render({ vertical: true }, [{ icon: "Content" }]);
      assert.equal(steps.children.length, 1);
      assert.equal(steps.data.props.className, "ui vertical steps");
      assert.equal(((steps.children[0] as VNode).children[0] as VNode).text, "Content");
      steps = Steps.render([{icon: "Content"}]);
      assert.equal(steps.children.length, 1);
      assert.equal(steps.data.props.className, "ui steps");
      assert.equal(((steps.children[0] as VNode).children[0] as VNode).text, "Content");
      steps = Steps.render({ vertical: true });
      assert.equal(steps.children.length, 0);
      assert.equal(steps.data.props.className, "ui vertical steps");
    });
    it("should support verbose argument object syntax", function () {
      let steps = Steps.render({
        props: { vertical: true },
        content: [{
          icon: "Content"
        }]
      });
      assert.equal(steps.children.length, 1);
      assert.equal(steps.data.props.className, "ui vertical steps");
      assert.equal(((steps.children[0] as VNode).children[0] as VNode).text, "Content");
      steps = Steps.render({
        content: [{
          icon: "Content"
        }]
      });
      assert.equal(steps.children.length, 1);
      assert.equal(((steps.children[0] as VNode).children[0] as VNode).text, "Content");
      steps = Steps.render({
        props: { vertical: true }
      });
      assert.equal(steps.children.length, 0);
      assert.equal(steps.data.props.className, "ui vertical steps");
    });
    it("should support shorthand argument object syntax", function () {
      let steps = Steps.render({
        props: { vertical: true },
        content: [{ icon: "Content" }]
      });
      assert.equal(steps.children.length, 1);
      assert.equal(steps.data.props.className, "ui vertical steps");
      assert.equal(((steps.children[0] as VNode).children[0] as VNode).text, "Content");
      steps = Steps.render({
        content: [{ icon: "Content" }]
      });
      assert.equal(steps.children.length, 1);
      assert.equal(steps.data.props.className, "ui steps");
      assert.equal(((steps.children[0] as VNode).children[0] as VNode).text, "Content");
      steps = Steps.render({
        props: { vertical: true }
      });
      assert.equal(steps.children.length, 0);
      assert.equal(steps.data.props.className, "ui vertical steps");
    });
    it("should support the vertical variation", function () {
      let steps = Steps.render({ vertical: true });
      assert.equal(steps.data.props.className, "ui vertical steps");
    });
    it("should support the stackable variation", function () {
      let steps = Steps.render({ stackable: true });
      assert.equal(steps.data.props.className, "ui stackable steps");
    });
    it("should support the equal width variation", function () {
      let steps = Steps.render({ equalWidth: true }, [{}, {}]);
      assert.equal(steps.data.props.className, "ui two steps");
    });
    it("should support the fluid variation", function () {
      let steps = Steps.render({ fluid: true });
      assert.equal(steps.data.props.className, "ui fluid steps");
    });
    it("should support the size enum", function () {
      let steps = Steps.render({ size: "massive" });
      assert.equal(steps.data.props.className, "ui massive steps");
    });
    it("should support the attachment enum", function () {
      let steps = Steps.render({ attachment: "top" });
      assert.equal(steps.data.props.className, "ui top attached steps");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource(xsAdapter, {
      ".___steps": {
        ".steps": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a steps stream", function (done) {
      let steps = Steps.run({ DOM: dom });
      steps.DOM.addListener({
        next: (x) => {
          assert.equal("ui steps", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let steps = Steps.run({ DOM: dom }, "steps");
      steps.DOM.addListener({
        next: (x) => {
          assert.equal("div.___steps", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let steps = Steps.run({ DOM: dom }, "steps");
      steps.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
