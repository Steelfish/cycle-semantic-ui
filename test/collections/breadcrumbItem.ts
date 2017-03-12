import * as assert from "assert";
import { BreadcrumbItem } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("BreadcrumbItem", function () {
  describe("render", function () {
    it("should return a basic section when called without any arguments", function () {
      let section = BreadcrumbItem.render();
      assert.equal(section.data.props.className, "section");
      assert.equal(section.children.length, 0);
    });
    it("should support argument syntax", function () {
      let section = BreadcrumbItem.render({ active: true }, ["Content"]);
      assert.equal(section.children.length, 1);
      assert.equal(section.data.props.className, "active section");
      assert.equal((section.children[0] as VNode).text, "Content");
      section = BreadcrumbItem.render(["Content"]);
      assert.equal(section.children.length, 1);
      assert.equal(section.data.props.className, "section");
      assert.equal((section.children[0] as VNode).text, "Content");
      section = BreadcrumbItem.render({ active: true });
      assert.equal(section.children.length, 0);
      assert.equal(section.data.props.className, "active section");
    });
    it("should support verbose argument object syntax", function () {
      let section = BreadcrumbItem.render({
        props: { active: true },
        content: {
          main: ["Content"]
        }
      });
      assert.equal(section.children.length, 1);
      assert.equal(section.data.props.className, "active section");
      assert.equal((section.children[0] as VNode).text, "Content");
      section = BreadcrumbItem.render({
        content: {
          main: ["Content"]
        }
      });
      assert.equal(section.children.length, 1);
      assert.equal(section.data.props.className, "section");
      assert.equal((section.children[0] as VNode).text, "Content");
      section = BreadcrumbItem.render({
        props: { active: true }
      });
      assert.equal(section.children.length, 0);
      assert.equal(section.data.props.className, "active section");
    });
    it("should support shorthand argument object syntax", function () {
      let section = BreadcrumbItem.render({
        props: { active: true },
        content: ["Content"]
      });
      assert.equal(section.children.length, 1);
      assert.equal(section.data.props.className, "active section");
      assert.equal((section.children[0] as VNode).text, "Content");
      section = BreadcrumbItem.render({
        content: ["Content"]
      });
      assert.equal(section.children.length, 1);
      assert.equal(section.data.props.className, "section");
      assert.equal((section.children[0] as VNode).text, "Content");
      section = BreadcrumbItem.render({
        props: { active: true }
      });
      assert.equal(section.children.length, 0);
      assert.equal(section.data.props.className, "active section");
    });

    it("should create a link only if the href attribute is set", function () {
      let section = BreadcrumbItem.render("Hello");
      assert.equal(section.sel, "div");
      section = BreadcrumbItem.render({ href: "#" }, "Hello");
      assert.equal(section.sel, "a");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___section": {
        ".section": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a section stream", function (done) {
      let section = BreadcrumbItem.run({ DOM: dom });
      section.DOM.addListener({
        next: (x) => {
          assert.equal("section", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let section = BreadcrumbItem.run({ DOM: dom }, "section");
      section.DOM.addListener({
        next: (x) => {
          assert.equal("div.___section", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let section = BreadcrumbItem.run({ DOM: dom }, "section");
      section.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
