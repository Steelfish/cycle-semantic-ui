import * as assert from "assert";
import { Loader } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Loader", function () {
  describe("render", function () {
    it("should return a basic loader when called without any arguments", function () {
      let loader = Loader.render();
      assert.equal(loader.data.props.className, "ui loader");
      assert.equal(loader.children.length, 0);
    });
    it("should support argument syntax", function () {
      let loader = Loader.render({ centered: true }, ["Content"]);
      assert.equal(loader.children.length, 1);
      assert.equal(loader.data.props.className, "ui centered loader");
      assert.equal((loader.children[0] as VNode).text, "Content");
      loader = Loader.render(["Content"]);
      assert.equal(loader.children.length, 1);
      assert.equal(loader.data.props.className, "ui loader");
      assert.equal((loader.children[0] as VNode).text, "Content");
      loader = Loader.render({ centered: true });
      assert.equal(loader.children.length, 0);
      assert.equal(loader.data.props.className, "ui centered loader");
    });
    it("should support verbose argument object syntax", function () {
      let loader = Loader.render({
        props: { centered: true },
        content: {
          main: ["Content"],
        }
      });
      assert.equal(loader.children.length, 1);
      assert.equal(loader.data.props.className, "ui centered loader");
      assert.equal((loader.children[0] as VNode).text, "Content");
      loader = Loader.render({
        content: {
          main: ["Content"],
        }
      });
      assert.equal(loader.children.length, 1);
      assert.equal(loader.data.props.className, "ui loader");
      assert.equal((loader.children[0] as VNode).text, "Content");
      loader = Loader.render({
        props: { centered: true }
      });
      assert.equal(loader.children.length, 0);
      assert.equal(loader.data.props.className, "ui centered loader");
    });
    it("should support shorthand argument object syntax", function () {
      let loader = Loader.render({
        props: { centered: true },
        content: ["Content"]
      });
      assert.equal(loader.children.length, 1);
      assert.equal(loader.data.props.className, "ui centered loader");
      assert.equal((loader.children[0] as VNode).text, "Content");
      loader = Loader.render({
        content: ["Content"]
      });
      assert.equal(loader.children.length, 1);
      assert.equal(loader.data.props.className, "ui loader");
      assert.equal((loader.children[0] as VNode).text, "Content");
      loader = Loader.render({
        props: { centered: true }
      });
      assert.equal(loader.children.length, 0);
      assert.equal(loader.data.props.className, "ui centered loader");
    });
    it("should support three different types of loaders", function () {
      let loader = Loader.render({ type: Loader.LoaderType.Content });
      assert.equal(loader.data.props.className, "ui loader");
      loader = Loader.render({ type: Loader.LoaderType.Page });
      assert.equal(loader.data.props.className, "ui loader");
      loader = Loader.render({ type: Loader.LoaderType.Inline });
      assert.equal(loader.data.props.className, "ui inline loader");
    });
    it("should support the centered variation", function () {
      let loader = Loader.render({ centered: true });
      assert.equal(loader.data.props.className, "ui centered loader");
    });
    it("should support the active variation", function () {
      let loader = Loader.render({ active: true });
      assert.equal(loader.data.props.className, "ui active loader");
    });
    it("should support the disabled variation", function () {
      let loader = Loader.render({ disabled: true });
      assert.equal(loader.data.props.className, "ui disabled loader");
    });
    it("should support the indeterminate variation", function () {
      let loader = Loader.render({ indeterminate: true });
      assert.equal(loader.data.props.className, "ui indeterminate loader");
    });
    it("should support the inverted variation", function () {
      let loader = Loader.render({ inverted: true });
      assert.equal(loader.data.props.className, "ui inverted loader");
    });
    it("should support the text variation", function () {
      let loader = Loader.render({ text: true });
      assert.equal(loader.data.props.className, "ui text loader");
    });
    it("should support the size enum", function () {
      let loader = Loader.render({ size: "massive" });
      assert.equal(loader.data.props.className, "ui massive loader");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___loader": {
        ".loader": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a loader stream", function (done) {
      let loader = Loader.run({ DOM: dom });
      loader.DOM.addListener({
        next: (x) => {
          assert.equal(x.data.props.className, "ui dimmer modals page dimmer transition visible active");
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let loader = Loader.run({ DOM: dom }, "loader");
      loader.DOM.addListener({
        next: (x) => {
          assert.equal(x.sel, "div.___loader");
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let loader = Loader.run({ DOM: dom }, "loader");
      loader.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
