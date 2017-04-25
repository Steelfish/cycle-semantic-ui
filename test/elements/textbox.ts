import * as assert from "assert";
import { Textbox } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Textbox", function () {
  describe("render", function () {
    it("should return a basic textbox when called without any arguments", function () {
      let textbox = Textbox.render();
      assert.equal(textbox.data.props.className, "ui input");
      assert.equal(textbox.children.length, 1);
    });
    it("should support argument syntax", function () {
      let textbox = Textbox.render({ loading: true }, ["Content"]);
      assert.equal(textbox.children.length, 2);
      assert.equal(textbox.data.props.className, "ui loading input");
      assert.equal((textbox.children[0] as VNode).text, "Content");
      textbox = Textbox.render(["Content"]);
      assert.equal(textbox.children.length, 2);
      assert.equal(textbox.data.props.className, "ui input");
      assert.equal((textbox.children[0] as VNode).text, "Content");
      textbox = Textbox.render({ loading: true });
      assert.equal(textbox.children.length, 1);
      assert.equal(textbox.data.props.className, "ui loading input");
    });
    it("should support verbose argument object syntax", function () {
      let textbox = Textbox.render({
        props: { loading: true },
        content: {
          main: ["Content"]
        }
      });
      assert.equal(textbox.children.length, 2);
      assert.equal(textbox.data.props.className, "ui loading input");
      assert.equal((textbox.children[0] as VNode).text, "Content");
      textbox = Textbox.render({
        content: {
          main: ["Content"]
        }
      });
      assert.equal(textbox.children.length, 2);
      assert.equal(textbox.data.props.className, "ui input");
      assert.equal((textbox.children[0] as VNode).text, "Content");
      textbox = Textbox.render({
        props: { loading: true }
      });
      assert.equal(textbox.children.length, 1);
      assert.equal(textbox.data.props.className, "ui loading input");
    });
    it("should support shorthand argument object syntax", function () {
      let textbox = Textbox.render({
        props: { loading: true },
        content: ["Content"]
      });
      assert.equal(textbox.children.length, 2);
      assert.equal(textbox.data.props.className, "ui loading input");
      assert.equal((textbox.children[0] as VNode).text, "Content");
      textbox = Textbox.render({
        content: ["Content"]
      });
      assert.equal(textbox.children.length, 2);
      assert.equal(textbox.data.props.className, "ui input");
      assert.equal((textbox.children[0] as VNode).text, "Content");
      textbox = Textbox.render({
        props: { loading: true }
      });
      assert.equal(textbox.children.length, 1);
      assert.equal(textbox.data.props.className, "ui loading input");
    });
    it("support setting the initial value of the input", function () {
      let textbox = Textbox.render({ value: "initial" });
      let input = textbox.children[0] as VNode;
      assert.equal(input.data.props.value, "initial");
    });
    it("support setting the placeholder value of the input", function () {
      let textbox = Textbox.render({ placeholder: "placeholder" });
      let input = textbox.children[0] as VNode;
      assert.equal(input.data.attrs.placeholder, "placeholder");
    });
    it("support setting the type of the input", function () {
      let textbox = Textbox.render({ type: "number" });
      let input = textbox.children[0] as VNode;
      assert.equal(input.data.attrs.type, "number");
    });
    it("return a textarea with the corresponding number of rows if the rows property is set", function () {
      let textbox = Textbox.render({ rows: 12 });
      let input = textbox.children[0] as VNode;
      assert.equal(input.sel, "textarea");
      assert.equal(input.data.attrs.rows, 12);
    });
    it("should support the icon variation", function () {
      let textbox = Textbox.render({ icon: true });
      assert.equal(textbox.data.props.className, "ui icon input");
    });
    it("should support the labeled variation", function () {
      let textbox = Textbox.render({ labeled: true });
      assert.equal(textbox.data.props.className, "ui labeled input");
    });
    it("should support the action variation", function () {
      let textbox = Textbox.render({ action: true });
      assert.equal(textbox.data.props.className, "ui action input");
    });
    it("should support the left content variation", function () {
      let textbox = Textbox.render({ leftContent: true });
      assert.equal(textbox.data.props.className, "ui left input");
    });
    it("should support the right content variation", function () {
      let textbox = Textbox.render({ rightContent: true });
      assert.equal(textbox.data.props.className, "ui right input");
    });
    it("should support the transparent variation", function () {
      let textbox = Textbox.render({ transparent: true });
      assert.equal(textbox.data.props.className, "ui transparent input");
    });
    it("should support the inverted variation", function () {
      let textbox = Textbox.render({ inverted: true });
      assert.equal(textbox.data.props.className, "ui inverted input");
    });
    it("should support the focus variation", function () {
      let textbox = Textbox.render({ focus: true });
      assert.equal(textbox.data.props.className, "ui focus input");
    });
    it("should support the loading state", function () {
      let textbox = Textbox.render({ loading: true });
      assert.equal(textbox.data.props.className, "ui loading input");
    });
    it("should support the disabled state", function () {
      let textbox = Textbox.render({ disabled: true });
      assert.equal(textbox.data.props.className, "ui disabled input");
    });
    it("should support the readonly state", function () {
      let textbox = Textbox.render({ readonly: true });
      let input = textbox.children[0] as VNode;
      assert.equal(input.data.attrs.readonly, true);
    });
    it("should support the color enum", function () {
      let textbox = Textbox.render({ color: "primary" });
      assert.equal(textbox.data.props.className, "ui primaryColored input");
    });
    it("should support the size enum", function () {
      let textbox = Textbox.render({ size: "large" });
      assert.equal(textbox.data.props.className, "ui large input");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___textbox": {
        ".input": {
          "click": xs.of("Clicked"),
          "input": xs.of({target: {value: "next"}})
        }
      }
    });
    it("should return a textbox stream", function (done) {
      let textbox = Textbox.run({ DOM: dom });
      textbox.DOM.addListener({
        next: (x) => {
          assert.equal("ui input", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let textbox = Textbox.run({ DOM: dom }, "textbox");
      textbox.DOM.addListener({
        next: (x) => {
          assert.equal("div.___textbox", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let textbox = Textbox.run({ DOM: dom }, "textbox");
      textbox.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
    it("should expose the new values of the textbox in the value$", function (done) {
      let textbox = Textbox.run({ DOM: dom }, "textbox");
      textbox.value$.addListener({
        next: (x) => {
          assert.equal("next", x);
          done();
        }
      });
    });
    it("should keep the textbox's value property in sync with props.value", function (done) {
      const testStrings = ["0", "1", "2"];
      const test$ = xs.periodic(20).map(v => v.toString()).take(testStrings.length);
      const textbox = Textbox.run({DOM: dom, props$: test$.map(value => ({value}))});

      let index = 0;
      textbox.DOM.addListener({
        next: (x) => {
          let input = x.children[0] as VNode;
          assert.equal(input.data.props.value, testStrings[index]);
          index++;
          if (index === testStrings.length - 1) {
            done();
          }
        }
      });
    });
  });
});
