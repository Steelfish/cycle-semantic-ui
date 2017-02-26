import * as UI from "../ui";
import xs, { Stream } from "xstream";
import { div, a, VNode } from "@cycle/dom";
import { Example } from "../components";

export namespace Breadcrumb {
  export function run(sources) {
    let basics = createBasicExamples(sources);
    let content = createContentExamples(sources);
    let variations = createVariationExamples(sources);

    const vTree$ = xs.combine(basics, content, variations).map(
      ([basics, content, variations]) =>
        div({ props: { className: "article" } }, [
          UI.Segment.render({ vertical: true }, [
            UI.Container.render([
              UI.Header.render({
                props: { size: UI.Size.Huge },
                content: {
                  main: "Breadcrumb",
                  subtext: "A breadcrumb is used to show hierarchy between content"
                }
              }),
            ]),
          ]),
          UI.Container.render([
            UI.Segment.render({ basic: true }, [UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Types")].concat(basics)),
            UI.Segment.render({ basic: true }, [UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Content")].concat(content)),
            UI.Segment.render({ basic: true }, [UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Variations")].concat(variations))
          ]),
        ])
    );
    return {
      DOM: vTree$,
      router: xs.never()
    };
  }

  function createBasicExamples(sources): Stream<VNode[]> {
    let ex1 = Example.run(sources, {
      VNode$: xs.of(UI.Breadcrumb.render([
        { text: "Home", href: "#" },
        { text: "Store", href: "#" },
        { text: "T-Shirt", active: true }
      ])),
      code: `UI.Breadcrumb.render([
        { text: "Home", href: "#" },
        { text: "Store", href: "#" },
        { text: "T-Shirt", active: true }
      ])`,
      header: "Breadcrumb",
      description: "A standard breadcrumb."
    });
    let ex2 = Example.run(sources, {
      VNode$: xs.of(UI.Breadcrumb.render({
        props: { divider: UI.Icon.render(UI.IconType.AngleRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Store", href: "#" },
          { text: "T-Shirt", active: true }
        ]
      })),
      code: `UI.Breadcrumb.render({
        props: { divider: UI.Icon.render(UI.IconType.AngleRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Store", href: "#" },
          { text: "T-Shirt", active: true }
        ]
      })`
    });
    return xs.combine(ex1.DOM, ex2.DOM);
  }
  function createContentExamples(sources): Stream<VNode[]> {
    let ex1 = Example.run(sources, {
      header: "Divider",
      description: "A breadcrumb can contain a divider to show the relationship between sections, this can be formatted as an icon or text.",
      VNode$: xs.of(UI.Breadcrumb.render({
        props: { divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })),
      code: `UI.Breadcrumb.render({
        props: { divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })`
    });
    let ex2 = Example.run(sources, {
      VNode$: xs.of(UI.Breadcrumb.render({
        props: { divider: "|" },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })),
      code: `UI.Breadcrumb.render({
        props: { divider: "|" },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })`
    });
    let ex3 = Example.run(sources, {
      header: "Section",
      description: "A breadcrumb can contain sections that can either be formatted as a link or text.",
      VNode$: xs.of(UI.Breadcrumb.render({
        props: { divider: UI.Icon.render(UI.IconType.AngleRight) },
        content: [
          { text: "Home" },
          { text: "Search", active: true },
        ]
      })),
      code: `UI.Breadcrumb.render({
        props: { divider: UI.Icon.render(UI.IconType.AngleRight) },
        content: [
          { text: "Home" },
          { text: "Search", active: true },
        ]
      })`
    });
    let ex4 = Example.run(sources, {
      header: "Link",
      description: "A section may be linkable or contain a link.",
      VNode$: xs.of(UI.Breadcrumb.render({
        props: { divider: UI.Icon.render(UI.IconType.AngleRight) },
        content: [
          { text: "Home", href: "#" },
          { text: ["Search for: ", a("paper towels")], active: true },
        ]
      })),
      code: `UI.Breadcrumb.render({
        props: { divider: UI.Icon.render(UI.IconType.AngleRight) },
        content: [
          { text: "Home", href: "#" },
          { text: ["Search for: ", a("paper towels")], active: true },
        ]
      })`
    });
    return xs.combine(ex1.DOM, ex2.DOM, ex3.DOM, ex4.DOM);
  }
  function createVariationExamples(sources): Stream<VNode[]> {
    let ex1 = Example.run(sources, {
      header: "Size",
      description: "A breadcrumb can vary in size.",
      VNode$: xs.of(UI.Breadcrumb.render({
        props: { size: UI.Size.Mini, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })),
      code: `UI.Breadcrumb.render({
        props: { size: UI.Size.Mini, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })`
    });
    let ex2 = Example.run(sources, {
      VNode$: xs.of(UI.Breadcrumb.render({
        props: { size: UI.Size.Tiny, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })),
      code: `UI.Breadcrumb.render({
        props: { size: UI.Size.Tiny, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })`
    });
    let ex3 = Example.run(sources, {
      VNode$: xs.of(UI.Breadcrumb.render({
        props: { size: UI.Size.Small, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })),
      code: `UI.Breadcrumb.render({
        props: { size: UI.Size.Small, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })`
    }); let ex4 = Example.run(sources, {
      VNode$: xs.of(UI.Breadcrumb.render({
        props: { size: UI.Size.Medium, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })),
      code: `UI.Breadcrumb.render({
        props: { size: UI.Size.Medium, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })`
    }); let ex5 = Example.run(sources, {
      VNode$: xs.of(UI.Breadcrumb.render({
        props: { size: UI.Size.Large, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })),
      code: `UI.Breadcrumb.render({
        props: { size: UI.Size.Large, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })`
    });
    let ex6 = Example.run(sources, {
      VNode$: xs.of(UI.Breadcrumb.render({
        props: { size: UI.Size.Big, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })),
      code: `UI.Breadcrumb.render({
        props: { size: UI.Size.Big, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })`
    }); let ex7 = Example.run(sources, {
      VNode$: xs.of(UI.Breadcrumb.render({
        props: { size: UI.Size.Huge, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })),
      code: `UI.Breadcrumb.render({
        props: { size: UI.Size.Huge, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })`
    }); let ex8 = Example.run(sources, {
      VNode$: xs.of(UI.Breadcrumb.render({
        props: { size: UI.Size.Massive, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })),
      code: `UI.Breadcrumb.render({
        props: { size: UI.Size.Massive, divider: UI.Icon.render(UI.IconType.ArrowRight) },
        content: [
          { text: "Home", href: "#" },
          { text: "Registration", href: "#" },
          { text: "Personal Information", active: true }
        ]
      })`
    });
    return xs.combine(ex1.DOM, ex2.DOM, ex3.DOM, ex4.DOM, ex5.DOM, ex6.DOM, ex7.DOM, ex8.DOM);
  }
}
