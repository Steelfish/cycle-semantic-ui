import * as UI from "../../ui";
import xs, { Stream } from "xstream";
// tslint:disable-next-line:no-unused-variable
import { div, VNode } from "@cycle/dom";

export namespace Sidebar {
  export function run(sources) {
    let currentPage$ = sources.router.history$.map(x => x.pathname) as Stream<string>;
    const vTree$ = currentPage$.map(page =>
      div(".left.menu", [
        div(".fixed", [
          UI.Menu.render({
            vertical: true, inverted: true,
            attachment: UI.Attachment.None, size: UI.Size.Fluid
          }, [{
            header: true,
            body: ["Introduction", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: "/", active: page === "/" || page === "/home",
                body: "About"
              }])]
          },
          {
            header: true,
            body: ["Elements", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: "/elements/button", active: page === "/elements/button",
                body: "Button"
              }, {
                link: true, href: "/elements/container", active: page === "/elements/container",
                body: "Container"
              }, {
                link: true, href: "/elements/divider", active: page === "/elements/divider",
                body: "Divider"
              }, {
                link: true, href: "/elements/header", active: page === "/elements/header",
                body: "Header"
              }, {
                link: true, href: "/elements/icon", active: page === "/elements/icon",
                body: "Icon"
              }, {
                link: true, href: "/elements/image", active: page === "/elements/image",
                body: "Image"
              }, {
                link: true, href: "/elements/label", active: page === "/elements/label",
                body: "Label"
              }, {
                link: true, href: "/elements/list", active: page === "/elements/list",
                body: "List"
              }, {
                link: true, href: "/elements/loader", active: page === "/elements/loader",
                body: "Loader"
              }, {
                link: true, href: "/elements/segment", active: page === "/elements/segment",
                body: "Segment"
              }, {
                link: true, href: "/elements/step", active: page === "/elements/step",
                body: "Step"
              }, {
                link: true, href: "/elements/textbox", active: page === "/elements/textbox",
                body: "Textbox"
              }])]
          },
          {
            header: true,
            body: ["Collections", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: "/collections/breadcrumb", active: page === "/collections/breadcrumb",
                body: "Breadcrumb"
              }, {
                link: true, href: "/collections/form", active: page === "/collections/form",
                body: "Form"
              }, {
                link: true, href: "/collections/grid", active: page === "/collections/grid",
                body: "Grid"
              }, {
                link: true, href: "/collections/menu", active: page === "/collections/menu",
                body: "Menu"
              }, {
                link: true, href: "/collections/message", active: page === "/collections/message",
                body: "Message"
              }, {
                link: true, href: "/collections/table", active: page === "/collections/table",
                body: "Table"
              }])]
          },
          {
            header: true,
            body: ["Modules", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: "/modules/checkbox", active: page === "/modules/checkbox",
                body: "Checkbox"
              }, {
                link: true, href: "/modules/dimmer", active: page === "/modules/dimmer",
                body: "Dimmer"
              }, {
                link: true, href: "/modules/dropdown", active: page === "/modules/dropdown",
                body: "Dropdown"
              }, {
                link: true, href: "/modules/modal", active: page === "/modules/modal",
                body: "Modal"
              }, {
                link: true, href: "/modules/popup", active: page === "/modules/popup",
                body: "Popup"
              }, {
                link: true, href: "/modules/progress", active: page === "/modules/progress",
                body: "Progress"
              }, {
                link: true, href: "/modules/transition", active: page === "/modules/transition",
                body: "Transition"
              }])]
          },
          {
            header: true,
            body: ["Views", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: "/views/statistic", active: page === "/views/statistic",
                body: "Statistic"
              }])]
          }])
        ])
      ])
    );
    return {
      DOM: vTree$,
      router: xs.never()
    };
  }
}
