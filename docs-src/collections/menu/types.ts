import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { div, VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace Types {
  export function run(sources): Stream<VNode> {
    let basicEx = createBasicExamples(sources);
    let secondaryEx = createSecondaryExamples(sources);
    let pointingEx = createPointingExamples(sources);
    let tabularEx = createTabularExamples(sources);
    let textEx = createTextExamples(sources);
    let verticalEx = createVerticalExamples(sources);
    let paginationEx = createPaginationExamples(sources);

    let examples = [].concat(basicEx, secondaryEx, pointingEx, tabularEx,
      textEx, verticalEx, paginationEx);

    return xs.combine.apply(null, examples);
  }

  function createBasicExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Menu",
      description: "A menu",
      VNode$: xs.of(UI.Menu.render({ equalWidth: true }, [
        { active: true, main: "Editorials" },
        { main: "Reviews" },
        { main: "Upcoming Events" }
      ])),
      code: `UI.Menu.render({equalWidth: true}, [
        {active: true, main: "Editorials"},
        {main: "Reviews"},
        {main: "Upcoming Events"}
      ])`
    });

    //Todo add popup example
    let ddlNavigation = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({ static: "More" }),
      content$: xs.of([
        { main: "Applications", value: "applications" },
        { main: "International Students", value: "international" },
        { main: "Scholarships", value: "scholarships" }
      ])
    });
    let ex2 = Example.run(sources, {
      VNode$: xs.combine(ddlNavigation.DOM).map(
        ([ddlNavigation]) => UI.Menu.render({ text: true }, [
          { main: [UI.Image.render("https://placeholdit.imgix.net/~text?txtsize=33&txt=Logo&w=80&h=80")] },
          { float: "right", main: [ddlNavigation] }
        ])
      ),
      code: `let ddlNavigation = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({static: "More"}),
      content$: xs.of([
        { main: "Applications", value: "applications" },
        { main: "International Students", value: "international" },
        { main: "Scholarships", value: "scholarships" }
      ])
    });
    let vTree$ = xs.combine(ddlNavigation.DOM).map(
      ([ddlNavigation]) => UI.Menu.render({text: true}, [
        {main: [UI.Image.render("")]},
        {float: "right", main: [ddlNavigation]}
      ])
    )`
    });

    //Todo dropdown menu's
    let ddlNavigation2 = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({ static: [UI.Icon.render(UI.IconType.Wrench)] }),
      content$: xs.of([
        { main: "New...", value: "new" },
        { main: "Open...", value: "open" },
        { main: "Save...", value: "save" },
        { main: "Edit permissions...", value: "permissions" },
        { divider: true },
        { main: "Export", headerOnly: true },
        { main: "Share...", value: "" }
      ])
    });
    let ex3 = Example.run(sources, {
      VNode$: xs.combine(ddlNavigation2.DOM).map(
        ([ddlNavigation]) => div([
          UI.Menu.render({ attachment: "top" }, [
            { main: [ddlNavigation] },
            {
              float: "right", main: [UI.Textbox.render({ icon: true, transparent: true }, [
                UI.Icon.render(UI.IconType.Search)
              ])]
            }
          ]),
          UI.Segment.render({ attachment: UI.Attachment.Bottom })
        ])
      ),
      code: ` let ddlNavigation2 = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({ static: [UI.Icon.render(UI.IconType.Wrench)] }),
      content$: xs.of([
        { main: "New...", value: "new" },
        { main: "Open...", value: "open" },
        { main: "Save...", value: "save" },
        { main: "Edit permissions...", value: "permissions" },
        { divider: true },
        { main: "Export", header: true },
        { main: "Share...", value: "" }
      ])
    });
    let vTree$ = xs.combine(ddlNavigation2.DOM).map(
      ([ddlNavigation]) => div([
        UI.Menu.render({ attachment: "top" }, [
          { main: [ddlNavigation] },
          {
            float: "right", main: [UI.Textbox.render({ icon: true, transparent: true }, [
              UI.Icon.render(UI.IconType.Search)
            ])]
          }
        ]),
        UI.Segment.render({attachment: UI.Attachment.Bottom})
      ])`
    });


    return [ex.DOM, ex2.DOM, ex3.DOM];
  }

  function createSecondaryExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Secondary Menu",
      description: "A menu can adjust its appearance to de-emphasize its contents",
      VNode$: xs.of(UI.Menu.render({ secondary: true }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        { main: "Friends" },
        {
          float: "right", main: [
            UI.Textbox.render({ placeholder: "Search...", icon: true }, [
              UI.Icon.render(UI.Icon.render(UI.IconType.Search))
            ])
          ]
        },
        { float: "right", main: "Logout" }
      ])),
      code: `UI.Menu.render({ secondary: true }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        { main: "Friends" },
        { float: "right", main: [
          UI.Textbox.render({placeholder: "Search...", icon: true}, [
            UI.Icon.render(UI.Icon.render(UI.IconType.Search))
          ])
        ]},
        { float: "right", main: "Logout"}
      ])`
    });
    return [ex.DOM];
  }


  function createPointingExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Pointing",
      description: "A menu can point to show its relationship to nearby content",
      VNode$: xs.of(div([UI.Menu.render({ pointing: true }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        { main: "Friends" },
        {
          float: "right", main: [
            UI.Textbox.render({ placeholder: "Search...", icon: true }, [
              UI.Icon.render(UI.Icon.render(UI.IconType.Search))
            ])
          ]
        }
      ]),
      UI.Segment.render()
      ])),
      code: `UI.Menu.render({ pointing: true }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        { main: "Friends" },
        {
          float: "right", main: [
            UI.Textbox.render({ placeholder: "Search...", icon: true }, [
              UI.Icon.render(UI.Icon.render(UI.IconType.Search))
            ])
          ]
        }
      ]),
      UI.Segment.render()`
    });

    let ex2 = Example.run(sources, {
      VNode$: xs.of(div([UI.Menu.render({ pointing: true, secondary: true }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        { main: "Friends" },
        { float: "right", main: "Logout" }
      ]),
      UI.Segment.render()
      ])),
      code: `UI.Menu.render({ pointing: true, secondary: true }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        { main: "Friends" },
        { float: "right", main: "Logout" }
      ]),
      UI.Segment.render()`
    });
    return [ex.DOM, ex2.DOM];
  }


  function createTabularExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Tabular",
      description: "A menu can be formatted to show tabs of information",
      VNode$: xs.of(UI.Menu.render({ tabular: true }, [
        { main: "Bio", active: true },
        { main: "Photos" }
      ])),
      code: `UI.Menu.render({ tabular: true }, [
        { main: "Bio", active: true },
        { main: "Photos" }
      ])`
    });

    let ex2 = Example.run(sources, {
      VNode$: xs.of(div([
        UI.Menu.render({ tabular: true, attachment: "top" }, [
          { main: "Bio", active: true },
          { main: "Photos" }
        ]),
        UI.Segment.render({ attachment: UI.Attachment.Bottom })
      ])),
      code: `UI.Menu.render({ tabular: true, attachment: "top" }, [
          { main: "Bio", active: true },
          { main: "Photos" }
        ]),
        UI.Segment.render({attachment: UI.Attachment.Bottom})`
    });

    let ex3 = Example.run(sources, {
      VNode$: xs.of(div([
        UI.Segment.render({ attachment: UI.Attachment.Top }),
        UI.Menu.render({ tabular: true, attachment: "bottom" }, [
          { main: "Active project", active: true },
          { main: "Project #2" },
          { main: "Project #3" },
          { float: "right", main: [UI.Icon.render(UI.IconType.Plus), "New Tab"] }
        ]),
      ])),
      code: `UI.Segment.render({ attachment: UI.Attachment.Top }),
        UI.Menu.render({ tabular: true, attachment: "bottom" }, [
          { main: "Active project", active: true },
          { main: "Project #2" },
          { main: "Project #3" },
          { float: "right", main: [UI.Icon.render(UI.IconType.Plus), "New Tab"]}
        ])`
    });

    let ex4 = Example.run(sources, {
      VNode$: xs.of(UI.Grid.render([
        UI.Column.render({ width: 4 }, [
          UI.Menu.render({ vertical: true, size: "fluid", tabular: true }, [
            { main: "Bio", active: true },
            { main: "Pics" },
            { main: "Companies" },
            { main: "Links" }
          ])
        ]),
        UI.Column.render({ width: 12, stretched: true }, [
          UI.Segment.render("This is an stretched grid column. This segment will always match the tab height")
        ])
      ])),
      code: `UI.Grid.render([
        UI.Column.render({ width: 4 }, [
          UI.Menu.render({ vertical: true, size: "fluid", tabular: true }, [
            { main: "Bio", active: true },
            { main: "Pics" },
            { main: "Companies" },
            { main: "Links" }
          ])
        ]),
        UI.Column.render({width: 12, stretched: true}, [
          UI.Segment.render("This is an stretched grid column. This segment will always match the tab height")
        ])
      ])`
    });

    let ex5 = Example.run(sources, {
      VNode$: xs.of(UI.Grid.render([
        UI.Column.render({ width: 12, stretched: true }, [
          UI.Segment.render("This is an stretched grid column. This segment will always match the tab height")
        ]),
        UI.Column.render({ width: 4 }, [
          UI.Menu.render({ vertical: true, size: "fluid", tabular: true, right: true }, [
            { main: "Bio", active: true },
            { main: "Pics" },
            { main: "Companies" },
            { main: "Links" }
          ])
        ])
      ])),
      code: `UI.Grid.render([
        UI.Column.render({width: 12, stretched: true}, [
          UI.Segment.render("This is an stretched grid column. This segment will always match the tab height")
        ]),
        UI.Column.render({ width: 4 }, [
          UI.Menu.render({ vertical: true, size: "fluid", tabular: true, right: true }, [
            { main: "Bio", active: true },
            { main: "Pics" },
            { main: "Companies" },
            { main: "Links" }
          ])
        ])
      ])`
    });

    return [ex.DOM, ex2.DOM, ex3.DOM, ex4.DOM, ex5.DOM];
  }

  function createTextExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Text",
      description: "A menu can be formatted for text content",
      VNode$: xs.of(UI.Menu.render({ text: true }, [
        { header: true, main: "Sort by" },
        { active: true, main: "Closest" },
        { main: "Most Comments" },
        { main: "Most Popular" }
      ])),
      code: `UI.Menu.render({ text: true }, [
        { header: true, main: "Editorials" },
        { active: true, main: "Closest" },
        { main: "Most Comments" },
        { main: "Most Popular"}
      ])`
    });
    return [ex.DOM];
  }


  function createVerticalExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Vertical Menu",
      description: "A vertical menu displays elements vertically.",
      VNode$: xs.of(UI.Menu.render({ vertical: true }, [
        {
          active: true, color: "primary", main: [
            "Inbox", UI.Label.render({ leftPointing: true, color: UI.Color.Primary }, "1")
          ]
        }, {
          main: [
            "Spam", UI.Label.render("51")
          ]
        }, {
          main: [
            "Updates", UI.Label.render("1")
          ]
        }, {
          main: [
            UI.Textbox.render({ transparent: true, icon: true, placeholder: "Search mail..." }, [
              UI.Icon.render(UI.IconType.Search)
            ])
          ]
        }
      ])),
      code: `UI.Menu.render({ vertical: true }, [
        {
          active: true, color: "primary", main: [
            "Inbox", UI.Label.render({ leftPointing: true, color: UI.Color.Primary }, "1")
          ]
        }, {
          main: [
            "Spam", UI.Label.render("51")
          ]
        },{
          main: [
            "Updates", UI.Label.render("1")
          ]
        }, {
          main: [
            UI.Textbox.render({transparent: true, icon: true, placeholder: "Search mail..."}, [
              UI.Icon.render(UI.IconType.Search)
            ])
          ]
        }
      ])`
    });

    let ex2 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ secondary: true, vertical: true }, [
        { active: true, main: "Account" },
        { main: "Settings" },
        { main: "Display Options" },
      ])),
      code: `UI.Menu.render({ secondary: true, vertical: true }, [
        { active: true, main: "Account" },
        { main: "Settings" },
        { main: "Display Options" },
      ])`
    });

    let ex3 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ vertical: true, text: true }, [
        { header: true, main: "Sort by" },
        { active: true, main: "Closest" },
        { main: "Most Comments" },
        { main: "Most Popular" }
      ])),
      code: `UI.Menu.render({ vertical: true, text: true }, [
        { header: true, main: "Editorials" },
        { active: true, main: "Closest" },
        { main: "Most Comments" },
        { main: "Most Popular"}
      ])`
    });

    let ex4 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ vertical: true, pointing: true }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        { main: "Friends" },
      ])),
      code: `UI.Menu.render({ vertical: true, pointing: true }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        { main: "Friends" },
      ])`
    });

    let ex5 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ secondary: true, vertical: true, pointing: true }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        { main: "Friends" },
      ])),
      code: `UI.Menu.render({ secondary: true, vertical: true, pointing: true }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        { main: "Friends" },
      ])`
    });

    return [ex.DOM, ex2.DOM, ex3.DOM, ex4.DOM, ex5.DOM];
  }


  function createPaginationExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Pagination",
      description: "A pagination menu is specially formatted to present links to pages of content",
      VNode$: xs.of(UI.Menu.render({ pagination: true }, [
        { active: true, main: "1" },
        { disabled: true, main: "..." },
        { main: "10" },
        { main: "11" },
        { main: "12" }
      ])),
      code: `UI.Menu.render({ pagination: true }, [
        { active: true, main: "1" },
        { disabled: true, main: "..." },
        { main: "10" },
        { main: "11" },
        { main: "12" }
      ])`
    });
    return [ex.DOM];
  }
}
