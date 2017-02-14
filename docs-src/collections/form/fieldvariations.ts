import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace FieldVariations {
  export function run(sources): Stream<VNode> {
    let inlineEx = Example.run(sources, {
      header: "Inline",
      description: "A field can have its label next to instead of above it.",
      VNode$: xs.of(UI.Form.render([
        UI.Field.render({
          style: { inline: true },
          content: {
            label: "Full name",
            main: [UI.Textbox.render({ placeholder: "Full Name" })]
          }
        })
      ])),
      code: `UI.Form.render([
        UI.Field.render({
          style: {inline: true},
          content: {
            label: "Full name",
            main: [UI.Textbox.render({placeholder: "Full Name"})]
          }
        })
      ])`
    });

    let widthEx = Example.run(sources, {
      header: "Width",
      description: "A field can specify its width in grid columns",
      VNode$: xs.of(UI.Form.render([
        UI.Fields.render([
          UI.Field.render({
            style: { width: 6 },
            content: {
              label: "First name",
              main: [UI.Textbox.render({ placeholder: "First Name" })]
            }
          }),
          UI.Field.render({
            style: { width: 4 },
            content: {
              label: "Middle",
              main: [UI.Textbox.render({ placeholder: "Middle Name" })]
            }
          }),
          UI.Field.render({
            style: { width: 6 },
            content: {
              label: "Last name",
              main: [UI.Textbox.render({ placeholder: "Last Name" })]
            }
          })
        ]),
        UI.Fields.render([
          UI.Field.render({ width: 2 }, [UI.Textbox.render({ placeholder: "2 Wide" })]),
          UI.Field.render({ width: 12 }, [UI.Textbox.render({ placeholder: "12 Wide" })]),
          UI.Field.render({ width: 2 }, [UI.Textbox.render({ placeholder: "2 Wide" })])
        ]),
        UI.Fields.render([
          UI.Field.render({ width: 8 }, [UI.Textbox.render({ placeholder: "8 Wide" })]),
          UI.Field.render({ width: 6 }, [UI.Textbox.render({ placeholder: "6 Wide" })]),
          UI.Field.render({ width: 2 }, [UI.Textbox.render({ placeholder: "2 Wide" })])
        ])
      ])),
      code: `UI.Form.render([
        UI.Fields.render([
          UI.Field.render({
            style: { width: 6 },
            content: {
              label: "First name",
              main: [UI.Textbox.render({ placeholder: "First Name" })]
            }
          }),
          UI.Field.render({
            style: { width: 4 },
            content: {
              label: "Middle",
              main: [UI.Textbox.render({ placeholder: "Middle Name" })]
            }
          }),
          UI.Field.render({
            style: { width: 6 },
            content: {
              label: "Last name",
              main: [UI.Textbox.render({ placeholder: "Last Name" })]
            }
          })
        ]),
        UI.Fields.render([
          UI.Field.render({ width: 2 }, [UI.Textbox.render({ placeholder: "2 Wide" })]),
          UI.Field.render({ width: 12 }, [UI.Textbox.render({ placeholder: "12 Wide" })]),
          UI.Field.render({ width: 2 }, [UI.Textbox.render({ placeholder: "2 Wide" })])
        ]),
        UI.Fields.render([
          UI.Field.render({ width: 8 }, [UI.Textbox.render({ placeholder: "8 Wide" })]),
          UI.Field.render({ width: 6 }, [UI.Textbox.render({ placeholder: "6 Wide" })]),
          UI.Field.render({ width: 2 }, [UI.Textbox.render({ placeholder: "2 Wide" })])
        ])
      ])`
    });

    let requiredEx = Example.run(sources, {
      header:"Required",
      description: "A field can show that input is mandetory",
      VNode$: xs.of(UI.Form.render([
        UI.Field.render({
          style: {required: true},
          content: {
            label: "Full name",
            main: [UI.Textbox.render({placeholder: "Full Name"})]
          }
        }),
        UI.Field.render([UI.Checkbox.render("I agree to the Terms and Conditions")])
      ])),
      code: `UI.Form.render([
        UI.Field.render({
          style: {required: true},
          content: {
            label: "Full name",
            main: [UI.Textbox.render({placeholder: "Full Name"})]
          }
        }),
        UI.Field.render([UI.Checkbox.render("I agree to the Terms and Conditions")])
      ])`
    });

    return xs.combine(inlineEx.DOM, widthEx.DOM, requiredEx.DOM);
  }
}
