import * as assert from "assert";
import { Message } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Message", function () {
  describe("render", function () {
    it("should return a basic message when called without any arguments", function () {
      let message = Message.render();
      assert.equal(message.data.props.className, "ui message");
      assert.equal(message.children.length, 1);
    });
    it("should support argument syntax", function () {
      let message = Message.render({ compact: true }, "Content");
      assert.equal(message.children.length, 1);
      assert.equal(message.data.props.className, "ui compact message");
      assert.equal(((message.children[0] as VNode).children[0] as VNode).text, "Content");
      message = Message.render(["Content"]);
      assert.equal(message.children.length, 1);
      assert.equal(message.data.props.className, "ui message");
      assert.equal(((message.children[0] as VNode).children[0] as VNode).text, "Content");
      message = Message.render({ compact: true });
      assert.equal(message.children.length, 1);
      assert.equal(message.data.props.className, "ui compact message");
    });
    it("should support verbose argument object syntax", function () {
      let message = Message.render({
        props: { compact: true },
        content: {
          main: "Content"
        }
      });
      assert.equal(message.children.length, 1);
      assert.equal(message.data.props.className, "ui compact message");
      assert.equal(((message.children[0] as VNode).children[0] as VNode).text, "Content");
      message = Message.render({
        content: {
          main: "Content"
        }
      });
      assert.equal(message.children.length, 1);
      assert.equal(message.data.props.className, "ui message");
      assert.equal(((message.children[0] as VNode).children[0] as VNode).text, "Content");
      message = Message.render({
        props: { compact: true }
      });
      assert.equal(message.children.length, 1);
      assert.equal(message.data.props.className, "ui compact message");
    });
    it("should support shorthand argument object syntax", function () {
      let message = Message.render({
        props: { compact: true },
        content: "Content"
      });
      assert.equal(message.children.length, 1);
      assert.equal(message.data.props.className, "ui compact message");
      assert.equal(((message.children[0] as VNode).children[0] as VNode).text, "Content");
      message = Message.render({
        content: "Content"
      });
      assert.equal(message.children.length, 1);
      assert.equal(message.data.props.className, "ui message");
      assert.equal(((message.children[0] as VNode).children[0] as VNode).text, "Content");
      message = Message.render({
        props: { compact: true }
      });
      assert.equal(message.children.length, 1);
      assert.equal(message.data.props.className, "ui compact message");
    });
    it("should support the icon variation", function () {
      let message = Message.render({ icon: true });
      assert.equal(message.data.props.className, "ui icon message");
    });
    it("should support the floating variation", function () {
      let message = Message.render({ floating: true });
      assert.equal(message.data.props.className, "ui floating message");
    });
    it("should support the compact variation", function () {
      let message = Message.render({ compact: true });
      assert.equal(message.data.props.className, "ui compact message");
    });
    it("should support the attachment enum", function () {
      let message = Message.render({ attachment: "none" });
      assert.equal(message.data.props.className, "ui attached message");
    });
    it("should support the color enum", function () {
      let message = Message.render({ color: "primary" });
      assert.equal(message.data.props.className, "ui primaryColored message");
    });
    it("should support the size enum", function () {
      let message = Message.render({ size: "massive" });
      assert.equal(message.data.props.className, "ui massive message");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___message": {
        ".message": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a message stream", function (done) {
      let message = Message.run({ DOM: dom });
      message.DOM.addListener({
        next: (x) => {
          assert.equal(x.data.props.className, "ui message transition visible", );
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let message = Message.run({ DOM: dom }, "message");
      message.DOM.addListener({
        next: (x) => {
          assert.equal(x.sel, "div.___message");
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let message = Message.run({ DOM: dom }, "message");
      message.events("click").addListener({
        next: (x) => {
          assert.equal(x, "Clicked");
          done();
        }
      });
    });
    it("should allow setting the visibility of the message through the on$ arg", function (done) {
      let hiddenMessage = Message.run({ DOM: dom, args: { on$: xs.of(false) } }, "message");
      let visibleMessage = Message.run({ DOM: dom, args: { on$: xs.of(true) } }, "message");
      hiddenMessage.DOM.addListener({
        next: (x) => {
          assert.equal(x.data.props.className, "ui message transition hidden", );
        }
      });
      visibleMessage.DOM.addListener({
        next: (x) => {
          assert.equal(x.data.props.className, "ui message transition visible", );
          done();
        }
      });
    });
    it("should add a close icon with the closeable arg", function (done) {
      let message = Message.run({ DOM: dom, args: { closeable: true } }, "message");
      message.DOM.addListener({
        next: (x) => {
          assert.equal((x.children[0] as VNode).data.props.className, "close icon");
          done();
        }
      });
    });
  });
});
