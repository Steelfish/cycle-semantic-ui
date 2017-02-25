import * as assert from "assert";
import { Checkbox } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Checkbox", function () {
  describe("render", function () {
    it("should return a basic checkbox when called without any arguments", function () {
      let checkbox = Checkbox.render();
      assert.equal(checkbox.data.props.className, "ui checkbox");
      assert.equal(checkbox.children.length, 2);
    });
    it("should support argument syntax", function () {
      let checkbox = Checkbox.render({ toggle: true }, "Content");
      assert.equal(checkbox.children.length, 2);
      assert.equal(checkbox.data.props.className, "ui toggle checkbox");
      assert.equal((checkbox.children[1] as VNode).text, "Content");
      checkbox = Checkbox.render("Content");
      assert.equal(checkbox.children.length, 2);
      assert.equal(checkbox.data.props.className, "ui checkbox");
      assert.equal((checkbox.children[1] as VNode).text, "Content");
      checkbox = Checkbox.render({ toggle: true });
      assert.equal(checkbox.children.length, 2);
      assert.equal(checkbox.data.props.className, "ui toggle checkbox");
    });
    it("should support verbose argument object syntax", function () {
      let checkbox = Checkbox.render({
        props: { toggle: true },
        content: {
          main: "Content"
        }
      });
      assert.equal(checkbox.children.length, 2);
      assert.equal(checkbox.data.props.className, "ui toggle checkbox");
      assert.equal((checkbox.children[1] as VNode).text, "Content");
      checkbox = Checkbox.render({
        content: {
          main: "Content"
        }
      });
      assert.equal(checkbox.children.length, 2);
      assert.equal(checkbox.data.props.className, "ui checkbox");
      assert.equal((checkbox.children[1] as VNode).text, "Content");
      checkbox = Checkbox.render({
        props: { toggle: true }
      });
      assert.equal(checkbox.children.length, 2);
      assert.equal(checkbox.data.props.className, "ui toggle checkbox");
    });
    it("should support shorthand argument object syntax", function () {
      let checkbox = Checkbox.render({
        props: { toggle: true },
        content: "Content"
      });
      assert.equal(checkbox.children.length, 2);
      assert.equal(checkbox.data.props.className, "ui toggle checkbox");
      assert.equal((checkbox.children[1] as VNode).text, "Content");
      checkbox = Checkbox.render({
        content: "Content"
      });
      assert.equal(checkbox.children.length, 2);
      assert.equal(checkbox.data.props.className, "ui checkbox");
      assert.equal((checkbox.children[1] as VNode).text, "Content");
      checkbox = Checkbox.render({
        props: { toggle: true }
      });
      assert.equal(checkbox.children.length, 2);
      assert.equal(checkbox.data.props.className, "ui toggle checkbox");
    });
    it("should support setting the initial state of the input", function () {
      let checkbox = Checkbox.render({ checked: true });
      let input = checkbox.children[0] as VNode;
      assert.equal(input.data.props.checked, true);
    });
    it("should support setting the name of the input", function () {
      let checkbox = Checkbox.render({ name: "group" });
      let input = checkbox.children[0] as VNode;
      assert.equal(input.data.props.name, "group");
    });
    it("should support the readonly state", function () {
      let checkbox = Checkbox.render({ readonly: true });
      assert.equal(checkbox.data.props.className, "ui read-only checkbox");
    });
    it("should support the disabled state", function () {
      let checkbox = Checkbox.render({ disabled: true });
      assert.equal(checkbox.data.props.className, "ui disabled checkbox");
    });
    it("should support the fitted variation", function () {
      let checkbox = Checkbox.render({ fitted: true });
      assert.equal(checkbox.data.props.className, "ui fitted checkbox");
    });
    it("should support the radio variation", function () {
      let checkbox = Checkbox.render({ radio: true });
      assert.equal(checkbox.data.props.className, "ui radio checkbox");
    });
    it("should support the toggle variation", function () {
      let checkbox = Checkbox.render({ toggle: true });
      assert.equal(checkbox.data.props.className, "ui toggle checkbox");
    });
    it("should support the slider variation", function () {
      let checkbox = Checkbox.render({ slider: true });
      assert.equal(checkbox.data.props.className, "ui slider checkbox");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___checkbox": {
        ".checkbox": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a checkbox stream", function (done) {
      let checkbox = Checkbox.run({ DOM: dom });
      checkbox.DOM.addListener({
        next: (x) => {
          assert.equal("ui checkbox", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let checkbox = Checkbox.run({ DOM: dom }, "checkbox");
      checkbox.DOM.addListener({
        next: (x) => {
          assert.equal("div.___checkbox", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let checkbox = Checkbox.run({ DOM: dom }, "checkbox");
      checkbox.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
