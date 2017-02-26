import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace FieldsVariations {
  export function run(sources): Stream<VNode[]> {
    let equalWidthEx = Example.run(sources, {
      header: "Evenly Divided",
      description: "Fields can have their widths divided evenly",
      VNode$: xs.of(UI.Form.render([
        UI.Fields.render({ equalWidth: true }, [
          UI.Field.render({
            content: {
              label: "First name",
              main: [UI.Textbox.render({ placeholder: "First Name" })]
            }
          }),
          UI.Field.render({
            content: {
              label: "Middle name",
              main: [UI.Textbox.render({ placeholder: "Middle Name" })]
            }
          }),
          UI.Field.render({
            content: {
              label: "Last name",
              main: [UI.Textbox.render({ placeholder: "Last Name" })]
            }
          })
        ])
      ])),
      code: `UI.Form.render([
        UI.Fields.render({ equalWidth: true }, [
          UI.Field.render({
            content: {
              label: "First name",
              main: [UI.Textbox.render({ placeholder: "First Name" })]
            }
          }),
          UI.Field.render({
            content: {
              label: "Middle name",
              main: [UI.Textbox.render({ placeholder: "Middle Name" })]
            }
          }),
          UI.Field.render({
            content: {
              label: "Last name",
              main: [UI.Textbox.render({ placeholder: "Last Name" })]
            }
          })
        ])
      ])`
    });

    let groupedEx = Example.run(sources, {
      header: "Grouped fields",
      description: "Fields can show related choices",
      VNode$: xs.of(UI.Form.render([
        UI.Fields.render({ grouped: true }, [
          UI.Field.render([UI.Checkbox.render({ name: "fruit", radio: true }, "Apples")]),
          UI.Field.render([UI.Checkbox.render({ name: "fruit", radio: true }, "Oranges")]),
          UI.Field.render([UI.Checkbox.render({ name: "fruit", radio: true }, "Pears")]),
          UI.Field.render([UI.Checkbox.render({ name: "fruit", radio: true }, "Grapefruit")])
        ])
      ])),
      code: `UI.Form.render([
        UI.Fields.render({ grouped: true }, [
          UI.Field.render([UI.Checkbox.render({ name: "fruit", radio: true }, "Apples")]),
          UI.Field.render([UI.Checkbox.render({ name: "fruit", radio: true }, "Oranges")]),
          UI.Field.render([UI.Checkbox.render({ name: "fruit", radio: true }, "Pears")]),
          UI.Field.render([UI.Checkbox.render({ name: "fruit", radio: true }, "Grapefruit")])
        ])
      ])`
    });

    let inlineEx = Example.run(sources, {
      header: "Inline",
      description: "Multiple fields may be inline in a row",
      VNode$: xs.of(UI.Form.render([
        UI.Fields.render({
          props: { inline: true },
          content: {
            label: "Phone Number",
            main: [
              UI.Field.render([UI.Textbox.render({placeholder: "(xxx)"})]),
              UI.Field.render([UI.Textbox.render({placeholder: "xxx"})]),
              UI.Field.render([UI.Textbox.render({placeholder: "xxxx"})])
            ]
          }
        })
      ])),
      code: `UI.Form.render([
        UI.Fields.render({
          props: { inline: true },
          content: {
            label: "Phone Number",
            main: [
              UI.Field.render([UI.Textbox.render({placeholder: "(xxx)"})]),
              UI.Field.render([UI.Textbox.render({placeholder: "xxx"})]),
              UI.Field.render([UI.Textbox.render({placeholder: "xxxx"})])
            ]
          }
        })
      ])`
    });

    return xs.combine(equalWidthEx.DOM, groupedEx.DOM, inlineEx.DOM);
  }
}
