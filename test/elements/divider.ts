import * as assert from "assert";
import { Divider } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Divider", function () {
  describe("render", function () {
    it("should return a basic divider when called without any arguments", function () {
      let divider = Divider.render();
      assert.equal(divider.data.props.className, "ui divider");
      assert.equal(divider.children.length, 0);
    });
    it("should support argument syntax", function () {
      let divider = Divider.render({ horizontal: true }, ["Content"]);
      assert.equal(divider.children.length, 1);
      assert.equal(divider.data.props.className, "ui horizontal divider");
      assert.equal((divider.children[0] as VNode).text, "Content");
      divider = Divider.render(["Content"]);
      assert.equal(divider.children.length, 1);
      assert.equal(divider.data.props.className, "ui divider");
      assert.equal((divider.children[0] as VNode).text, "Content");
      divider = Divider.render({ horizontal: true });
      assert.equal(divider.children.length, 0);
      assert.equal(divider.data.props.className, "ui horizontal divider");
    });
    it("should support verbose argument object syntax", function () {
      let divider = Divider.render({
        props: { horizontal: true },
        content: {
          main: ["Content"]
        }
      });
      assert.equal(divider.children.length, 1);
      assert.equal(divider.data.props.className, "ui horizontal divider");
      assert.equal((divider.children[0] as VNode).text, "Content");
      divider = Divider.render({
        content: {
          main: ["Content"]
        }
      });
      assert.equal(divider.children.length, 1);
      assert.equal(divider.data.props.className, "ui divider");
      assert.equal((divider.children[0] as VNode).text, "Content");
      divider = Divider.render({
        props: { horizontal: true }
      });
      assert.equal(divider.children.length, 0);
      assert.equal(divider.data.props.className, "ui horizontal divider");
    });
    it("should support shorthand argument object syntax", function () {
      let divider = Divider.render({
        props: { horizontal: true },
        content: ["Content"]
      });
      assert.equal(divider.children.length, 1);
      assert.equal(divider.data.props.className, "ui horizontal divider");
      assert.equal((divider.children[0] as VNode).text, "Content");
      divider = Divider.render({
        content: ["Content"]
      });
      assert.equal(divider.children.length, 1);
      assert.equal(divider.data.props.className, "ui divider");
      assert.equal((divider.children[0] as VNode).text, "Content");
      divider = Divider.render({
        props: { horizontal: true }
      });
      assert.equal(divider.children.length, 0);
      assert.equal(divider.data.props.className, "ui horizontal divider");
    });
    it("should support the horizontal variation", function () {
      let divider = Divider.render({ horizontal: true });
      assert.equal(divider.data.props.className, "ui horizontal divider");
    });
    it("should support the vertical variation", function () {
      let divider = Divider.render({ vertical: true });
      assert.equal(divider.data.props.className, "ui vertical divider");
    });
    it("should support the inverted variation", function () {
      let divider = Divider.render({ inverted: true });
      assert.equal(divider.data.props.className, "ui inverted divider");
    });
    it("should support the fitted variation", function () {
      let divider = Divider.render({ fitted: true });
      assert.equal(divider.data.props.className, "ui fitted divider");
    });
    it("should support the hidden variation", function () {
      let divider = Divider.render({ hidden: true });
      assert.equal(divider.data.props.className, "ui hidden divider");
    });
    it("should support the section variation", function () {
      let divider = Divider.render({ section: true });
      assert.equal(divider.data.props.className, "ui section divider");
    });
    it("should support the clearing variation", function () {
      let divider = Divider.render({ clearing: true });
      assert.equal(divider.data.props.className, "ui clearing divider");
    });
    it("should support the header variation", function () {
      let divider = Divider.render({ header: true });
      assert.equal(divider.data.props.className, "ui header divider");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___divider": {
        ".divider": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a divider stream", function (done) {
      let divider = Divider.run({ DOM: dom });
      divider.DOM.addListener({
        next: (x) => {
          assert.equal("ui divider", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let divider = Divider.run({ DOM: dom }, "divider");
      divider.DOM.addListener({
        next: (x) => {
          assert.equal("div.___divider", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let divider = Divider.run({ DOM: dom }, "divider");
      divider.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
