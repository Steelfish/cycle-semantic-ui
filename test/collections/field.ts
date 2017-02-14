import * as assert from "assert";
import { Field } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Field", function () {
  describe("render", function () {
    it("should return a basic field when called without any arguments", function () {
      let field = Field.render();
      assert.equal(field.data.props.className, "ui field");
      assert.equal(field.children.length, 0);
    });
    it("should support argument syntax", function () {
      let field = Field.render({ inline: true }, ["Content"], "Label");
      assert.equal(field.children.length, 2);
      assert.equal(field.data.props.className, "ui inline field");
      assert.equal((field.children[0] as VNode).text, "Label");
      assert.equal((field.children[1] as VNode).text, "Content");
      field = Field.render(["Content"]);
      assert.equal(field.children.length, 1);
      assert.equal(field.data.props.className, "ui field");
      assert.equal((field.children[0] as VNode).text, "Content");
      field = Field.render({ inline: true });
      assert.equal(field.children.length, 0);
      assert.equal(field.data.props.className, "ui inline field");
    });
    it("should support verbose argument object syntax", function () {
      let field = Field.render({
        style: { inline: true },
        content: {
          label: "Label",
          main: ["Content"]
        }
      });
      assert.equal(field.children.length, 2);
      assert.equal(field.data.props.className, "ui inline field");
      assert.equal((field.children[0] as VNode).text, "Label");
      assert.equal((field.children[1] as VNode).text, "Content");
      field = Field.render({
        content: {
          main: ["Content"]
        }
      });
      assert.equal(field.children.length, 1);
      assert.equal(field.data.props.className, "ui field");
      assert.equal((field.children[0] as VNode).text, "Content");
      field = Field.render({
        content: {
          label: "Label"
        }
      });
      assert.equal(field.children.length, 1);
      assert.equal(field.data.props.className, "ui field");
      assert.equal((field.children[0] as VNode).text, "Label");
      field = Field.render({
        style: { inline: true }
      });
      assert.equal(field.children.length, 0);
      assert.equal(field.data.props.className, "ui inline field");
    });
    it("should support shorthand argument object syntax", function () {
      let field = Field.render({
        style: { inline: true },
        content: ["Content"]
      });
      assert.equal(field.children.length, 1);
      assert.equal(field.data.props.className, "ui inline field");
      assert.equal((field.children[0] as VNode).text, "Content");
      field = Field.render({
        content: ["Content"]
      });
      assert.equal(field.children.length, 1);
      assert.equal(field.data.props.className, "ui field");
      assert.equal((field.children[0] as VNode).text, "Content");
      field = Field.render({
        style: { inline: true }
      });
      assert.equal(field.children.length, 0);
      assert.equal(field.data.props.className, "ui inline field");
    });    
    it("should support the disabled state", function () {
      let field = Field.render({ disabled: true });
      assert.equal(field.data.props.className, "ui disabled field");
    });
    it("should support the error state", function () {
      let field = Field.render({ disabled: true });
      assert.equal(field.data.props.className, "ui error field");
    });
    it("should support the inline variation", function () {
      let field = Field.render({ inline: true });
      assert.equal(field.data.props.className, "ui inline field");
    });
    it("should support the centered variation", function () {
      let field = Field.render({ centered: true });
      assert.equal(field.data.props.className, "ui centered field");
    });
    it("should support the required variation", function () {
      let field = Field.render({ required: true });
      assert.equal(field.data.props.className, "ui required field");
    });
    it("should support the width variation", function () {
      let field = Field.render({ width: 3 });
      assert.equal(field.data.props.className, "ui three wide field");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource(xsAdapter, {
      ".___field": {
        ".field": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a field stream", function (done) {
      let field = Field.run({ DOM: dom });
      field.DOM.addListener({
        next: (x) => {
          assert.equal("ui field", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let field = Field.run({ DOM: dom }, "field");
      field.DOM.addListener({
        next: (x) => {
          assert.equal("div.___field", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let field = Field.run({ DOM: dom }, "field");
      field.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
