import * as assert from "assert";
import { Breadcrumb, BreadcrumbItem, Icon, IconType } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Breadcrumb", function () {
  describe("render", function () {
    it("should return a basic breadcrumb when called without any arguments", function () {
      let breadcrumb = Breadcrumb.render();
      assert.equal(breadcrumb.data.props.className, "ui breadcrumb");
      assert.equal(breadcrumb.children.length, 0);
    });
    it("should support argument syntax", function () {
      let breadcrumb = Breadcrumb.render({ divider: "|" }, [
        BreadcrumbItem.render("Hello"),
        BreadcrumbItem.render("There")
      ]);
      assert.equal(breadcrumb.children.length, 3);
      assert.equal((breadcrumb.children[0] as VNode).text, "Hello");
      assert.equal((breadcrumb.children[1] as VNode).text, "|");
      breadcrumb = Breadcrumb.render([
        BreadcrumbItem.render("Hello"),
        BreadcrumbItem.render("There")
      ]);
      assert.equal(breadcrumb.children.length, 3);
      assert.equal((breadcrumb.children[0] as VNode).text, "Hello");
      assert.equal((breadcrumb.children[1] as VNode).text, "/");
      breadcrumb = Breadcrumb.render({ size: "tiny" });
      assert.equal(breadcrumb.children.length, 0);
      assert.equal(breadcrumb.data.props.className, "ui tiny breadcrumb");
    });
    it("should support verbose argument object syntax", function () {
      let breadcrumb = Breadcrumb.render({
        props: { divider: "|" },
        content: {
          main: [
            BreadcrumbItem.render("Hello"),
            BreadcrumbItem.render("There")
          ]
        }
      });
      assert.equal(breadcrumb.children.length, 3);
      assert.equal((breadcrumb.children[0] as VNode).text, "Hello");
      assert.equal((breadcrumb.children[1] as VNode).text, "|");
      breadcrumb = Breadcrumb.render({
        content: {
          main: [
            BreadcrumbItem.render("Hello"),
            BreadcrumbItem.render("There")
          ]
        }
      });
      assert.equal(breadcrumb.children.length, 3);
      assert.equal((breadcrumb.children[0] as VNode).text, "Hello");
      assert.equal((breadcrumb.children[1] as VNode).text, "/");
      breadcrumb = Breadcrumb.render({
        props: { size: "tiny" }
      });
      assert.equal(breadcrumb.children.length, 0);
      assert.equal(breadcrumb.data.props.className, "ui tiny breadcrumb");
    });
    it("should support shorthand argument object syntax", function () {
      let breadcrumb = Breadcrumb.render({
        props: { divider: "|" },
        content: [
          BreadcrumbItem.render("Hello"),
          BreadcrumbItem.render("There")
        ]
      });
      assert.equal(breadcrumb.children.length, 3);
      assert.equal((breadcrumb.children[0] as VNode).text, "Hello");
      assert.equal((breadcrumb.children[1] as VNode).text, "|");
      breadcrumb = Breadcrumb.render({
        content: [
          BreadcrumbItem.render("Hello"),
          BreadcrumbItem.render("There")
        ]
      });
      assert.equal(breadcrumb.children.length, 3);
      assert.equal((breadcrumb.children[0] as VNode).text, "Hello");
      assert.equal((breadcrumb.children[1] as VNode).text, "/");
    });
    it("should have only one section when given only 1 child", function () {
      let breadcrumb = Breadcrumb.render(BreadcrumbItem.render("Hello"));
      assert.equal(breadcrumb.children.length, 1);
      let child = breadcrumb.children[0] as VNode;
      assert.equal(child.text, "Hello");
      assert.equal(child.data.props.className, "section");
    });
    it("should seperate multiple children with dividers", function () {
      let breadcrumb = Breadcrumb.render([
          BreadcrumbItem.render("Child1"),
          BreadcrumbItem.render("Child2"),
          BreadcrumbItem.render("Child3")
        ]);
      assert.equal(breadcrumb.children.length, 5);
      let divider = breadcrumb.children[1] as VNode;
      assert.equal(divider.data.props.className, "divider");
    });
    it("should allow for icon and string dividers", function () {
      let breadcrumb = Breadcrumb.render({ divider: "|" }, [
        BreadcrumbItem.render("Child1"),
        BreadcrumbItem.render("Child2")
      ]);
      let divider = breadcrumb.children[1] as VNode;
      assert.equal(divider.text, "|");
      breadcrumb = Breadcrumb.render({ divider: Icon.render(IconType.AngleRight) }, [
        BreadcrumbItem.render("Child1"),
        BreadcrumbItem.render("Child2")
      ]);
      divider = breadcrumb.children[1] as VNode;
      assert.equal(divider.data.props.className, "angle right icon divider");
    });
    it("should support the size enum", function () {
      let breadcrumb = Breadcrumb.render({ size: "massive" });
      assert.equal(breadcrumb.data.props.className, "ui massive breadcrumb");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___breadcrumb": {
        ".breadcrumb": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a breadcrumb stream", function (done) {
      let breadcrumb = Breadcrumb.run({ DOM: dom });
      breadcrumb.DOM.addListener({
        next: (x) => {
          assert.equal("ui breadcrumb", x.data.props.className);
          done();
        },
        error: (err) => {
          throw (err);
        }
      });
    });
    it("should return an isolated component", function (done) {
      let breadcrumb = Breadcrumb.run({ DOM: dom }, "breadcrumb");
      breadcrumb.DOM.addListener({
        next: (x) => {
          assert.equal("div.___breadcrumb", x.sel);
          done();
        },
        error: (err) => {
          throw (err);
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let breadcrumb = Breadcrumb.run({ DOM: dom }, "breadcrumb");
      breadcrumb.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
