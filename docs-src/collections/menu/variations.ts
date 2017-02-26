import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { p, div, VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace Variations {
  export function run(sources): Stream<VNode[]> {
    let stackableEx = createStackableExamples(sources);
    let invertedEx = createInvertedExamples(sources);
    let coloredEx = createColoredExamples(sources);
    let iconsEx = createIconsExamples(sources);
    let labelledIconsEx = createLabeledIconsExamples(sources);
    let fluidEx = createFluidExamples(sources);
    let compactEx = createCompactExamples(sources);
    let equalWidthEx = createEqualWidthExamples(sources);
    let pointingEx = createPointingExamples(sources);
    let attachedEx = createAttachedExamples(sources);
    let sizeEx = createSizeExamples(sources);
    let fittedEx = createFittedExamples(sources);
    let borderlessEx = createBorderlessExamples(sources);

    let examples = [].concat(stackableEx, invertedEx, coloredEx,
      iconsEx, labelledIconsEx, fluidEx, compactEx, equalWidthEx,
      pointingEx, attachedEx, sizeEx, fittedEx, borderlessEx);

    return xs.combine.apply(null, examples);
  }

  function createStackableExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Stackable",
      description: [
        p("A menu can stack at mobile resolutions"),
        UI.Message.render({ color: UI.Color.Info }, "Stackable menus are intended to be used with only simple menu content. Stacked menus will not replicate all additional stylings for vertical menus like adjusting dropdown position.")
      ],
      VNode$: xs.of(UI.Menu.render([
        { main: "Features" },
        { main: "Testimonials" },
        { main: "Sign-in" }
      ])),
      code: `UI.Menu.render([
        {main: "Features"},
        {main: "Testimonials"},
        {main: "Sign-in"}
      ])`
    });
    return [ex.DOM];
  }

  function createInvertedExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Inverted",
      description: "A menu may have its colors inverted to show greater contrast",
      VNode$: xs.of(UI.Menu.render({ inverted: true }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        { main: "Friends" }
      ])),
      code: `UI.Menu.render({inverted: true}, [
        {active: true, main: "Home"},
        {main: "Messages"},
        {main: "Friends"}
      ])`
    });

    let ex2 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ inverted: true, vertical: true }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        { main: "Friends" }
      ])),
      code: `UI.Menu.render({inverted: true, vertical: true}, [
        {active: true, main: "Home"},
        {main: "Messages"},
        {main: "Friends"}
      ])`
    });

    let ex3 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ inverted: true, pointing: true, vertical: true }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        { main: "Friends" }
      ])),
      code: `UI.Menu.render({inverted: true, pointing: true, vertical: true}, [
        {active: true, main: "Home"},
        {main: "Messages"},
        {main: "Friends"}
      ])`
    });

    let ex4 = Example.run(sources, {
      VNode$: xs.of(UI.Segment.render({ inverted: true }, [
        UI.Menu.render({ inverted: true, secondary: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ])
      ])),
      code: `UI.Segment.render({ inverted: true }, [
        UI.Menu.render({ inverted: true, secondary: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ])
      ])`
    });

    let ex5 = Example.run(sources, {
      VNode$: xs.of(UI.Segment.render({ inverted: true }, [
        UI.Menu.render({ inverted: true, secondary: true, pointing: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ])
      ])),
      code: `UI.Segment.render({ inverted: true }, [
        UI.Menu.render({ inverted: true, secondary: true, pointing: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ])
      ])`
    });
    return [ex.DOM, ex2.DOM, ex3.DOM, ex4.DOM, ex5.DOM];
  }

  function createColoredExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Colored",
      description: "Additional colors can be specified",
      VNode$: xs.of(UI.Menu.render([
        { active: true, color: "primary", main: "Primary" },
        { color: "secondary", main: "Secondary" },
        { color: "success", main: "Success" },
        { color: "info", main: "Info" },
        { color: "warning", main: "Warning" },
        { color: "error", main: "Error" }
      ])),
      code: `UI.Menu.render([
        {active: true, color: "primary", main: "Primary"},
        {color: "secondary", main: "Secondary"},
        {color: "success", main: "Success"},
        {color: "info", main: "Info"},
        {color: "warning", main: "Warning"},
        {color: "error", main: "Error"}
      ])`
    });

    let ex2 = Example.run(sources, {
      VNode$: xs.of(div([
        UI.Menu.render({ color: "primary", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ color: "secondary", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ color: "success", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ color: "info", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ color: "warning", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ color: "error", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ])
      ])),
      code: `UI.Menu.render({ color: "primary", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ color: "secondary", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ color: "success", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ color: "info", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ color: "warning", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ color: "error", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ])`
    });

    let ex3 = Example.run(sources, {
      description: "These colors can also be inverted",
      VNode$: xs.of(UI.Menu.render({ inverted: true }, [
        { active: true, color: "primary", main: "Primary" },
        { color: "secondary", main: "Secondary" },
        { color: "success", main: "Success" },
        { color: "info", main: "Info" },
        { color: "warning", main: "Warning" },
        { color: "error", main: "Error" }
      ])),
      code: `UI.Menu.render({inverted: true}, [
        { active: true, color: "primary", main: "Primary" },
        { color: "secondary", main: "Secondary" },
        { color: "success", main: "Success" },
        { color: "info", main: "Info" },
        { color: "warning", main: "Warning" },
        { color: "error", main: "Error" }
      ])`
    });

    let ex4 = Example.run(sources, {
      VNode$: xs.of(div([
        UI.Menu.render({ inverted: true, color: "primary", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ inverted: true, color: "secondary", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ inverted: true, color: "success", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ inverted: true, color: "info", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ inverted: true, color: "warning", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ inverted: true, color: "error", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ])
      ])),
      code: `        UI.Menu.render({ inverted: true, color: "primary", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ inverted: true, color: "secondary", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ inverted: true, color: "success", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ inverted: true, color: "info", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ inverted: true, color: "warning", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ]),
        UI.Menu.render({ inverted: true, color: "error", equalWidth: true }, [
          { active: true, main: "Home" },
          { main: "Messages" },
          { main: "Friends" }
        ])`
    });
    return [ex.DOM, ex2.DOM, ex3.DOM, ex4.DOM];
  }

  function createIconsExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Icons",
      description: "A menu may have just icons",
      VNode$: xs.of(UI.Menu.render({ icon: true }, [
        { main: [UI.Icon.render(UI.IconType.Gamepad)] },
        { main: [UI.Icon.render(UI.IconType.VideoCamera)] },
        { main: [UI.Icon.render(UI.IconType.Play)] }
      ])),
      code: `UI.Menu.render({icon: true}, [
        {main: [UI.Icon.render(UI.IconType.Gamepad)]},
        {main: [UI.Icon.render(UI.IconType.VideoCamera)]},
        {main: [UI.Icon.render(UI.IconType.Play)]}
      ])`
    });

    let ex2 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ icon: true, vertical: true }, [
        { main: [UI.Icon.render(UI.IconType.Gamepad)] },
        { main: [UI.Icon.render(UI.IconType.VideoCamera)] },
        { main: [UI.Icon.render(UI.IconType.Play)] }
      ])),
      code: `UI.Menu.render({ icon: true, vertical: true }, [
        { main: [UI.Icon.render(UI.IconType.Gamepad)] },
        { main: [UI.Icon.render(UI.IconType.VideoCamera)] },
        { main: [UI.Icon.render(UI.IconType.Play)] }
      ])`
    });
    return [ex.DOM, ex2.DOM];
  }

  function createLabeledIconsExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Labeled Icon",
      description: "A menu may have labeled icons",
      VNode$: xs.of(UI.Menu.render({ labeledIcons: true }, [
        { main: [UI.Icon.render(UI.IconType.Gamepad), "Games"] },
        { main: [UI.Icon.render(UI.IconType.VideoCamera), "Channels"] },
        { main: [UI.Icon.render(UI.IconType.Play), "Videos"] }
      ])),
      code: `UI.Menu.render({labeledIcons: true}, [
        { main: [UI.Icon.render(UI.IconType.Gamepad), "Games"] },
        { main: [UI.Icon.render(UI.IconType.VideoCamera), "Channels"] },
        { main: [UI.Icon.render(UI.IconType.Play), "Videos"] }
      ])`
    });

    let ex2 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ labeledIcons: true, vertical: true }, [
        { main: [UI.Icon.render(UI.IconType.Gamepad), "Games"] },
        { main: [UI.Icon.render(UI.IconType.VideoCamera), "Channels"] },
        { main: [UI.Icon.render(UI.IconType.Play), "Videos"] }
      ])),
      code: `UI.Menu.render({ labeledIcons: true, vertical: true }, [
        { main: [UI.Icon.render(UI.IconType.Gamepad), "Games"] },
        { main: [UI.Icon.render(UI.IconType.VideoCamera), "Channels"] },
        { main: [UI.Icon.render(UI.IconType.Play), "Videos"] }
      ])`
    });
    return [ex.DOM, ex2.DOM];
  }

  function createFluidExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Fluid",
      description: "A vertical menu may take the size of its container.",
      VNode$: xs.of(UI.Menu.render({ fluid: true }, [
        { main: "Run" },
        { main: "Walk" },
        { main: "Bike" }
      ])),
      code: `UI.Menu.render({fluid: true}, [
        {main: "Run"},
        {main: "Walk"},
        {main: "Bike"}
      ])`
    });
    return [ex.DOM];
  }
  function createCompactExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Compact",
      description: "A menu can take up only the space necessary to fit its content",
      VNode$: xs.of(UI.Menu.render({ labeledIcons: true, compact: true }, [
        { main: [UI.Icon.render(UI.IconType.Gamepad), "Games"] },
        { main: [UI.Icon.render(UI.IconType.VideoCamera), "Channels"] },
        { main: [UI.Icon.render(UI.IconType.Play), "Videos"] }
      ])),
      code: `UI.Menu.render({labeledIcons: true, compact: true}, [
        { main: [UI.Icon.render(UI.IconType.Gamepad), "Games"] },
        { main: [UI.Icon.render(UI.IconType.VideoCamera), "Channels"] },
        { main: [UI.Icon.render(UI.IconType.Play), "Videos"] }
      ])`
    });

    let ex2 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ labeledIcons: true, compact: true, vertical: true }, [
        { main: [UI.Icon.render(UI.IconType.Gamepad), "Games"] },
        { main: [UI.Icon.render(UI.IconType.VideoCamera), "Channels"] },
        { main: [UI.Icon.render(UI.IconType.Play), "Videos"] }
      ])),
      code: `UI.Menu.render({labeledIcons: true, compact: true, vertical: true}, [
        { main: [UI.Icon.render(UI.IconType.Gamepad), "Games"] },
        { main: [UI.Icon.render(UI.IconType.VideoCamera), "Channels"] },
        { main: [UI.Icon.render(UI.IconType.Play), "Videos"] }
      ])`
    });
    return [ex.DOM, ex2.DOM];
  }

  function createEqualWidthExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Equal Width",
      description: "A menu may divide its items evenly",
      VNode$: xs.of(UI.Menu.render({ equalWidth: true }, [
        { main: "Buy" },
        { main: "Sell" },
        { main: "Rent" }
      ])),
      code: `UI.Menu.render({equalWidth: true}, [
        {main: "Buy"},
        {main: "Sell"},
        {main: "Rent"}
      ])`
    });
    return [ex.DOM];
  }
  function createPointingExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Pointing",
      description: "A vertical menu can point to content adjacent to itself to show ownership",
      VNode$: xs.of(UI.Menu.render({ vertical: true, pointing: true }, [
        { main: "Site Title" },
        {
          header: true, main: ["Grouped Section", UI.Menu.render({ submenu: true }, [
            { main: "Subsection 1" },
            { main: "Subsection 2", active: true },
            { main: "Subsection 3" }
          ])]
        }
      ])),
      code: `UI.Menu.render({ vertical: true, pointing: true }, [
        { main: "Site Title" },
        {
          header: true, main: ["Grouped Section", UI.Menu.render({ submenu: true }, [
            { main: "Subsection 1" },
            { main: "Subsection 2", active: true },
            { main: "Subsection 3" }
          ])]
        }
      ])`
    });
    return [ex.DOM];
  }
  function createAttachedExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Attached",
      description: "A menu may be attached to other content segments",
      VNode$: xs.of(div([
        UI.Menu.render({ attachment: "top", tabular: true }, [
          { active: true, main: "Tab 1" },
          { main: "Tab 2" }
        ]),
        UI.Segment.render({ attachment: UI.Attachment.Bottom }, [
          p("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.")
        ])
      ])),
      code: `UI.Menu.render({ attachment: "top", tabular: true }, [
          { active: true, main: "Tab 1" },
          { main: "Tab 2" }
        ]),
        UI.Segment.render({ attachment: UI.Attachment.Bottom })`
    });

    let ex2 = Example.run(sources, {
      VNode$: xs.of(div([
        UI.Menu.render({ attachment: "top" }, [
          { active: true, main: "Section 1" },
          { main: "Section 2" }
        ]),
        UI.Segment.render({ attachment: UI.Attachment.None }, [
          p("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.")
        ]),
        UI.Menu.render({ attachment: "bottom" }, [
          { active: true, main: "Section 1" },
          { main: "Section 2" }
        ])
      ])),
      code: `UI.Menu.render({ attachment: "top" }, [
          { active: true, main: "Section 1" },
          { main: "Section 2" }
        ]),
        UI.Segment.render({ attachment: UI.Attachment.None }),
        UI.Menu.render({ attachment: "bottom" }, [
          { active: true, main: "Section 1" },
          { main: "Section 2" }
        ])`
    });
    return [ex.DOM, ex2.DOM];
  }
  function createSizeExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Size",
      description: "A menu can vary in size",
      VNode$: xs.of(UI.Menu.render({ size: "mini" }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        {
          rightMenu: true, main: [
            { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
          ]
        }
      ])),
      code: `UI.Menu.render({size: "mini"}, [
        {active: true, main: "Home"},
        {main: "Messages"},
        {rightMenu: true, main: [
          {main: [UI.Button.render({color: UI.Color.Primary}, "Sign up")]}
        ]}
      ])`
    });

    let ex2 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ size: "tiny" }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        {
          rightMenu: true, main: [
            { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
          ]
        }
      ])),
      code: `UI.Menu.render({size: "tiny"}, [
        {active: true, main: "Home"},
        {main: "Messages"},
        {rightMenu: true, main: [
          {main: [UI.Button.render({color: UI.Color.Primary}, "Sign up")]}
        ]}
      ])`
    });

    let ex3 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ size: "small" }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        {
          rightMenu: true, main: [
            { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
          ]
        }
      ])),
      code: `UI.Menu.render({size: "small"}, [
        {active: true, main: "Home"},
        {main: "Messages"},
        {rightMenu: true, main: [
          {main: [UI.Button.render({color: UI.Color.Primary}, "Sign up")]}
        ]}
      ])`
    });

    let ex4 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ size: "medium" }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        {
          rightMenu: true, main: [
            { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
          ]
        }
      ])),
      code: `UI.Menu.render({size: "medium"}, [
        {active: true, main: "Home"},
        {main: "Messages"},
        {rightMenu: true, main: [
          {main: [UI.Button.render({color: UI.Color.Primary}, "Sign up")]}
        ]}
      ])`
    });

    let ex5 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ size: "large" }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        {
          rightMenu: true, main: [
            { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
          ]
        }
      ])),
      code: `UI.Menu.render({size: "large"}, [
        {active: true, main: "Home"},
        {main: "Messages"},
        {rightMenu: true, main: [
          {main: [UI.Button.render({color: UI.Color.Primary}, "Sign up")]}
        ]}
      ])`
    });

    let ex7 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ size: "huge" }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        {
          rightMenu: true, main: [
            { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
          ]
        }
      ])),
      code: `UI.Menu.render({size: "huge"}, [
        {active: true, main: "Home"},
        {main: "Messages"},
        {rightMenu: true, main: [
          {main: [UI.Button.render({color: UI.Color.Primary}, "Sign up")]}
        ]}
      ])`
    });
    let ex8 = Example.run(sources, {
      VNode$: xs.of(UI.Menu.render({ size: "massive" }, [
        { active: true, main: "Home" },
        { main: "Messages" },
        {
          rightMenu: true, main: [
            { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
          ]
        }
      ])),
      code: `UI.Menu.render({size: "massive"}, [
        {active: true, main: "Home"},
        {main: "Messages"},
        {rightMenu: true, main: [
          {main: [UI.Button.render({color: UI.Color.Primary}, "Sign up")]}
        ]}
      ])`
    });
    return [ex.DOM, ex2.DOM, ex3.DOM, ex4.DOM, ex5.DOM, ex7.DOM, ex8.DOM];
  }

  function createFittedExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Fitted",
      description: "A menu item or menu can remove element padding, vertically or horizontally",
      VNode$: xs.of(UI.Menu.render([
        {fitted: true, main: "No padding whatsoever"},
        {horizontallyFitted: true, main: "No horizontal padding"},
        {verticallyFitted: true, main: "No vertical padding"}
      ])),
      code: `UI.Menu.render([
        {fitted: true, main: "No padding whatsoever"},
        {horizontallyFitted: true, main: "No horizontal padding"},
        {verticallyFitted: true, main: "No vertical padding"}
      ])`
    });
    return [ex.DOM];
  }
  function createBorderlessExamples(sources): Stream<VNode>[] {
    let ex = Example.run(sources, {
      header: "Borderless",
      description: "A menu or menu item can have no borders",
      VNode$: xs.of(UI.Menu.render({borderless: true}, [
        {main: "1"},
        {main: "2"},
        {main: "3"},
        {main: "4"},
        {main: "5"},
        {main: "6"}
      ])),
      code: `UI.Menu.render({borderless: true}, [
        {main: "1"},
        {main: "2"},
        {main: "3"},
        {main: "4"},
        {main: "5"},
        {main: "6"}
      ])`
    });
    return [ex.DOM];
  }
}
