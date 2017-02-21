import * as assert from "assert";
import { Header } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xsAdapter from "@cycle/xstream-adapter";
import xs from "xstream";

describe("Header", function () {
  describe("render", function () {
    it("should return a basic header when called without any arguments", function () {
      let header = Header.render();
      assert.equal(header.data.props.className, "ui header");
      assert.equal(header.children.length, 0);
    });
    it("should support argument syntax", function () {
      let header = Header.render({ divider: true }, ["Content"]);
      assert.equal(header.children.length, 1);
      assert.equal(header.data.props.className, "ui divider header");
      assert.equal((header.children[0] as VNode).text, "Content");
      header = Header.render(["Content"]);
      assert.equal(header.children.length, 1);
      assert.equal(header.data.props.className, "ui header");
      assert.equal((header.children[0] as VNode).text, "Content");
      header = Header.render({ divider: true });
      assert.equal(header.children.length, 0);
      assert.equal(header.data.props.className, "ui divider header");
    });
    it("should support verbose argument object syntax", function () {
      let header = Header.render({
        props: { divider: true },
        content: {
          main: "Content",
          subtext: "Subtext"
        }
      });
      assert.equal(header.children.length, 2);
      assert.equal(header.data.props.className, "ui divider header");
      assert.equal((header.children[0] as VNode).text, "Content");
      assert.equal((header.children[1] as VNode).text, "Subtext");
      header = Header.render({
        content: {
          main: "Content",
          subtext: "Subtext"
        }
      });
      assert.equal(header.children.length, 2);
      assert.equal(header.data.props.className, "ui header");
      assert.equal((header.children[0] as VNode).text, "Content");
      assert.equal((header.children[1] as VNode).text, "Subtext");
      header = Header.render({
        content: {
          subtext: "Subtext"
        }
      });
      assert.equal(header.children.length, 1);
      assert.equal((header.children[0] as VNode).data.props.className, "sub header");
      header = Header.render({
        props: { divider: true }
      });
      assert.equal(header.children.length, 0);
      assert.equal(header.data.props.className, "ui divider header");
    });
    it("should support shorthand argument object syntax", function () {
      let header = Header.render({
        props: { divider: true },
        content: ["Content"]
      });
      assert.equal(header.children.length, 1);
      assert.equal(header.data.props.className, "ui divider header");
      assert.equal((header.children[0] as VNode).text, "Content");
      header = Header.render({
        content: ["Content"]
      });
      assert.equal(header.children.length, 1);
      assert.equal(header.data.props.className, "ui header");
      assert.equal((header.children[0] as VNode).text, "Content");
      header = Header.render({
        props: { divider: true }
      });
      assert.equal(header.children.length, 0);
      assert.equal(header.data.props.className, "ui divider header");
    });
    it("should support the icon variation", function () {
      let header = Header.render({ icon: true });
      assert.equal(header.data.props.className, "ui icon header");
    });
    it("should support the divider variation", function () {
      let header = Header.render({ divider: true });
      assert.equal(header.data.props.className, "ui divider header");
    });
    it("should support the dividing variation", function () {
      let header = Header.render({ dividing: true });
      assert.equal(header.data.props.className, "ui dividing header");
    });
    it("should support the block variation", function () {
      let header = Header.render({ block: true });
      assert.equal(header.data.props.className, "ui block header");
    });
    it("should support the disabled variation", function () {
      let header = Header.render({ disabled: true });
      assert.equal(header.data.props.className, "ui disabled header");
    });
    it("should support the inverted variation", function () {
      let header = Header.render({ inverted: true });
      assert.equal(header.data.props.className, "ui inverted header");
    });
    it("should support the size enum", function () {
      let header = Header.render({ size: "massive" });
      assert.equal(header.data.props.className, "ui massive header");
    });
    it("should support the color enum", function () {
      let header = Header.render({ color: "primary" });
      assert.equal(header.data.props.className, "ui primaryColored header");
    });
    it("should support the float enum", function () {
      let header = Header.render({ float: "right" });
      assert.equal(header.data.props.className, "ui right floated header");
    });
    it("should support the attachment enum", function () {
      let header = Header.render({ attachment: "top" });
      assert.equal(header.data.props.className, "ui top attached header");
    });
    it("should support the text alignment enum", function () {
      let header = Header.render({ textAlignment: "left" });
      assert.equal(header.data.props.className, "ui left aligned header");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource(xsAdapter, {
      ".___header": {
        ".header": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a header stream", function (done) {
      let header = Header.run({ DOM: dom });
      header.DOM.addListener({
        next: (x) => {
          assert.equal("ui header", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let header = Header.run({ DOM: dom }, "header");
      header.DOM.addListener({
        next: (x) => {
          assert.equal("div.___header", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let header = Header.run({ DOM: dom }, "header");
      header.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
