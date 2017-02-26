import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { div, a, VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace Variations {
  export function run(sources): Stream<VNode[]> {

    let floatingEx = makeFloatingExamples(sources);
    let compactEx = makeCompactExamples(sources);
    let attachedEx = makeAttachedExamples(sources);
    let coloredEx = makeColoredExamples(sources);
    let sizeEx = makeSizeExamples(sources);

    let examples = [].concat(floatingEx, compactEx, attachedEx, coloredEx, sizeEx);
    return xs.combine.apply(null, examples);
  }

  function makeFloatingExamples(sources): Stream<VNode>[] {
    let ex1 = Example.run(sources, {
      header: "Floating",
      description: "A message can float above content that it is related to",
      VNode$: xs.of(UI.Message.render({ floating: true }, "Way to go!")),
      code: `UI.Message.render({floating: true}, "Way to go!")`
    });
    return [ex1.DOM];
  }

  function makeCompactExamples(sources): Stream<VNode>[] {
    let ex1 = Example.run(sources, {
      header: "Compact",
      description: "A message can only take up the width of its content.",
      VNode$: xs.of(UI.Message.render({ compact: true }, "Get all the best inventions in your e-mail every day. Sign up now!")),
      code: `UI.Message.render({hidden: true}, "Get all the best inventions in your e-mail every day. Sign up now!")`
    });

    return [ex1.DOM];
  }

  function makeAttachedExamples(sources): Stream<VNode>[] {
    let ex1 = Example.run(sources, {
      header: "Attached",
      description: "A message can be formatted to attach itself to other content",
      VNode$: xs.of(div([
        UI.Message.render({
          props: { attachment: "top" },
          content: {
            header: "Welcome to our site!",
            main: "Fill out the form below to sign-up for a new account"
          }
        }),
        UI.Segment.render({ attachment: "none" }, [
          UI.Form.render([
            UI.Fields.render({ equalWidth: true }, [
              UI.Field.render({
                content: {
                  label: "First Name",
                  main: UI.Textbox.render({ placeholder: "First Name" })
                }
              }),
              UI.Field.render({
                content: {
                  label: "Last Name",
                  main: UI.Textbox.render({ placeholder: "Last Name" })
                }
              })
            ]),
            UI.Field.render({
              content: {
                label: "Username",
                main: UI.Textbox.render({ placeholder: "Username" })
              }
            }),
            UI.Field.render({
              content: {
                label: "Password",
                main: UI.Textbox.render({ type: "password" })
              }
            }),
            UI.Field.render({ inline: true }, [UI.Checkbox.render("I agree to the terms and conditions.")]),
            UI.Button.render({ color: "primary" }, "Submit")
          ])
        ]),
        UI.Message.render({
          props: { attachment: "bottom", color: "warning" },
          content: {
            icon: [UI.Icon.render("help")],
            main: ["Already signed up? ", a({ attrs: { href: "#" } }, "Login here"), " instead"]
          }
        })
      ])),
      code: `UI.Message.render({
          props: { attachment: "top" },
          content: {
            header: "Welcome to our site!",
            main: "Fill out the form below to sign-up for a new account"
          }
        }),
        UI.Segment.render({ attachment: "none" }, [
          UI.Form.render([
            UI.Fields.render({ equalWidth: true }, [
              UI.Field.render({
                content: {
                  label: "First Name",
                  main: UI.Textbox.render({ placeholder: "First Name" })
                }
              }),
              UI.Field.render({
                content: {
                  label: "Last Name",
                  main: UI.Textbox.render({ placeholder: "Last Name" })
                }
              })
            ]),
            UI.Field.render({
              content: {
                label: "Username",
                main: UI.Textbox.render({ placeholder: "Username" })
              }
            }),
            UI.Field.render({
              content: {
                label: "Password",
                main: UI.Textbox.render({ type: "password" })
              }
            }),
            UI.Field.render({inline: true}, [UI.Checkbox.render("I agree to the terms and conditions.")]),
            UI.Button.render({color: "primary"}, "Submit")
          ])
        ]),
        UI.Message.render({
          props : {attachment: "bottom", color: "warning"},
          content: {
            icon: [UI.Icon.render("help")],
            main: ["Already signed up?", a({attrs: {href: "#"}}, "Login here"), " instead"]
          }
        })
      ])`
    });
    return [ex1.DOM];
  }

  function makeColoredExamples(sources): Stream<VNode>[] {
    let ex1 = Example.run(sources, {
      header: "Colored",
      description: "A message can be formatted to be different colors",
      VNode$: xs.of(div([
        UI.Message.render({ color: "primary" }, "Primary"),
        UI.Message.render({ color: "secondary" }, "Secondary"),
        UI.Message.render({ color: "success" }, "Success"),
        UI.Message.render({ color: "info" }, "Info"),
        UI.Message.render({ color: "warning" }, "Warning"),
        UI.Message.render({ color: "error" }, "Error")
      ])),
      code: `
        UI.Message.render({ color: "primary" }, "Primary"),
        UI.Message.render({ color: "secondary" }, "Secondary"),
        UI.Message.render({ color: "success" }, "Success"),
        UI.Message.render({ color: "info" }, "Info"),
        UI.Message.render({ color: "warning" }, "Warning"),
        UI.Message.render({ color: "error" }, "Error")`
    });
    return [ex1.DOM];
  }

  function makeSizeExamples(sources): Stream<VNode>[] {
    let ex1 = Example.run(sources, {
      header: "Size",
      description: "A message can have different sizes",
      VNode$: xs.of(div([
        UI.Message.render({ size: "mini" }, "This is a mini message"),
        UI.Message.render({ size: "tiny" }, "This is a tiny message"),
        UI.Message.render({ size: "small" }, "This is a small message"),
        UI.Message.render({ size: "medium" }, "This is a medium message"),
        UI.Message.render({ size: "large" }, "This is a large message"),
        UI.Message.render({ size: "big" }, "This is a big message"),
        UI.Message.render({ size: "huge" }, "This is a huge message"),
        UI.Message.render({ size: "massive" }, "This is a massive message")
      ])),
      code: `
        UI.Message.render({ size: "mini" }, "This is a mini message"),
        UI.Message.render({ size: "tiny" }, "This is a tiny message"),
        UI.Message.render({ size: "small" }, "This is a small message"),
        UI.Message.render({ size: "medium" }, "This is a medium message"),
        UI.Message.render({ size: "large" }, "This is a large message"),
        UI.Message.render({ size: "big" }, "This is a big message"),
        UI.Message.render({ size: "huge" }, "This is a huge message"),
        UI.Message.render({ size: "massive" }, "This is a massive message")`
    });
    return [ex1.DOM];
  }
}
