import * as assert from "assert";
import { Image } from "../../src";
import { mockDOMSource } from "@cycle/dom";
import xs from "xstream";

describe("Image", function () {
  describe("render", function () {
    it("should return a basic image when called without any arguments", function () {
      let image = Image.render();
      assert.equal(image.data.props.className, "ui image");
    });
    it("should support argument syntax", function () {
      let image = Image.render({ circular: true }, "Content");
      assert.equal(image.data.props.className, "ui circular image");
      assert.equal(image.data.props.src, "Content");
      image = Image.render("Content");
      assert.equal(image.data.props.className, "ui image");
      assert.equal(image.data.props.src, "Content");
      image = Image.render({ circular: true });
      assert.equal(image.data.props.className, "ui circular image");
    });
    it("should support verbose argument object syntax", function () {
      let image = Image.render({
        props: { circular: true },
        content: {
          main: "Content"
        }
      });
      assert.equal(image.data.props.className, "ui circular image");
      assert.equal(image.data.props.src, "Content");
      image = Image.render({
        content: {
          main: "Content"
        }
      });
      assert.equal(image.data.props.className, "ui image");
      assert.equal(image.data.props.src, "Content");
      image = Image.render({
        props: { circular: true }
      });
      assert.equal(image.data.props.className, "ui circular image");
    });
    it("should support shorthand argument object syntax", function () {
      let image = Image.render({
        props: { circular: true },
        content: "Content"
      });
      assert.equal(image.data.props.className, "ui circular image");
      assert.equal(image.data.props.src, "Content");
      image = Image.render({
        content: "Content"
      });
      assert.equal(image.data.props.className, "ui image");
      assert.equal(image.data.props.src, "Content");
      image = Image.render({
        props: { circular: true }
      });
      assert.equal(image.data.props.className, "ui circular image");
    });
    it("should return a link only when the href property is set", function () {
      let image = Image.render("normal");
      let image2 = Image.render({ href: "#" }, "link");
      assert.equal(image.sel, "img");
      assert.equal(image2.sel, "a");
    });
    it("should support the hidden variation", function () {
      let image = Image.render({ hidden: true });
      assert.equal(image.data.props.className, "ui hidden image");
    });
    it("should support the disabled variation", function () {
      let image = Image.render({ disabled: true });
      assert.equal(image.data.props.className, "ui disabled image");
    });
    it("should support the avatar variation", function () {
      let image = Image.render({ avatar: true });
      assert.equal(image.data.props.className, "ui avatar image");
    });
    it("should support the bordered variation", function () {
      let image = Image.render({ bordered: true });
      assert.equal(image.data.props.className, "ui bordered image");
    });
    it("should support the spaced variation", function () {
      let image = Image.render({ spaced: true });
      assert.equal(image.data.props.className, "ui spaced image");
    });
    it("should support the circular variation", function () {
      let image = Image.render({ circular: true });
      assert.equal(image.data.props.className, "ui circular image");
    });
    it("should support the rounded variation", function () {
      let image = Image.render({ rounded: true });
      assert.equal(image.data.props.className, "ui rounded image");
    });
    it("should support the size enum", function () {
      let image = Image.render({ size: "massive" });
      assert.equal(image.data.props.className, "ui massive image");
    });
    it("should support the vertical alignment enum", function () {
      let image = Image.render({ alignment: "top" });
      assert.equal(image.data.props.className, "ui top aligned image");
    });
    it("should support the float enum", function () {
      let image = Image.render({ float: "right" });
      assert.equal(image.data.props.className, "ui right floated image");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___image": {
        ".image": {
          "click": xs.of("Clicked")
        }
      }
    });
    it("should return a image stream", function (done) {
      let image = Image.run({ DOM: dom });
      image.DOM.addListener({
        next: (x) => {
          assert.equal("ui image", x.data.props.className);
          done();
        }
      });
    });
    it("should return an isolated component", function (done) {
      let image = Image.run({ DOM: dom }, "image");
      image.DOM.addListener({
        next: (x) => {
          assert.equal("img.___image", x.sel);
          done();
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let image = Image.run({ DOM: dom }, "image");
      image.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
  });
});
