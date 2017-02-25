import * as assert from "assert";
import { Menu } from "../../src";
import { mockDOMSource, VNode } from "@cycle/dom";
import xs from "xstream";

describe("Menu", function () {
  describe("render", function () {
    it("should return a basic menu when called without any arguments", function () {
      let menu = Menu.render();
      assert.equal(menu.data.props.className, "ui menu");
      assert.equal(menu.children.length, 0);
    });
    it("should support argument syntax", function () {
      let menu = Menu.render({ tabular: true }, [{ main: "Hello" }]);
      assert.equal(menu.children.length, 1);
      assert.equal((menu.children[0] as VNode).text, "Hello");
      assert.equal(menu.data.props.className, "ui tabular menu");
      menu = Menu.render([{ main: "Hello" }]);
      assert.equal(menu.children.length, 1);
      assert.equal((menu.children[0] as VNode).text, "Hello");
      menu = Menu.render({ tabular: true });
      assert.equal(menu.children.length, 0);
      assert.equal(menu.data.props.className, "ui tabular menu");
    });
    it("should support verbose argument object syntax", function () {
      let menu = Menu.render({
        props: { tabular: true },
        content: {
          main: [{ main: "Hello" }]
        }
      });
      assert.equal(menu.children.length, 1);
      assert.equal((menu.children[0] as VNode).text, "Hello");
      assert.equal(menu.data.props.className, "ui tabular menu");
      menu = Menu.render({
        content: {
          main: [{ main: "Hello" }]
        }
      });
      assert.equal(menu.children.length, 1);
      assert.equal((menu.children[0] as VNode).text, "Hello");
      menu = Menu.render({
        props: { tabular: true }
      });
      assert.equal(menu.children.length, 0);
      assert.equal(menu.data.props.className, "ui tabular menu");
    });
    it("should support shorthand argument object syntax", function () {
      let menu = Menu.render({
        props: { tabular: true },
        content: [{ main: "Hello" }]
      });
      assert.equal(menu.children.length, 1);
      assert.equal(menu.data.props.className, "ui tabular menu");
      assert.equal((menu.children[0] as VNode).text, "Hello");
      menu = Menu.render({
        content: [{ main: "Hello" }]
      });
      assert.equal(menu.children.length, 1);
      assert.equal((menu.children[0] as VNode).text, "Hello");
    });
    it("should return a link if items set the href property", function () {
      let menu = Menu.render([{ main: "Hello", href: "#" }]);
      assert.equal((menu.children[0] as VNode).sel, "a");
      assert.equal((menu.children[0] as VNode).data.props.href, "#");
    });
    it("should support the submenu variation", function () {
      let menu = Menu.render({ submenu: true });
      assert.equal(menu.data.props.className, "menu");
    });
    it("should support the right variation", function () {
      let menu = Menu.render({ right: true });
      assert.equal(menu.data.props.className, "ui right menu");
    });
    it("should support the secondary variation", function () {
      let menu = Menu.render({ secondary: true });
      assert.equal(menu.data.props.className, "ui secondary menu");
    });
    it("should support the pointing variation", function () {
      let menu = Menu.render({ pointing: true });
      assert.equal(menu.data.props.className, "ui pointing menu");
    });
    it("should support the tabular variation", function () {
      let menu = Menu.render({ tabular: true });
      assert.equal(menu.data.props.className, "ui tabular menu");
    });
    it("should support the text variation", function () {
      let menu = Menu.render({ text: true });
      assert.equal(menu.data.props.className, "ui text menu");
    });
    it("should support the vertical variation", function () {
      let menu = Menu.render({ vertical: true });
      assert.equal(menu.data.props.className, "ui vertical menu");
    });
    it("should support the pagination variation", function () {
      let menu = Menu.render({ pagination: true });
      assert.equal(menu.data.props.className, "ui pagination menu");
    });
    it("should support the fixed variation", function () {
      let menu = Menu.render({ fixed: true });
      assert.equal(menu.data.props.className, "ui fixed menu");
    });
    it("should support the stackable variation", function () {
      let menu = Menu.render({ stackable: true });
      assert.equal(menu.data.props.className, "ui stackable menu");
    });
    it("should support the inverted variation", function () {
      let menu = Menu.render({ inverted: true });
      assert.equal(menu.data.props.className, "ui inverted menu");
    });
    it("should support the icon variation", function () {
      let menu = Menu.render({ icon: true });
      assert.equal(menu.data.props.className, "ui icon menu");
    });
    it("should support the labeled icon variation", function () {
      let menu = Menu.render({ labeledIcons: true });
      assert.equal(menu.data.props.className, "ui labeled icon menu");
    });
    it("should support the compact variation", function () {
      let menu = Menu.render({ compact: true });
      assert.equal(menu.data.props.className, "ui compact menu");
    });
    it("should support the equalWidth variation", function () {
      let menu = Menu.render({ equalWidth: true }, [{ main: "Hello" }, { main: "World" }]);
      assert.equal(menu.data.props.className, "ui two item menu");
    });
    it("should support the borderless variation", function () {
      let menu = Menu.render({ borderless: true });
      assert.equal(menu.data.props.className, "ui borderless menu");
    });
    it("should support the fluid variation", function () {
      let menu = Menu.render({ fluid: true });
      assert.equal(menu.data.props.className, "ui fluid menu");
    });
    it("should support the size enum", function () {
      let menu = Menu.render({ size: "massive" });
      assert.equal(menu.data.props.className, "ui massive menu");
    });
    it("should support the color enum", function () {
      let menu = Menu.render({ color: "primary" });
      assert.equal(menu.data.props.className, "ui primaryColored menu");
    });
    it("should support the attachment enum", function () {
      let menu = Menu.render({ attachment: "top" });
      assert.equal(menu.data.props.className, "ui top attached menu");
    });
    it("should support the link item variation", function () {
      let menu = Menu.render([{ main: "Hello", link: true }]);
      assert.equal((menu.children[0] as VNode).data.props.className, "link item");
    });
    it("should support the active item variation", function () {
      let menu = Menu.render([{ main: "Hello", active: true }]);
      assert.equal((menu.children[0] as VNode).data.props.className, "active item");
    });
    it("should support the disabled item variation", function () {
      let menu = Menu.render([{ main: "Hello", disabled: true }]);
      assert.equal((menu.children[0] as VNode).data.props.className, "disabled item");
    });
    it("should support the header item variation", function () {
      let menu = Menu.render([{ main: "Hello", header: true }]);
      assert.equal((menu.children[0] as VNode).data.props.className, "header item");
    });
    it("should support the fitted item variation", function () {
      let menu = Menu.render([{ main: "Hello", fitted: true }]);
      assert.equal((menu.children[0] as VNode).data.props.className, "fitted item");
    });
    it("should support the vertically fitted item variation", function () {
      let menu = Menu.render([{ main: "Hello", verticallyFitted: true }]);
      assert.equal((menu.children[0] as VNode).data.props.className, "vertically fitted item");
    });
    it("should support the horizontally fitted item variation", function () {
      let menu = Menu.render([{ main: "Hello", horizontallyFitted: true }]);
      assert.equal((menu.children[0] as VNode).data.props.className, "horizontally fitted item");
    });
    it("should support the icon item variation", function () {
      let menu = Menu.render([{ main: "Hello", icon: true }]);
      assert.equal((menu.children[0] as VNode).data.props.className, "icon item");
    });
    it("should support the color item enum", function () {
      let menu = Menu.render([{ main: "Hello", color: "primary" }]);
      assert.equal((menu.children[0] as VNode).data.props.className, "primaryColored item");
    });
    it("should support the float item enum", function () {
      let menu = Menu.render([{ main: "Hello", float: "left" }]);
      assert.equal((menu.children[0] as VNode).data.props.className, "left floated item");
    });
  });
  describe("run", function () {
    let dom = mockDOMSource({
      ".___menu": {
        ".menu": {
          "click": xs.of("Clicked")
        },
        ".menu > .item": {
          "click": xs.of({
            currentTarget: {
              id: "0"
            }
          })
        }
      }
    });
    it("should return a menu stream", function (done) {
      let menu = Menu.run({ DOM: dom });
      menu.DOM.addListener({
        next: (x) => {
          assert.equal("ui menu", x.data.props.className);
          done();
        },
        error: (err) => {
          throw (err);
        }
      });
    });
    it("should return an isolated component", function (done) {
      let menu = Menu.run({ DOM: dom }, "menu");
      menu.DOM.addListener({
        next: (x) => {
          assert.equal("div.___menu", x.sel);
          done();
        },
        error: (err) => {
          throw (err);
        }
      });
    });
    it("should expose events through the events function", function (done) {
      let menu = Menu.run({ DOM: dom }, "menu");
      menu.events("click").addListener({
        next: (x) => {
          assert.equal("Clicked", x);
          done();
        }
      });
    });
    it("should return clicked menu items in the value$", function (done) {
      let menu = Menu.run<Menu.MenuItem>({
        DOM: dom,
        content$: xs.of([{ main: "Clicked" }])
      }, "menu");
      menu.value$.addListener({
        next: (x) => {
          assert.equal("Clicked", x.main);
          done();
        }
      });
    });
  });
});
