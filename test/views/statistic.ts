import * as assert from "assert";
import { Statistic } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Statistic", function () {
  describe("render", function () {
    it("should return a basic statistic when called without any arguments", function () {
      let statistic = Statistic.render();
      assert.equal(statistic.data.props.className, "ui statistic");
      assert.equal(statistic.children.length, 1);
    });
    it("should support argument syntax", function () {
      let statistic = Statistic.render({ horizontal: true }, "Content");
      assert.equal(statistic.children.length, 1);
      assert.equal(statistic.data.props.className, "ui horizontal statistic");
      assert.equal((statistic.children[0] as VNode).text, "Content");
      statistic = Statistic.render("Content");
      assert.equal(statistic.children.length, 1);
      assert.equal(statistic.data.props.className, "ui statistic");
      assert.equal((statistic.children[0] as VNode).text, "Content");
      statistic = Statistic.render({ horizontal: true });
      assert.equal(statistic.children.length, 1);
      assert.equal(statistic.data.props.className, "ui horizontal statistic");
    });
    it("should support verbose argument object syntax", function () {
      let statistic = Statistic.render({
        props: { horizontal: true },
        content: {
          main: "Content",
          label: "100%"
        }
      });
      assert.equal(statistic.children.length, 2);
      assert.equal(statistic.data.props.className, "ui horizontal statistic");
      assert.equal((statistic.children[0] as VNode).text, "Content");
      assert.equal((statistic.children[1] as VNode).text, "100%");
      statistic = Statistic.render({
        content: {
          main: "Content"
        }
      });
      assert.equal(statistic.children.length, 1);
      assert.equal(statistic.data.props.className, "ui statistic");
      assert.equal((statistic.children[0] as VNode).text, "Content");
      statistic = Statistic.render({
        content: {
          label: "100$"
        }
      });
      assert.equal(statistic.children.length, 2);
      assert.equal(statistic.data.props.className, "ui statistic");
      assert.equal((statistic.children[1] as VNode).text, "100$");
      statistic = Statistic.render({
        props: { horizontal: true }
      });
      assert.equal(statistic.children.length, 1);
      assert.equal(statistic.data.props.className, "ui horizontal statistic");
    });
    it("should support shorthand argument object syntax", function () {
      let statistic = Statistic.render({
        props: { horizontal: true },
        content: "Content"
      });
      assert.equal(statistic.children.length, 1);
      assert.equal(statistic.data.props.className, "ui horizontal statistic");
      assert.equal((statistic.children[0] as VNode).text, "Content");
      statistic = Statistic.render({
        content: "Content"
      });
      assert.equal(statistic.children.length, 1);
      assert.equal(statistic.data.props.className, "ui statistic");
      assert.equal((statistic.children[0] as VNode).text, "Content");
      statistic = Statistic.render({
        props: { horizontal: true }
      });
      assert.equal(statistic.children.length, 1);
      assert.equal(statistic.data.props.className, "ui horizontal statistic");
    });
    it("should support the text variation", function () {
      let statistic = Statistic.render({ text: true });
      assert.equal(statistic.data.props.className, "ui text statistic");
    });
    it("should support the horizontal variation", function () {
      let statistic = Statistic.render({ horizontal: true });
      assert.equal(statistic.data.props.className, "ui horizontal statistic");
    });
    it("should support the inverted variation", function () {
      let statistic = Statistic.render({ inverted: true });
      assert.equal(statistic.data.props.className, "ui inverted statistic");
    });
    it("should support the color enum", function () {
      let statistic = Statistic.render({ color: "primary" });
      assert.equal(statistic.data.props.className, "ui primaryColored statistic");
    });
    it("should support the size enum", function () {
      let statistic = Statistic.render({ size: "massive" });
      assert.equal(statistic.data.props.className, "ui massive statistic");
    });
    it("should support the float enum", function () {
      let statistic = Statistic.render({ float: "right" });
      assert.equal(statistic.data.props.className, "ui right floated statistic");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___statistic": {
        ".statistic": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a statistic stream", function (done) {
      let statistic = Statistic.run({ DOM: dom });
      statistic.DOM.addListener({
        next: (x) => {
          assert.equal("ui statistic", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let statistic = Statistic.run({ DOM: dom }, "statistic");
      statistic.DOM.addListener({
        next: (x) => {
          assert.equal("div.___statistic", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let statistic = Statistic.run({ DOM: dom }, "statistic");
      statistic.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
