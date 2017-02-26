import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace Types {
  export function run(sources): Stream<VNode[]> {
    let ex1 = Example.run(sources, {
      header: "Message",
      description: "A basic message",
      VNode$: xs.of(UI.Message.render({
        content: {
          header: "Changes in Service",
          main: "We just updated our privacy policy here to better service our customers. We recommend reviewing the changes."
        }
      })),
      code: `UI.Message.render({
        content: {
          header: "Changes in Service",
          main: "We just updated our privacy policy here to better service our customers. We recommend reviewing the changes."
        }
      })`
    });

    let ex2 = Example.run(sources, {
      header: "List message",
      description: "A message with a list",
      VNode$: xs.of(UI.Message.render({
        content: {
          header: "New Site Features",
          main: [
            UI.List.render({ bulleted: true }, [
              { main: "You can now have cover images on blog pages" },
              { main: "Drafts will now auto-save while writing" }
            ])
          ]
        }
      })),
      code: `UI.Message.render({
        content: {
          header: "New Site Features",
          main: [
            UI.List.render({bulleted: true}, [
              {main: "You can now have cover images on blog pages"},
              {main: "Drafts will now auto-save while writing"}
            ])
          ]
        }
      })`
    });

    let ex3 = Example.run(sources, {
      header: ["Icon Message", UI.Label.render({color: "primary"}, "flexbox")],
      description: "A message can contain an icon.",
      VNode$: xs.of(UI.Message.render({
        content: {
          icon: [UI.Icon.render("inbox")],
          header: "Have you heard about our mailing list?",
          main: "Get the best news in your e-mail every day."
        }
      })),
      code: `UI.Message.render({
        content: {
          icon: [UI.Icon.render("inbox")],
          header: "Have you heard about our mailing list?",
          main: "Get the best news in your e-mail every day."
        }
      })`
    });

    let ex4 = Example.run(sources, {
      VNode$: xs.of(UI.Message.render({
        content: {
          icon: [UI.Icon.render({loading: true}, "notched circle")],
          header: "Just one second",
          main: "We're fetching that content for you."
        }
      })),
      code: `UI.Message.render({
        content: {
          icon: [UI.Icon.render({loading: true}, "notched circle")],
          header: "Just one second",
          main: "We're fetching that content for you."
        }
      })`
    });

    let msg = UI.Message.run({
      DOM: sources.DOM,
      content$: xs.of({
        header: "Welcome back!",
        main: "This is a special notification which you can dismiss if you're bored with it."
      }), args: {
        closeable: true
      }
    });
    let ex5 = Example.run(sources, {
      header: "Dismissable Block",
      description: "A message that the user can choose to hide",
      VNode$: msg.DOM,
      code: `let msg = UI.Message.run({
        DOM: sources.DOM,
        content$: xs.of({
          header: "Welcome back!",
          main: "This is a special notification which you can dismiss if you're bored with it."
        }), args: {
          closeable: true
        }
      });`
    });



    return xs.combine(ex1.DOM, ex2.DOM, ex3.DOM, ex4.DOM, ex5.DOM);
  }
}
