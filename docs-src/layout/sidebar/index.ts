import * as UI from "../../ui";
import xs, { Stream } from "xstream";
// tslint:disable-next-line:no-unused-variable
import { div, VNode } from "@cycle/dom";

export namespace Sidebar {
  export function run(sources) {
    let currentPage$ = sources.router.history$.map(x => x.pathname) as Stream<string>;
    let prefix = "/cycle-semantic-ui";
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
                link: true, href: prefix + "/", active: page === prefix + "/" || page === prefix + "/home",
                body: "About"
              }])]
          },
          {
            header: true,
            body: ["Elements", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: prefix + "/elements/button", active: page === prefix + "/elements/button",
                body: "Button"
              }, {
                link: true, href: prefix + "/elements/container", active: page === prefix + "/elements/container",
                body: "Container"
              }, {
                link: true, href: prefix + "/elements/divider", active: page === prefix + "/elements/divider",
                body: "Divider"
              }, {
                link: true, href: prefix + "/elements/header", active: page === prefix + "/elements/header",
                body: "Header"
              }, {
                link: true, href: prefix + "/elements/icon", active: page === prefix + "/elements/icon",
                body: "Icon"
              }, {
                link: true, href: prefix + "/elements/image", active: page === prefix + "/elements/image",
                body: "Image"
              }, {
                link: true, href: prefix + "/elements/label", active: page === prefix + "/elements/label",
                body: "Label"
              }, {
                link: true, href: prefix + "/elements/list", active: page === prefix + "/elements/list",
                body: "List"
              }, {
                link: true, href: prefix + "/elements/loader", active: page === prefix + "/elements/loader",
                body: "Loader"
              }, {
                link: true, href: prefix + "/elements/segment", active: page === prefix + "/elements/segment",
                body: "Segment"
              }, {
                link: true, href: prefix + "/elements/step", active: page === prefix + "/elements/step",
                body: "Step"
              }, {
                link: true, href: prefix + "/elements/textbox", active: page === prefix + "/elements/textbox",
                body: "Textbox"
              }])]
          },
          {
            header: true,
            body: ["Collections", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: prefix + "/collections/breadcrumb", active: page === prefix + "/collections/breadcrumb",
                body: "Breadcrumb"
              }, {
                link: true, href: prefix + "/collections/form", active: page === prefix + "/collections/form",
                body: "Form"
              }, {
                link: true, href: prefix + "/collections/grid", active: page === prefix + "/collections/grid",
                body: "Grid"
              }, {
                link: true, href: prefix + "/collections/menu", active: page === prefix + "/collections/menu",
                body: "Menu"
              }, {
                link: true, href: prefix + "/collections/message", active: page === prefix + "/collections/message",
                body: "Message"
              }, {
                link: true, href: prefix + "/collections/table", active: page === prefix + "/collections/table",
                body: "Table"
              }])]
          },
          {
            header: true,
            body: ["Modules", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: prefix + "/modules/checkbox", active: page === prefix + "/modules/checkbox",
                body: "Checkbox"
              }, {
                link: true, href: prefix + "/modules/dimmer", active: page === prefix + "/modules/dimmer",
                body: "Dimmer"
              }, {
                link: true, href: prefix + "/modules/dropdown", active: page === prefix + "/modules/dropdown",
                body: "Dropdown"
              }, {
                link: true, href: prefix + "/modules/modal", active: page === prefix + "/modules/modal",
                body: "Modal"
              }, {
                link: true, href: prefix + "/modules/popup", active: page === prefix + "/modules/popup",
                body: "Popup"
              }, {
                link: true, href: prefix + "/modules/progress", active: page === prefix + "/modules/progress",
                body: "Progress"
              }, {
                link: true, href: prefix + "/modules/transition", active: page === prefix + "/modules/transition",
                body: "Transition"
              }])]
          },
          {
            header: true,
            body: ["Views", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: prefix + "/views/statistic", active: page === prefix + "/views/statistic",
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
