import * as assert from "assert";
import { Table } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Table", function () {
  describe("render", function () {
    it("should return a basic table when called without any arguments", function () {
      let table = Table.render();
      assert.equal(table.data.props.className, "ui table");
      assert.equal(table.children.length, 1);
    });
    it("should support argument syntax", function () {
      let table = Table.render({ striped: true }, [["Content"]]);
      assert.equal(table.children.length, 1);
      assert.equal(table.data.props.className, "ui striped table");
      assert.equal((((table.children[0] as VNode).children[0] as VNode).children[0] as VNode).text, "Content");
      table = Table.render([["Content"]]);
      assert.equal(table.children.length, 1);
      assert.equal(table.data.props.className, "ui table");
      assert.equal((((table.children[0] as VNode).children[0] as VNode).children[0] as VNode).text, "Content");
      table = Table.render({ striped: true });
      assert.equal(table.children.length, 1);
      assert.equal(table.data.props.className, "ui striped table");
    });
    it("should support verbose argument object syntax", function () {
      let table = Table.render({
        props: { striped: true },
        content: {
          main: [["Content"]]
        }
      });
      assert.equal(table.children.length, 1);
      assert.equal(table.data.props.className, "ui striped table");
      assert.equal((((table.children[0] as VNode).children[0] as VNode).children[0] as VNode).text, "Content");
      table = Table.render({
        content: {
          main: [["Content"]]
        }
      });
      assert.equal(table.children.length, 1);
      assert.equal(table.data.props.className, "ui table");
      assert.equal((((table.children[0] as VNode).children[0] as VNode).children[0] as VNode).text, "Content");
      table = Table.render({
        props: { striped: true }
      });
      assert.equal(table.children.length, 1);
      assert.equal(table.data.props.className, "ui striped table");
    });
    it("should support shorthand argument object syntax", function () {
      let table = Table.render({
        props: { striped: true },
        content: [["Content"]]
      });
      assert.equal(table.children.length, 1);
      assert.equal(table.data.props.className, "ui striped table");
      assert.equal((((table.children[0] as VNode).children[0] as VNode).children[0] as VNode).text, "Content");
      table = Table.render({
        content: [["Content"]]
      });
      assert.equal(table.children.length, 1);
      assert.equal(table.data.props.className, "ui table");
      assert.equal((((table.children[0] as VNode).children[0] as VNode).children[0] as VNode).text, "Content");
      table = Table.render({
        props: { striped: true }
      });
      assert.equal(table.children.length, 1);
      assert.equal(table.data.props.className, "ui striped table");
    });
    it("should support the striped variation", function () {
      let table = Table.render({ striped: true });
      assert.equal(table.data.props.className, "ui striped table");
    });
    it("should support the singleline variation", function () {
      let table = Table.render({ singleLine: true });
      assert.equal(table.data.props.className, "ui single line table");
    });
    it("should support the fixed variation", function () {
      let table = Table.render({ fixed: true });
      assert.equal(table.data.props.className, "ui fixed table");
    });
    it("should support the selectable variation", function () {
      let table = Table.render({ selectable: true });
      assert.equal(table.data.props.className, "ui selectable table");
    });
    it("should support the celled variation", function () {
      let table = Table.render({ celled: true });
      assert.equal(table.data.props.className, "ui celled table");
    });
    it("should support the basic variation", function () {
      let table = Table.render({ basic: true });
      assert.equal(table.data.props.className, "ui basic table");
    });
    it("should support the very basic variation", function () {
      let table = Table.render({ veryBasic: true });
      assert.equal(table.data.props.className, "ui very basic table");
    });
    it("should support the collapsing variation", function () {
      let table = Table.render({ collapsing: true });
      assert.equal(table.data.props.className, "ui collapsing table");
    });
    it("should support the padded variation", function () {
      let table = Table.render({ padded: true });
      assert.equal(table.data.props.className, "ui padded table");
    });
    it("should support the verypadded variation", function () {
      let table = Table.render({ veryPadded: true });
      assert.equal(table.data.props.className, "ui very padded table");
    });
    it("should support the compact variation", function () {
      let table = Table.render({ compact: true });
      assert.equal(table.data.props.className, "ui compact table");
    });
    it("should support the very compact variation", function () {
      let table = Table.render({ veryCompact: true });
      assert.equal(table.data.props.className, "ui very compact table");
    });
    it("should support the size enum", function () {
      let table = Table.render({ size: "massive" });
      assert.equal(table.data.props.className, "ui massive table");
    });
    it("should support the color enum", function () {
      let table = Table.render({ color: "primary" });
      assert.equal(table.data.props.className, "ui primaryColored table");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___table": {
        ".table": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a table stream", function (done) {
      let table = Table.run({ DOM: dom });
      table.DOM.addListener({
        next: (x) => {
          assert.equal("ui table", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let table = Table.run({ DOM: dom }, "table");
      table.DOM.addListener({
        next: (x) => {
          assert.equal("table.___table", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let table = Table.run({ DOM: dom }, "table");
      table.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
