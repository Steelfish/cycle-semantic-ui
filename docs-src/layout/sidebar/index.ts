import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { div} from "@cycle/dom";

export namespace Sidebar {
  export function run(sources) {
    let currentPage$ = sources.router.map(x => x.pathname) as Stream<string>;
    let prefix = "/cycle-semantic-ui";
    const vTree$ = currentPage$.map(page =>
      div(".left.menu", [
        div(".fixed", [
          UI.Menu.render({
            vertical: true, inverted: true,
            attachment: UI.Attachment.None, size: UI.Size.Fluid
          }, [{
            header: true,
            main: ["Introduction", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: prefix + "/", active: page === prefix + "/" || page === prefix + "/home",
                main: "About"
              }])]
          },
          {
            header: true,
            main: ["Elements", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: prefix + "/elements/button", active: page === prefix + "/elements/button",
                main: "Button"
              }, {
                link: true, href: prefix + "/elements/container", active: page === prefix + "/elements/container",
                main: "Container"
              }, {
                link: true, href: prefix + "/elements/divider", active: page === prefix + "/elements/divider",
                main: "Divider"
              }, {
                link: true, href: prefix + "/elements/header", active: page === prefix + "/elements/header",
                main: "Header"
              }, {
                link: true, href: prefix + "/elements/icon", active: page === prefix + "/elements/icon",
                main: "Icon"
              }, {
                link: true, href: prefix + "/elements/image", active: page === prefix + "/elements/image",
                main: "Image"
              }, {
                link: true, href: prefix + "/elements/label", active: page === prefix + "/elements/label",
                main: "Label"
              }, {
                link: true, href: prefix + "/elements/list", active: page === prefix + "/elements/list",
                main: "List"
              }, {
                link: true, href: prefix + "/elements/loader", active: page === prefix + "/elements/loader",
                main: "Loader"
              }, {
                link: true, href: prefix + "/elements/segment", active: page === prefix + "/elements/segment",
                main: "Segment"
              }, {
                link: true, href: prefix + "/elements/step", active: page === prefix + "/elements/step",
                main: "Step"
              }, {
                link: true, href: prefix + "/elements/textbox", active: page === prefix + "/elements/textbox",
                main: "Textbox"
              }])]
          },
          {
            header: true,
            main: ["Collections", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: prefix + "/collections/breadcrumb", active: page === prefix + "/collections/breadcrumb",
                main: "Breadcrumb"
              }, {
                link: true, href: prefix + "/collections/form", active: page === prefix + "/collections/form",
                main: "Form"
              }, {
                link: true, href: prefix + "/collections/grid", active: page === prefix + "/collections/grid",
                main: "Grid"
              }, {
                link: true, href: prefix + "/collections/menu", active: page === prefix + "/collections/menu",
                main: "Menu"
              }, {
                link: true, href: prefix + "/collections/message", active: page === prefix + "/collections/message",
                main: "Message"
              }, {
                link: true, href: prefix + "/collections/table", active: page === prefix + "/collections/table",
                main: "Table"
              }])]
          },
          {
            header: true,
            main: ["Modules", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: prefix + "/modules/checkbox", active: page === prefix + "/modules/checkbox",
                main: "Checkbox"
              }, {
                link: true, href: prefix + "/modules/dimmer", active: page === prefix + "/modules/dimmer",
                main: "Dimmer"
              }, {
                link: true, href: prefix + "/modules/dropdown", active: page === prefix + "/modules/dropdown",
                main: "Dropdown"
              }, {
                link: true, href: prefix + "/modules/modal", active: page === prefix + "/modules/modal",
                main: "Modal"
              }, {
                link: true, href: prefix + "/modules/popup", active: page === prefix + "/modules/popup",
                main: "Popup"
              }, {
                link: true, href: prefix + "/modules/progress", active: page === prefix + "/modules/progress",
                main: "Progress"
              }, {
                link: true, href: prefix + "/modules/transition", active: page === prefix + "/modules/transition",
                main: "Transition"
              }])]
          },
          {
            header: true,
            main: ["Views", UI.Menu.render(
              { submenu: true, }, [{
                link: true, href: prefix + "/views/statistic", active: page === prefix + "/views/statistic",
                main: "Statistic"
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
