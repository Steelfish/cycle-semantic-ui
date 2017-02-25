import * as assert from "assert";
import { Icon } from "../../src";
import { mockDOMSource } from "@cycle/dom";
import xs from "xstream";

describe("Icon", function () {
  describe("render", function () {
    it("should return undefined when called without any arguments", function () {
      let icon = Icon.render();
      assert.equal(icon, undefined);
    });
    it("should return undefined when called with an unsupported icontype", function () {
      let icon = Icon.render(-20);
      assert.equal(icon, undefined);
    });
    it("should support argument syntax", function () {
      let icon = Icon.render({ circular: true }, "close");
      assert.equal(icon.data.props.className, "ui circular close icon");
      icon = Icon.render("close");
      assert.equal(icon.data.props.className, "ui close icon");
      icon = Icon.render({ circular: true });
      assert.equal(icon.data.props.className, "ui circular icon");
    });
    it("should support verbose argument object syntax", function () {
      let icon = Icon.render({
        props: { circular: true },
        content: {
          main: "close"
        }
      });
      assert.equal(icon.data.props.className, "ui circular close icon");
      icon = Icon.render({
        content: {
          main: "close"
        }
      });
      assert.equal(icon.data.props.className, "ui close icon");
      icon = Icon.render({
        props: { circular: true }
      });
      assert.equal(icon.data.props.className, "ui circular icon");
    });
    it("should support shorthand argument object syntax", function () {
      let icon = Icon.render({
        props: { circular: true },
        content: "close"
      });
      assert.equal(icon.data.props.className, "ui circular close icon");
      icon = Icon.render({
        content: "close"
      });
      assert.equal(icon.data.props.className, "ui close icon");
      icon = Icon.render({
        props: { circular: true }
      });
      assert.equal(icon.data.props.className, "ui circular icon");
    });
    it("should support the button variation", function () {
      let icon = Icon.render({ button: true });
      assert.equal(icon.data.props.className, "ui button icon");
    });
    it("should support the bordered variation", function () {
      let icon = Icon.render({ bordered: true });
      assert.equal(icon.data.props.className, "ui bordered icon");
    });
    it("should support the circular variation", function () {
      let icon = Icon.render({ circular: true });
      assert.equal(icon.data.props.className, "ui circular icon");
    });
    it("should support the disabled variation", function () {
      let icon = Icon.render({ disabled: true });
      assert.equal(icon.data.props.className, "ui disabled icon");
    });
    it("should support the loading variation", function () {
      let icon = Icon.render({ loading: true });
      assert.equal(icon.data.props.className, "ui loading icon");
    });
    it("should support the fitted variation", function () {
      let icon = Icon.render({ fitted: true });
      assert.equal(icon.data.props.className, "ui fitted icon");
    });
    it("should support the link variation", function () {
      let icon = Icon.render({ link: true });
      assert.equal(icon.data.props.className, "ui link icon");
    });
    it("should support the flipped variation", function () {
      let icon = Icon.render({ flipped: true });
      assert.equal(icon.data.props.className, "ui flipped icon");
    });
    it("should support the rotated variation", function () {
      let icon = Icon.render({ rotated: true });
      assert.equal(icon.data.props.className, "ui rotated icon");
    });
    it("should support the inverted variation", function () {
      let icon = Icon.render({ inverted: true });
      assert.equal(icon.data.props.className, "ui inverted icon");
    });
    it("should support the size enum", function () {
      let icon = Icon.render({ size: "massive" });
      assert.equal(icon.data.props.className, "ui massive icon");
    });
    it("should support the color enum", function () {
      let icon = Icon.render({ color: "primary" });
      assert.equal(icon.data.props.className, "ui primaryColored icon");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___icon": {
        ".icon": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a icon stream", function (done) {
      let icon = Icon.run({ DOM: dom , content$: xs.of("close")});
      icon.DOM.addListener({
        next: (x) => {
          assert.equal("ui close icon", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let icon = Icon.run({ DOM: dom , content$: xs.of("close")}, "icon");
      icon.DOM.addListener({
        next: (x) => {
          assert.equal("i.___icon", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let icon = Icon.run({ DOM: dom }, "icon");
      icon.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
