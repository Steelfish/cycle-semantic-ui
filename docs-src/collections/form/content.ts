import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace Content {
  export function run(sources): Stream<VNode> {
    let fieldExamples = createFieldExamples(sources);
    let fieldsExamples = createFieldsExamples(sources);
    let textareaExamples = createTextAreaExamples(sources);
    let checkboxExamples = createCheckboxExamples(sources);
    let radioCheckboxExamples = createRadioCheckboxExamples(sources);
    let dropdownExamples = createDropdownExamples(sources);
    let multipleSelectExamples = createMultipleSelectExamples(sources);
    let messageExamples = createMessageExamples(sources);
    return xs.combine.apply(null, [].concat(
      fieldExamples, fieldsExamples, textareaExamples,
      checkboxExamples, radioCheckboxExamples, dropdownExamples,
      multipleSelectExamples, messageExamples
    ).map(x => x.DOM));
  }

  function createFieldExamples(sources) {
    let ex = Example.run(sources, {
      header: "Field",
      description: "A field is a form element containing a label and an input",
      VNode$: xs.of(UI.Form.render([
        UI.Field.render({ content: { label: "User Input", main: [UI.Textbox.render()] } })
      ])),
      code: `UI.Form.render([
        UI.Field.render({ content: { label: "User Input", main: [UI.Textbox.render()]}})
      ])`
    });
    return [ex];
  }
  function createFieldsExamples(sources) {

    let ex1 = Example.run(sources, {
      header: "Fields",
      description: "A set of fields can appear grouped together",
      VNode$: xs.of(UI.Form.render([
        UI.Fields.render([
          UI.Field.render({ content: { label: "First name", main: [UI.Textbox.render({ placeholder: "First Name" })] } }),
          UI.Field.render({ content: { label: "Middle name", main: [UI.Textbox.render({ placeholder: "Middle Name" })] } }),
          UI.Field.render({ content: { label: "Last name", main: [UI.Textbox.render({ placeholder: "Last Name" })] } })
        ])
      ])),
      code: `UI.Form.render([
        UI.Fields.render([
          UI.Field.render({content: { label: "First name", main: [UI.Textbox.render({placeholder: "First Name"})]}}),
          UI.Field.render({content: { label: "Middle name", main: [UI.Textbox.render({placeholder: "Middle Name"})]}}),
          UI.Field.render({content: { label: "Last name", main: [UI.Textbox.render({placeholder: "Last Name"})]}})
        ])
      ])`

    });
    let ex2 = Example.run(sources, {
      VNode$: xs.of(UI.Form.render([
        UI.Fields.render({ equalWidth: true }, [
          UI.Field.render({ content: { label: "First name", main: [UI.Textbox.render({ placeholder: "First Name" })] } }),
          UI.Field.render({ content: { label: "Middle name", main: [UI.Textbox.render({ placeholder: "Middle Name" })] } }),
          UI.Field.render({ content: { label: "Last name", main: [UI.Textbox.render({ placeholder: "Last Name" })] } })
        ])
      ])),
      code: `UI.Form.render([
        UI.Fields.render({equalWidth: true}, [
          UI.Field.render({content: { label: "First name", main: [UI.Textbox.render({placeholder: "First Name"})]}}),
          UI.Field.render({content: { label: "Middle name", main: [UI.Textbox.render({placeholder: "Middle Name"})]}}),
          UI.Field.render({content: { label: "Last name", main: [UI.Textbox.render({placeholder: "Last Name"})]}})
        ])
      ])`
    });
    let ex3 = Example.run(sources, {
      VNode$: xs.of(UI.Form.render([
        UI.Fields.render({ inline: true }, [
          UI.Field.render({
            style: { width: 8 },
            content: { label: "Name", main: [UI.Textbox.render({ placeholder: "First Name" })] }
          }),
          UI.Field.render({
            style: { width: 3 },
            content: [UI.Textbox.render({ placeholder: "Middle Name" })]
          }),
          UI.Field.render({
            style: { width: 5 },
            content: [UI.Textbox.render({ placeholder: "Last Name" })]
          })
        ])
      ])),
      code: `UI.Form.render([
        UI.Fields.render({inline: true}, [
          UI.Field.render({
            style: {width: 8},
            content: { label: "Name", main: [UI.Textbox.render({placeholder: "First Name"})]}
          }),
          UI.Field.render({
            style: {width: 3},
            content: [UI.Textbox.render({placeholder: "Middle Name"})]
          }),
          UI.Field.render({
            style: {width: 5},
            content: [UI.Textbox.render({placeholder: "Last Name"})]
          })
        ])
      ])`
    });
    return [ex1, ex2, ex3];
  }
  function createTextAreaExamples(sources) {
    let ex = Example.run(sources, {
      header: "Text Area",
      description: "A textarea can be used to allow for extended user input.",
      VNode$: xs.of(UI.Form.render([
        UI.Field.render({
          content: {
            label: "Text",
            main: [UI.Textbox.render({ rows: 10 })]
          }
        }),
        UI.Field.render({
          content: {
            label: "Short text",
            main: [UI.Textbox.render({ rows: 2 })]
          }
        })
      ])),
      code: `UI.Form.render([
        UI.Field.render({content: { 
          label: "Text",
          main: [UI.Textbox.render({rows: 10})]
        }}),
        UI.Field.render({content: { 
          label: "Short text",
          main: [UI.Textbox.render({rows: 2})]
        }})
      ])`
    });
    return [ex];
  }
  function createCheckboxExamples(sources) {
    let example = Example.run(sources, {
      header: "Checkbox",
      description: "A form can contain a checkbox",
      VNode$: xs.of(UI.Form.render([
        UI.Field.render({ inline: true }, [UI.Checkbox.render("Checkbox")]),
        UI.Field.render({ inline: true }, [UI.Checkbox.render({ slider: true }, "Slider")]),
        UI.Field.render({ inline: true }, [UI.Checkbox.render({ toggle: true }, "Toggle")])
      ])),
      code: `UI.Form.render([
        UI.Field.render({inline: true}, [UI.Checkbox.render("Checkbox")]),
        UI.Field.render({inline: true}, [UI.Checkbox.render({slider: true}, "Slider")]),
        UI.Field.render({inline: true}, [UI.Checkbox.render({toggle: true}, "Toggle")])
      ])`
    });
    return [example];
  }

  function createRadioCheckboxExamples(sources) {
    let example = Example.run(sources, {
      header: "Radio Checkbox",
      description: "A form can contain a radio checkbox",
      VNode$: xs.of(UI.Form.render([
        UI.Fields.render({
          style: { inline: true },
          content: {
            label: "Select your favourite fruit:",
            main: [
              UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Apples")]),
              UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Oranges")]),
              UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Pears")]),
              UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Grapefruit")])
            ]
          }
        }),
        UI.Fields.render({
          style: { grouped: true },
          content: {
            label: "Select your favourite fruit:",
            main: [
              UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Apples")]),
              UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Oranges")]),
              UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Pears")]),
              UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Grapefruit")])
            ]
          }
        })
      ])),
      code: `UI.Form.render([
        UI.Fields.render({
          style: { inline: true },
          content: {
            label: "Select your favourite fruit:",
            main: [
              UI.Field.render([UI.Checkbox.render({radio: true, name: "fruit"}, "Apples")]),
              UI.Field.render([UI.Checkbox.render({radio: true, name: "fruit"}, "Oranges")]),
              UI.Field.render([UI.Checkbox.render({radio: true, name: "fruit"}, "Pears")]),
              UI.Field.render([UI.Checkbox.render({radio: true, name: "fruit"}, "Grapefruit")])
            ]
          }
        }),
        UI.Fields.render({
          style: { grouped: true },
          content: {
            label: "Select your favourite fruit:",
            main: [
              UI.Field.render([UI.Checkbox.render({radio: true, name: "fruit"}, "Apples")]),
              UI.Field.render([UI.Checkbox.render({radio: true, name: "fruit"}, "Oranges")]),
              UI.Field.render([UI.Checkbox.render({radio: true, name: "fruit"}, "Pears")]),
              UI.Field.render([UI.Checkbox.render({radio: true, name: "fruit"}, "Grapefruit")])
            ]
          }
        })
      ])`
    });
    return [example];
  }
  function createDropdownExamples(sources) {
    let ddlGender = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({ default: "Gender", selection: true }),
      content$: xs.of([
        { body: "Male", value: "Male" },
        { body: "Female", value: "Female" }
      ])
    });
    let ex1 = Example.run(sources, {
      header: "Dropdown",
      description: "A form can contain a dropdown",
      VNode$: ddlGender.DOM.map(ddlGender => UI.Form.render([
        UI.Field.render({ content: { label: "Gender", main: ddlGender } })
      ])),
      code: `let ddlGender = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({default: "Gender", selection: true}),
      content$: xs.of([
        {body: "Male", value: "Male"},
        {body: "Female", value: "Female"}
      ])
    });
    let vTree$ = ddlGender.DOM.map(
        ddlGender => UI.Form.render([
        UI.Field.render({content: {label: "Gender", main: ddlGender}})
      ])
    );`
    });

    let countries = ["United States", "The Netherlands", "Belgium", "Germany", "France"];
    let ddlCountries = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({ selection: true, search: true }),
      content$: xs.of(countries.map(country => ({ body: country, value: country })))
    });
    let ex2 = Example.run(sources, {
      VNode$: ddlCountries.DOM.map(ddlCountries => UI.Form.render([
        UI.Field.render({content: { label: "Country", main: ddlCountries}})
      ])),
      code: `let countries = ["United States", "The Netherlands", "Belgium", "Germany", "France"];
    let ddlCountries = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({ selection: true, search: true }),
      content$: xs.of(countries.map(country => ({ body: country, value: country })))
    })
    let vTree$: ddlCountries.DOM.map(
      ddlCountries => UI.Form.render([
        UI.Field.render({content: { label: "Country", main: ddlCountries}})
      ])
    )`
    });

    return [ex1, ex2];
  }
  function createMultipleSelectExamples(sources) {
    return [];
  }
  function createMessageExamples(sources) {
    let example = Example.run(sources, {
      header: "Message",
      description: "A form can contain a message",
      VNode$: xs.of(UI.Form.render([
        UI.Message.render({color: UI.Color.Error}, {
          header: "We had some issues",
          body: [UI.List.render({bulleted: true},[
            {content: "Please enter your first name"},
            {content: "Please enter your last name"}
          ])]
        })
      ])),
      code: `UI.Form.render([
        UI.Message.render({color: UI.Color.Error}, {
          header: "We had some issues",
          body: [UI.List.render({bulleted: true},[
            {content: "Please enter your first name"},
            {content: "Please enter your last name"}
          ])]
        })
      ])`
    });
    return [example];
  }
}
