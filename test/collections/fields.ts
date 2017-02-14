import * as assert from "assert";
import { Fields } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Fields", function () {
  describe("render", function () {
    it("should return a basic fields when called without any arguments", function () {
      let fields = Fields.render();
      assert.equal(fields.data.props.className, "ui fields");
      assert.equal(fields.children.length, 0);
    });
    it("should support argument syntax", function () {
      let fields = Fields.render({ inline: true }, ["Content"]);
      assert.equal(fields.children.length, 1);
      assert.equal(fields.data.props.className, "ui inline fields");
      assert.equal((fields.children[0] as VNode).text, "Content");
      fields = Fields.render(["Content"]);
      assert.equal(fields.children.length, 1);
      assert.equal(fields.data.props.className, "ui fields");
      assert.equal((fields.children[0] as VNode).text, "Content");
      fields = Fields.render({ inline: true });
      assert.equal(fields.children.length, 0);
      assert.equal(fields.data.props.className, "ui inline fields");
    });
    it("should support verbose argument object syntax", function () {
      let fields = Fields.render({
        style: { inline: true },
        content: {
          label: "Label",
          main: ["Content"]
        }
      });
      assert.equal(fields.children.length, 2);
      assert.equal(fields.data.props.className, "ui inline fields");
      assert.equal((fields.children[0] as VNode).text, "Label");
      assert.equal((fields.children[1] as VNode).text, "Content");
      fields = Fields.render({
        content: {
          main: ["Content"]
        }
      });
      assert.equal(fields.children.length, 1);
      assert.equal(fields.data.props.className, "ui fields");
      assert.equal((fields.children[0] as VNode).text, "Content");
      fields = Fields.render({
        content: {
          label: "Label"
        }
      });
      assert.equal(fields.children.length, 1);
      assert.equal(fields.data.props.className, "ui fields");
      assert.equal((fields.children[0] as VNode).text, "Label");
      fields = Fields.render({
        style: { inline: true }
      });
      assert.equal(fields.children.length, 0);
      assert.equal(fields.data.props.className, "ui inline fields");
    });
    it("should support shorthand argument object syntax", function () {
      let fields = Fields.render({
        style: { inline: true },
        content: ["Content"]
      });
      assert.equal(fields.children.length, 1);
      assert.equal(fields.data.props.className, "ui inline fields");
      assert.equal((fields.children[0] as VNode).text, "Content");
      fields = Fields.render({
        content: ["Content"]
      });
      assert.equal(fields.children.length, 1);
      assert.equal(fields.data.props.className, "ui fields");
      assert.equal((fields.children[0] as VNode).text, "Content");
      fields = Fields.render({
        style: { inline: true }
      });
      assert.equal(fields.children.length, 0);
      assert.equal(fields.data.props.className, "ui inline fields");
    });
    it("should support the inline variation", function () {
      let fields = Fields.render({ inline: true });
      assert.equal(fields.data.props.className, "ui inline fields");
    });
    it("should support the centered variation", function () {
      let fields = Fields.render({ grouped: true });
      assert.equal(fields.data.props.className, "ui grouped fields");
    });
    it("should support the required variation", function () {
      let fields = Fields.render({ required: true });
      assert.equal(fields.data.props.className, "ui required fields");
    });
    it("should support the equal width variation", function () {
      let fields = Fields.render({ equalWidth: true }, ["One", "Two"]);
      assert.equal(fields.data.props.className, "ui two fields");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource(xsAdapter, {
      ".___fields": {
        ".fields": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a fields stream", function (done) {
      let fields = Fields.run({ DOM: dom });
      fields.DOM.addListener({
        next: (x) => {
          assert.equal("ui fields", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let fields = Fields.run({ DOM: dom }, "fields");
      fields.DOM.addListener({
        next: (x) => {
          assert.equal("div.___fields", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let fields = Fields.run({ DOM: dom }, "fields");
      fields.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
