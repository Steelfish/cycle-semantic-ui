import * as assert from "assert";
import { Button } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Button", function () {
  describe("render", function () {
    it("should return a basic button when called without any arguments", function () {
      let button = Button.render();
      assert.equal(button.data.props.className, "ui button");
      assert.equal(button.children.length, 0);
    });
    it("should support argument syntax", function () {
      let button = Button.render({ loading: true }, ["Content"]);
      assert.equal(button.children.length, 1);
      assert.equal(button.data.props.className, "ui loading button");
      assert.equal((button.children[0] as VNode).text, "Content");
      button = Button.render(["Content"]);
      assert.equal(button.children.length, 1);
      assert.equal(button.data.props.className, "ui button");
      assert.equal((button.children[0] as VNode).text, "Content");
      button = Button.render({ loading: true });
      assert.equal(button.children.length, 0);
      assert.equal(button.data.props.className, "ui loading button");
    });
    it("should support verbose argument object syntax", function () {
      let button = Button.render({
        props: { loading: true },
        content: {
          main: ["Content"]
        }
      });
      assert.equal(button.children.length, 1);
      assert.equal(button.data.props.className, "ui loading button");
      assert.equal((button.children[0] as VNode).text, "Content");
      button = Button.render({
        content: {
          main: ["Content"]
        }
      });
      assert.equal(button.children.length, 1);
      assert.equal(button.data.props.className, "ui button");
      assert.equal((button.children[0] as VNode).text, "Content");
      button = Button.render({
        props: { loading: true }
      });
      assert.equal(button.children.length, 0);
      assert.equal(button.data.props.className, "ui loading button");
    });
    it("should support shorthand argument object syntax", function () {
      let button = Button.render({
        props: { loading: true },
        content: ["Content"]
      });
      assert.equal(button.children.length, 1);
      assert.equal(button.data.props.className, "ui loading button");
      assert.equal((button.children[0] as VNode).text, "Content");
      button = Button.render({
        content: ["Content"]
      });
      assert.equal(button.children.length, 1);
      assert.equal(button.data.props.className, "ui button");
      assert.equal((button.children[0] as VNode).text, "Content");
      button = Button.render({
        props: { loading: true }
      });
      assert.equal(button.children.length, 0);
      assert.equal(button.data.props.className, "ui loading button");
    });
    it("should return a link only if the href property is set", function () {
      let button = Button.render();
      assert.equal(button.sel, "div");
      let linkbutton = Button.render({ href: "#" });
      assert.equal(linkbutton.sel, "a");
    });
    it("should support the animated variation", function () {
      let button = Button.render({ animated: true });
      assert.equal(button.data.props.className, "ui animated button");
    });
    it("should support the vertical animated variation", function () {
      let button = Button.render({ verticalAnimated: true });
      assert.equal(button.data.props.className, "ui vertical animated button");
    });
    it("should support the labeled variation", function () {
      let button = Button.render({ labeled: true });
      assert.equal(button.data.props.className, "ui labeled button");
    });
    it("should support the right labeled variation", function () {
      let button = Button.render({ rightlabeled: true });
      assert.equal(button.data.props.className, "ui right labeled button");
    });
    it("should support the icon variation", function () {
      let button = Button.render({ icon: true });
      assert.equal(button.data.props.className, "ui icon button");
    });
    it("should support the basic variation", function () {
      let button = Button.render({ basic: true });
      assert.equal(button.data.props.className, "ui basic button");
    });
    it("should support the inverted variation", function () {
      let button = Button.render({ inverted: true });
      assert.equal(button.data.props.className, "ui inverted button");
    });
    it("should support the compact variation", function () {
      let button = Button.render({ compact: true });
      assert.equal(button.data.props.className, "ui compact button");
    });
    it("should support the circular variation", function () {
      let button = Button.render({ circular: true });
      assert.equal(button.data.props.className, "ui circular button");
    });
    it("should support the fluid variation", function () {
      let button = Button.render({ fluid: true });
      assert.equal(button.data.props.className, "ui fluid button");
    });
    it("should support the active state", function () {
      let button = Button.render({ active: true });
      assert.equal(button.data.props.className, "ui active button");
    });
    it("should support the disabled state", function () {
      let button = Button.render({ disabled: true });
      assert.equal(button.data.props.className, "ui disabled button");
    });
    it("should support the loading state", function () {
      let button = Button.render({ loading: true });
      assert.equal(button.data.props.className, "ui loading button");
    });
    it("should support the size enum", function () {
      let button = Button.render({ size: "massive" });
      assert.equal(button.data.props.className, "ui massive button");
    });
    it("should support the color enum", function () {
      let button = Button.render({ color: "primary" });
      assert.equal(button.data.props.className, "ui primaryColored button");
    });
    it("should support the float enum", function () {
      let button = Button.render({ float: "right" });
      assert.equal(button.data.props.className, "ui right floated button");
    });
    it("should support the attachment enum", function () {
      let button = Button.render({ attachment: "top" });
      assert.equal(button.data.props.className, "ui top attached button");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource(xsAdapter, {
      ".___button": {
        ".button": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a button stream", function (done) {
      let button = Button.run({ DOM: dom });
      button.DOM.addListener({
        next: (x) => {
          assert.equal("ui button", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let button = Button.run({ DOM: dom }, "button");
      button.DOM.addListener({
        next: (x) => {
          assert.equal("div.___button", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let button = Button.run({ DOM: dom }, "button");
      button.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
