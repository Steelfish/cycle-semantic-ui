import * as assert from "assert";
import { Progress } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Progress", function () {
  describe("render", function () {
    it("should return a basic progress when called without any arguments", function () {
      let progress = Progress.render();
      assert.equal(progress.data.props.className, "ui progress");
    });
    it("should support argument syntax", function () {
      let progress = Progress.render({ disabled: true }, "Content");
      assert.equal(progress.data.props.className, "ui disabled progress");
      assert.equal((progress.children[1] as VNode).text, "Content");
      progress = Progress.render("Content");
      assert.equal(progress.data.props.className, "ui progress");
      assert.equal((progress.children[1] as VNode).text, "Content");
      progress = Progress.render({ disabled: true });
      assert.equal(progress.data.props.className, "ui disabled progress");
    });
    it("should support verbose argument object syntax", function () {
      let progress = Progress.render({
        props: { disabled: true },
        content: {
          main: "Content",
        }
      });
      assert.equal(progress.data.props.className, "ui disabled progress");
      assert.equal((progress.children[1] as VNode).text, "Content");
      progress = Progress.render({
        content: {
          main: "Content",
        }
      });
      assert.equal(progress.data.props.className, "ui progress");
      assert.equal((progress.children[1] as VNode).text, "Content");
      progress = Progress.render({
        props: { disabled: true }
      });
      assert.equal(progress.data.props.className, "ui disabled progress");
    });
    it("should support shorthand argument object syntax", function () {
      let progress = Progress.render({
        props: { disabled: true },
        content: "Content"
      });
      assert.equal(progress.data.props.className, "ui disabled progress");
      assert.equal((progress.children[1] as VNode).text, "Content");
      progress = Progress.render({
        content: "Content"
      });
      assert.equal(progress.data.props.className, "ui progress");
      assert.equal((progress.children[1] as VNode).text, "Content");
      progress = Progress.render({
        props: { disabled: true }
      });
      assert.equal(progress.data.props.className, "ui disabled progress");
    });
    it("should have a progressbar with width equal to the progress property", function () {
      let progress = Progress.render({ progress: 20 });
      assert.equal((progress.children[0] as VNode).data.style.width, "20%");
    });
    it("should support the inverted variation", function () {
      let progress = Progress.render({ inverted: true });
      assert.equal(progress.data.props.className, "ui inverted progress");
    });
    it("should support the active state", function () {
      let progress = Progress.render({ active: true });
      assert.equal(progress.data.props.className, "ui active progress");
    });
    it("should support the disabled state", function () {
      let progress = Progress.render({ disabled: true });
      assert.equal(progress.data.props.className, "ui disabled progress");
    });
    it("should support the size enum", function () {
      let progress = Progress.render({ size: "massive" });
      assert.equal(progress.data.props.className, "ui massive progress");
    });
    it("should support the color enum", function () {
      let progress = Progress.render({ color: "primary" });
      assert.equal(progress.data.props.className, "ui primaryColored progress");
    });
    it("should support the attachment enum", function () {
      let progress = Progress.render({ attachment: "top" });
      assert.equal(progress.data.props.className, "ui top attached progress");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___progress": {
        ".progress": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a progress stream", function (done) {
      let progress = Progress.run({ DOM: dom });
      progress.DOM.addListener({
        next: (x) => {
          assert.equal("ui progress", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let progress = Progress.run({ DOM: dom }, "progress");
      progress.DOM.addListener({
        next: (x) => {
          assert.equal("div.___progress", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let progress = Progress.run({ DOM: dom }, "progress");
      progress.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
