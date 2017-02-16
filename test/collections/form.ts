import * as assert from "assert";
import { Form } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Form", function () {
  describe("render", function () {
    it("should return a basic form when called without any arguments", function () {
      let form = Form.render();
      assert.equal(form.data.props.className, "ui form");
      assert.equal(form.children.length, 0);
    });
    it("should support argument syntax", function () {
      let form = Form.render({ loading: true }, ["Content"]);
      assert.equal(form.children.length, 1);
      assert.equal(form.data.props.className, "ui loading form");
      assert.equal((form.children[0] as VNode).text, "Content");
      form = Form.render(["Content"]);
      assert.equal(form.children.length, 1);
      assert.equal(form.data.props.className, "ui form");
      assert.equal((form.children[0] as VNode).text, "Content");
      form = Form.render({ loading: true });
      assert.equal(form.children.length, 0);
      assert.equal(form.data.props.className, "ui loading form");
    });
    it("should support verbose argument object syntax", function () {
      let form = Form.render({
        props: { loading: true },
        content: {
          main: ["Content"]
        }
      });
      assert.equal(form.children.length, 1);
      assert.equal(form.data.props.className, "ui loading form");
      assert.equal((form.children[0] as VNode).text, "Content");
      form = Form.render({
        content: {
          main: ["Content"]
        }
      });
      assert.equal(form.children.length, 1);
      assert.equal(form.data.props.className, "ui form");
      assert.equal((form.children[0] as VNode).text, "Content");
      form = Form.render({
        props: { loading: true }
      });
      assert.equal(form.children.length, 0);
      assert.equal(form.data.props.className, "ui loading form");
    });
    it("should support shorthand argument object syntax", function () {
      let form = Form.render({
        props: { loading: true },
        content: ["Content"]
      });
      assert.equal(form.children.length, 1);
      assert.equal(form.data.props.className, "ui loading form");
      assert.equal((form.children[0] as VNode).text, "Content");
      form = Form.render({
        content: ["Content"]
      });
      assert.equal(form.children.length, 1);
      assert.equal(form.data.props.className, "ui form");
      assert.equal((form.children[0] as VNode).text, "Content");
      form = Form.render({
        props: { loading: true }
      });
      assert.equal(form.children.length, 0);
      assert.equal(form.data.props.className, "ui loading form");
    });
    it("should support the size enum", function () {
      let form = Form.render({ size: "massive" });
      assert.equal(form.data.props.className, "ui massive form");
    });
    it("should support the loading state", function () {
      let form = Form.render({ loading: true });
      assert.equal(form.data.props.className, "ui loading form");
    });
    it("should support the equal width variation", function () {
      let form = Form.render({ equalWidth: true });
      assert.equal(form.data.props.className, "ui equal width form");
    });
    it("should support the inverted variation", function () {
      let form = Form.render({ inverted: true });
      assert.equal(form.data.props.className, "ui inverted form");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource(xsAdapter, {
      ".___form": {
        ".form": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a form stream", function (done) {
      let form = Form.run({ DOM: dom });
      form.DOM.addListener({
        next: (x) => {
          assert.equal("ui form", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let form = Form.run({ DOM: dom }, "form");
      form.DOM.addListener({
        next: (x) => {
          assert.equal("div.___form", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let form = Form.run({ DOM: dom }, "form");
      form.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
