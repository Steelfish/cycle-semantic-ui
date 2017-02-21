import * as assert from "assert";
import { List } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("List", function () {
  describe("render", function () {
    it("should return a basic list when called without any arguments", function () {
      let list = List.render();
      assert.equal(list.data.props.className, "ui list");
      assert.equal(list.children.length, 0);
    });
    it("should support argument syntax", function () {
      let list = List.render({ bulleted: true }, [{ main: "Hello" }]);
      assert.equal(list.children.length, 1);
      assert.equal(((list.children[0] as VNode).children[0] as VNode).text, "Hello");
      assert.equal(list.data.props.className, "ui bulleted list");
      list = List.render([{ main: "Hello" }]);
      assert.equal(list.children.length, 1);
      assert.equal(((list.children[0] as VNode).children[0] as VNode).text, "Hello");
      list = List.render({ bulleted: true });
      assert.equal(list.children.length, 0);
      assert.equal(list.data.props.className, "ui bulleted list");
    });
    it("should support verbose argument object syntax", function () {
      let list = List.render({
        props: { bulleted: true },
        content: {
          main: [{ main: "Hello" }]
        }
      });
      assert.equal(list.children.length, 1);
      assert.equal(((list.children[0] as VNode).children[0] as VNode).text, "Hello");
      assert.equal(list.data.props.className, "ui bulleted list");
      list = List.render({
        content: {
          main: [{ main: "Hello" }]
        }
      });
      assert.equal(list.children.length, 1);
      assert.equal(((list.children[0] as VNode).children[0] as VNode).text, "Hello");
      list = List.render({
        props: { bulleted: true }
      });
      assert.equal(list.children.length, 0);
      assert.equal(list.data.props.className, "ui bulleted list");
    });
    it("should support shorthand argument object syntax", function () {
      let list = List.render({
        props: { bulleted: true },
        content: [{ main: "Hello" }]
      });
      assert.equal(list.children.length, 1);
      assert.equal(list.data.props.className, "ui bulleted list");
      assert.equal(((list.children[0] as VNode).children[0] as VNode).text, "Hello");
      list = List.render({
        content: [{ main: "Hello" }]
      });
      assert.equal(list.children.length, 1);
      assert.equal(((list.children[0] as VNode).children[0] as VNode).text, "Hello");
    });
    it("should support the bulleted variation", function () {
      let list = List.render({ bulleted: true });
      assert.equal(list.data.props.className, "ui bulleted list");
    });
    it("should support the ordered variation", function () {
      let list = List.render({ ordered: true });
      assert.equal(list.data.props.className, "ui ordered list");
    });
    it("should support the horizontal variation", function () {
      let list = List.render({ horizontal: true });
      assert.equal(list.data.props.className, "ui horizontal list");
    });
    it("should support the inverted variation", function () {
      let list = List.render({ inverted: true });
      assert.equal(list.data.props.className, "ui inverted list");
    });
    it("should support the selection variation", function () {
      let list = List.render({ selection: true });
      assert.equal(list.data.props.className, "ui selection list");
    });
    it("should support the animated variation", function () {
      let list = List.render({ animated: true });
      assert.equal(list.data.props.className, "ui animated list");
    });
    it("should support the relaxed variation", function () {
      let list = List.render({ relaxed: true });
      assert.equal(list.data.props.className, "ui relaxed list");
    });
    it("should support the divided variation", function () {
      let list = List.render({ divided: true });
      assert.equal(list.data.props.className, "ui divided list");
    });
    it("should support the celled variation", function () {
      let list = List.render({ celled: true });
      assert.equal(list.data.props.className, "ui celled list");
    });
    it("should support the size enum", function () {
      let list = List.render({ size: "massive" });
      assert.equal(list.data.props.className, "ui massive list");
    });
    it("should support the vertical alignment enum", function () {
      let list = List.render({ alignment: "top" });
      assert.equal(list.data.props.className, "ui top aligned list");
    });
    it("should support the float enum", function () {
      let list = List.render({ float: "right" });
      assert.equal(list.data.props.className, "ui right floated list");
    });
    it("should return a link if items set the href property", function () {
      let list = List.render([{ main: "Hello", href: "#" }]);
      assert.equal((list.children[0] as VNode).sel, "a");
      assert.equal((list.children[0] as VNode).data.props.href, "#");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource(xsAdapter, {
      ".___list": {
        ".list": {
          "click": xs.of("Clicked")
        },
        ".list > .item": {
          "click": xs.of({
            currentTarget: {
              id: "0"
            }
          })
        }
      }
    });
    it("should return a list stream", function (done) {
      let list = List.run({ DOM: dom });
      list.DOM.addListener({
        next: (x) => {
          assert.equal("ui list", x.data.props.className);
          done();
        },
        error: (err) => {
          throw (err);
        }
      });
    });
    it("should return an isolated component", function (done) {
      let list = List.run({ DOM: dom }, "list");
      list.DOM.addListener({
        next: (x) => {
          assert.equal("div.___list", x.sel);
          done();
        },
        error: (err) => {
          throw (err);
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let list = List.run({ DOM: dom }, "list");
      list.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
