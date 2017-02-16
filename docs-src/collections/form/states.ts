import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace States {
  export function run(sources): Stream<VNode> {
    let loadingEx = Example.run(sources, {
      header: "Loading",
      description: "If a form is in loading state, it will automatically show a loading indicator.",
      VNode$: xs.of(UI.Form.render({loading: true}, [
        UI.Field.render({ content: { label: "Email", main: [UI.Textbox.render()] } }),
        UI.Button.render("Submit")
      ])),
      code: `UI.Form.render({loading: true}, [
        UI.Field.render({ content: { label: "Email", main: [UI.Textbox.render()] } }),
        UI.Button.render("Submit")
      ])`
    });
    
    let ddlGender = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({ default: "Gender", selection: true }),
      content$: xs.of([
        { body: "Male", value: "Male" },
        { body: "Female", value: "Female" }
      ])
    });
    let fieldErrorEx = Example.run(sources, {
      header: "Field Error",
      description: "Individual fields may display an error state",
      VNode$: ddlGender.DOM.map(
        ddlGender => UI.Form.render([
          UI.Fields.render({equalWidth: true}, [
            UI.Field.render({
              props: {error: true},
              content: {
                label: "First Name",
                main: [UI.Textbox.render({placeholder: "First Name"})]
              }
            }),
            UI.Field.render({
              content: {
                label: "Last Name",
                main: [UI.Textbox.render({placeholder: "Last Name"})]
              }
            })
          ]),
          UI.Field.render({
            props: {error: true},
            content: {label: "Gender", main: ddlGender}
          }),
          UI.Field.render({
            props: {error: true},
            content: [UI.Checkbox.render("I agree to the Terms and Conditions")]
          }),
        ])
      ),
      code: `let ddlGender = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({ default: "Gender", selection: true }),
      content$: xs.of([
        { body: "Male", value: "Male" },
        { body: "Female", value: "Female" }
      ])
    });
    let vTree$ = ddlGender.DOM.map(
      ddlGender => UI.Form.render([
        UI.Fields.render({equalWidth: true}, [
          UI.Field.render({
            props: {error: true},
            content: {
              label: "First Name",
              main: [UI.Textbox.render({placeholder: "First Name"})]
            }
          }),
          UI.Field.render({
            content: {
              label: "Last Name",
              main: [UI.Textbox.render({placeholder: "Last Name"})]
            }
          })
        ]),
        UI.Field.render({
          props: {error: true},
          content: {label: "Gender", main: ddlGender}
        }),
        UI.Field.render({
          props: {error: true},
          content: [UI.Checkbox.render("I agree to the Terms and Conditions")]
        }),
      ])
    )`
    });
    
    let disabledFieldEx = Example.run(sources, {
      header: "Disabled Field",
      description: "Individual fields may be disabled",
      VNode$: xs.of(UI.Form.render([
        UI.Fields.render({equalWidth: true}, [
          UI.Field.render({
            props: { disabled: true},
            content: { 
              label: "First Name",
              main: [UI.Textbox.render({disabled: true, placeholder: "Disabled"})]
            }
          }),
          UI.Field.render({
            props: { disabled: true},
            content: { 
              label: "Last Name",
              main: [UI.Textbox.render({disabled: true, placeholder: "Disabled"})]
            }
          })
        ])
      ])),
      code: `UI.Form.render([
        UI.Fields.render({equalWidth: true}, [
          UI.Field.render({
            props: { disabled: true},
            content: { 
              label: "First Name",
              main: [UI.Textbox.render({disabled: true, placeholder: "Disabled"})]
            }
          }),
          UI.Field.render({
            props: { disabled: true},
            content: { 
              label: "Last Name",
              main: [UI.Textbox.render({disabled: true, placeholder: "Disabled"})]
            }
          })
        ])
      ])`
    });

    let readOnlyEx = Example.run(sources, {
      header: "Read-Only Field",
      description: "Invidual fields may be read only",
      VNode$: xs.of(UI.Form.render([
        UI.Fields.render({equalWidth: true}, [
          UI.Field.render({
            content: { 
              label: "First Name",
              main: [UI.Textbox.render({readonly: true, placeholder: "Read Only"})]
            }
          }),
          UI.Field.render({
            content: { 
              label: "Last Name",
              main: [UI.Textbox.render({readonly: true, placeholder: "Read Only"})]
            }
          })
        ])
      ])),
      code: `UI.Form.render([
        UI.Fields.render({equalWidth: true}, [
          UI.Field.render({
            content: { 
              label: "First Name",
              main: [UI.Textbox.render({readonly: true, placeholder: "Read Only"})]
            }
          }),
          UI.Field.render({
            content: { 
              label: "Last Name",
              main: [UI.Textbox.render({readonly: true, placeholder: "Read Only"})]
            }
          })
        ])
      ])`
    });

    return xs.combine(loadingEx.DOM, fieldErrorEx.DOM, disabledFieldEx.DOM, readOnlyEx.DOM);
  }
}
