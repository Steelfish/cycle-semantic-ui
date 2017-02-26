import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { p, VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace Content {
  export function run(sources): Stream<VNode[]> {
    let headerEx = createHeaderExamples(sources);
    let textEx = createTextExamples(sources);
    let inputEx = createInputExamples(sources);
    let buttonEx = createButtonExamples(sources);
    let linkEx = createLinkExamples(sources);
    let dropdownEx = createDropdownExamples(sources);
    let popupEx = createPopupExamples(sources);
    let searchEx = createSearchExamples(sources);
    let menuEx = createMenuExamples(sources);
    let subMenuEx = createSubMenuExamples(sources);

    let examples = [].concat(headerEx, textEx, inputEx, buttonEx,
      linkEx, dropdownEx, popupEx, searchEx, menuEx, subMenuEx);



    return xs.combine.apply(null, examples);
  }

  function createHeaderExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Header",
      description: "A menu item may include a header or may itself be a header",
      VNode$: xs.of(UI.Menu.render([
        { header: true, main: "Our company" },
        { main: "About us" },
        { main: "Jobs" },
        { main: "Locations" }
      ])),
      code: `UI.Menu.render([
        {header: true, main: "Our company"},
        {main: "About us"},
        {main: "Jobs"},
        {main: "Locations"}
      ])`
    });

    let ex2 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ vertical: true }, [
        {
          header: true,
          main: [
            "Products",
            UI.Menu.render({ submenu: true }, [
              { main: "Enterprise" },
              { main: "Consumer" }
            ])
          ]
        },
        {
          header: true,
          main: [
            "CMS Solutions",
            UI.Menu.render({ submenu: true }, [
              { main: "Rails" },
              { main: "Python" },
              { main: "PHP" }
            ])
          ]
        }, {
          header: true,
          main: [
            "Hosting",
            UI.Menu.render({ submenu: true }, [
              { main: "Shared" },
              { main: "Dedicated" }
            ])
          ]
        }, {
          header: true,
          main: [
            "Support",
            UI.Menu.render({ submenu: true }, [
              { main: "E-mail Support" },
              { main: "FAQs" }
            ])
          ]
        }
      ])),
      code: `UI.Menu.render({ vertical: true }, [
        {
          header: true,
          main: [
            "Products",
            UI.Menu.render({ submenu: true }, [
              { main: "Enterprise" },
              { main: "Consumer" }
            ])
          ]
        },
        {
          header: true,
          main: [
            "CMS Solutions",
            UI.Menu.render({ submenu: true }, [
              { main: "Rails" },
              { main: "Python" },
              { main: "PHP" }
            ])
          ]
        }, {
          header: true,
          main: [
            "Hosting",
            UI.Menu.render({ submenu: true }, [
              { main: "Shared" },
              { main: "Dedicated" }
            ])
          ]
        }, {
          header: true,
          main: [
            "Support",
            UI.Menu.render({ submenu: true }, [
              { main: "E-mail Support" },
              { main: "FAQs" }
            ])
          ]
        }
      ])`
    });

    return [ex.DOM, ex2.DOM];
  }
  function createTextExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Text",
      description: "A vertical menu item can include any type of text content.",
      VNode$: xs.of(UI.Menu.render({ vertical: true }, [
        {
          main: [
            UI.Header.render("Promotions"),
            p("Check out our new promotions"),
          ]
        },
        {
          main: [
            UI.Header.render("Coupons"),
            p("Check out our collection of coupons"),
          ]
        },
        {
          main: [
            UI.Header.render("Rebates"),
            p("Visit our rebate forum for information on claiming rebates"),
          ]
        }
      ])),
      code: `UI.Menu.render({ vertical: true }, [
        {
          main: [
            UI.Header.render("Promotions"),
            p("Check out our new promotions"),
          ]
        },
        {
          main: [
            UI.Header.render("Coupons"),
            p("Check out our collection of coupons"),
          ]
        },
        {
          main: [
            UI.Header.render("Rebates"),
            p("Visit our rebate forum for information on claiming rebates"),
          ]
        }
      ])`
    });
    return [ex.DOM];
  }
  function createInputExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Input",
      description: "A menu item can contain an input inside of it",
      VNode$: xs.of(UI.Menu.render([
        {
          main: [
            UI.Textbox.render({ placeholder: "Search..", icon: true }, [
              UI.Icon.render(UI.IconType.Search)
            ])
          ]
        }, {
          float: "right", main: [
            UI.Textbox.render({ placeholder: "Navigate to..", rightContent: true, action: true }, [
              UI.Button.render("Go")
            ])
          ]
        }
      ])),
      code: `UI.Menu.render([
        {main: [
          UI.Textbox.render({placeholder: "Search..", icon: true}, [
            UI.Icon.render(UI.IconType.Search)
          ])
        ]}, {float: "right", main: [
          UI.Textbox.render({placeholder: "Navigate to..", rightContent: true, action: true}, [
            UI.Button.render("Go")
          ])
        ]}
      ])`
    });

    return [ex.DOM];
  }
  function createButtonExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Button",
      description: "A menu item can contain a button inside of it",
      VNode$: xs.of(UI.Menu.render([
        { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] },
        { main: [UI.Button.render("Log-in")] }
      ])),
      code: `UI.Menu.render([
        {main: [UI.Button.render({color: UI.Color.Primary}, "Sign up")]},
        {main: [UI.Button.render("Log-in")]}
      ])`
    });
    return [ex.DOM];
  }

  function createLinkExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Link Item",
      description: "A menu may contain a link item, or an item formatted as if it is a link.",
      VNode$: xs.of(UI.Menu.render({ vertical: true }, [
        { href: "#", main: "Visit google" },
        { link: true, main: "Javascript link" }
      ])),
      code: `UI.Menu.render({vertical: true}, [
        {href: "#", main: "Visit google"},
        {link: true, main: "Javascript link"}
      ])`
    });
    return [ex.DOM];
  }
  function createDropdownExamples(sources): Stream<VNode>[] {
    // let ex = Example.run(sources, {
    //   header: "",
    //   description: "",
    //   VNode$: xs.of(),
    //   code: ``
    // });
    return [];
  }
  function createPopupExamples(sources): Stream<VNode>[] {
    // let ex = Example.run(sources, {
    //   header: "",
    //   description: "",
    //   VNode$: xs.of(),
    //   code: ``
    // });
    return [];
  }
  function createSearchExamples(sources): Stream<VNode>[] {
    // let ex = Example.run(sources, {
    //   header: "",
    //   description: "",
    //   VNode$: xs.of(),
    //   code: ``
    // });
    return [];
  }
  function createMenuExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Menu",
      description: "A menu may contain another menu group in the same level as menu items.",
      VNode$: xs.of(UI.Menu.render([
        { main: "Browse" },
        { main: "Submit" },
        {
          rightMenu: true, main: [
            { main: "Sign Up" },
            { main: "Help" }
          ]
        }
      ])),
      code: `UI.Menu.render([
        { main: "Browse" },
        { main: "Submit" },
        {
          rightMenu: true, main: [
            { main: "Sign Up" },
            { main: "Help" }
          ]
        }
      ])`
    });
    return [ex.DOM];
  }
  function createSubMenuExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Sub Menu",
      description: "A menu item may contain another menu nested inside that acts as a grouped sub-menu.",
      VNode$: xs.of(UI.Menu.render({ vertical: true }, [
        {
          main: [
            UI.Textbox.render({ placeholder: "Search..." })
          ]
        },
        {
          main: [
            "Home",
            UI.Menu.render({submenu: true}, [
              { active: true, main: "Search" },
              { main: "Add" },
              { main: "Remove" }
            ])
          ]
        },
        { main: [UI.Icon.render(UI.IconType.GridLayout), "Browse"] },
        { main: "Messages" },
        { main: "More" }
      ])),
      code: `UI.Menu.render({ vertical: true }, [
        {
          main: [
            UI.Textbox.render({ placeholder: "Search..." })
          ]
        },
        {
          main: [
            "Home",
            UI.Menu.render({submenu: true}, [
              { active: true, main: "Search" },
              { main: "Add" },
              { main: "Remove" }
            ])
          ]
        },
        { main: [UI.Icon.render(UI.IconType.GridLayout), "Browse"] },
        { main: "Messages" },
        { main: "More" }
      ])`
    });
    return [ex.DOM];
  }
}
