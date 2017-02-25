import * as assert from "assert";
import { Container } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Container", function () {
  describe("render", function () {
    it("should return a basic container when called without any arguments", function () {
      let container = Container.render();
      assert.equal(container.data.props.className, "ui container");
      assert.equal(container.children.length, 0);
    });
    it("should support argument syntax", function () {
      let container = Container.render(["Content"]);
      assert.equal(container.children.length, 1);
      assert.equal(container.data.props.className, "ui container");
      assert.equal((container.children[0] as VNode).text, "Content");
    });
    it("should support verbose argument object syntax", function () {
      let container = Container.render({
        content: {
          main: ["Content"]
        }
      });
      assert.equal(container.children.length, 1);
      assert.equal(container.data.props.className, "ui container");
      assert.equal((container.children[0] as VNode).text, "Content");
    });
    it("should support shorthand argument object syntax", function () {
      let container = Container.render({
        content: ["Content"]
      });
      assert.equal(container.children.length, 1);
      assert.equal(container.data.props.className, "ui container");
      assert.equal((container.children[0] as VNode).text, "Content");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___container": {
        ".container": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a container stream", function (done) {
      let container = Container.run({ DOM: dom });
      container.DOM.addListener({
        next: (x) => {
          assert.equal("ui container", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let container = Container.run({ DOM: dom }, "container");
      container.DOM.addListener({
        next: (x) => {
          assert.equal("div.___container", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let container = Container.run({ DOM: dom }, "container");
      container.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
