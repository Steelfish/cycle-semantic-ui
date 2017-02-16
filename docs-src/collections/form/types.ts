import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace Types {
  export function run(sources): Stream<VNode> {
    let ex = Example.run(sources, {
      header: "Form",
      description: "A form",
      VNode$: xs.of(UI.Form.render([
        UI.Field.render({ content: { label: "First Name", main: UI.Textbox.render({ placeholder: "First Name" }) } }),
        UI.Field.render({ content: { label: "Last Name", main: UI.Textbox.render({ placeholder: "Last Name" }) } }),
        UI.Field.render([UI.Checkbox.render("I agree to the Terms and Conditions")]),
        UI.Button.render("Submit")
      ])),
      code: `UI.Form.render([
        UI.Field.render({ content: { label: "First Name", main: UI.Textbox.render({ placeholder: "First Name" }) } }),
        UI.Field.render({ content: { label: "Last Name", main: UI.Textbox.render({ placeholder: "Last Name" }) } }),
        UI.Field.render([UI.Checkbox.render("I agree to the Terms and Conditions")]),
        UI.Button.render("Submit")
      ])`
    });
    let states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware"];
    let ddlStates = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({ selection: true }),
      content$: xs.of(states.map(state => ({ body: state, value: state })))
    });
    let countries = ["United States", "The Netherlands", "Belgium", "Germany", "France"];
    let ddlCountries = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({ selection: true, search: true }),
      content$: xs.of(countries.map(country => ({ body: country, value: country })))
    });
    let cards = ["Visa", "American Express", "Discover"];
    let ddlCards = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({ selection: true }),
      content$: xs.of(cards.map(card => ({ body: card, value: card })))
    });
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let ddlMonths = UI.Dropdown.run({
      DOM: sources.DOM,
      props$: xs.of({ selection: true, search: true, size: UI.Size.Fluid }),
      content$: xs.of(months.map(month => ({ body: month, value: month })))
    });
    let ex2 = Example.run(sources, {
      VNode$: xs.combine(ddlStates.DOM, ddlCountries.DOM, ddlCards.DOM, ddlMonths.DOM).map(
        ([ddlStates, ddlCountries, ddlCards, ddlMonths]) => UI.Form.render([
          UI.Header.render({ dividing: true }, "Shipping Information"),
          UI.Field.render({
            content: {
              label: "Name", main: [
                UI.Fields.render({ equalWidth: true }, [
                  UI.Field.render(UI.Textbox.render({ placeholder: "First Name" })),
                  UI.Field.render(UI.Textbox.render({ placeholder: "Last Name" }))
                ])
              ]
            }
          }),
          UI.Field.render({
            content: {
              label: "Billing adress", main: [
                UI.Fields.render([
                  UI.Field.render({ width: 12 }, [UI.Textbox.render({ placeholder: "Street Adress" })]),
                  UI.Field.render({ width: 4 }, [UI.Textbox.render({ placeholder: "Apt #" })])
                ])
              ]
            }
          }),
          UI.Fields.render({ equalWidth: true }, [
            UI.Field.render({ content: { label: "State", main: ddlStates } }),
            UI.Field.render({ content: { label: "Country", main: ddlCountries } })
          ]),
          UI.Header.render({ dividing: true }, "Billing Information"),
          UI.Field.render({ content: { label: "Card Type", main: ddlCards } }),
          UI.Fields.render([
            UI.Field.render({ props: { width: 7 }, content: { label: "Card Number", main: [UI.Textbox.render({ placeholder: "Card #" })] } }),
            UI.Field.render({ props: { width: 3 }, content: { label: "CVC", main: [UI.Textbox.render({ placeholder: "CVC" })] } }),
            UI.Field.render({
              props: { width: 6 }, content: {
                label: "Expiration", main: [
                  UI.Fields.render({ equalWidth: true }, [
                    UI.Field.render([ddlMonths]),
                    UI.Field.render([UI.Textbox.render({ placeholder: "Year" })])
                  ])
                ]
              }
            })
          ]),
          UI.Header.render({ dividing: true }, "Receipt"),
          //TODO Multiple dropdown example,
          UI.Segment.render([
            UI.Checkbox.render({ toggle: true }, "Do not include a receipt in the package")
          ]),
          UI.Button.render("Submit order")
        ])
      ),
      code: `let states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware"];
      let ddlStates = UI.Dropdown.run({
        DOM: sources.DOM,
        props$: xs.of({selection: true}),
        content$: xs.of(states.map(state => ({body: state, value: state})))
      });
      let countries = ["United States", "The Netherlands", "Belgium", "Germany", "France"];
      let ddlCountries = UI.Dropdown.run({
        DOM: sources.DOM,
        props$: xs.of({selection: true, search: true}),
        content$: xs.of(countries.map(country => ({body: country, value: country})))
      });
      let cards = ["Visa", "American Express", "Discover"];
      let ddlCards = UI.Dropdown.run({
        DOM: sources.DOM,
        props$: xs.of({selection: true}),
        content$: xs.of(cards.map(card => ({body: card, value: card})))
      });
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let ddlMonths = UI.Dropdown.run({
        DOM: sources.DOM,
        props$: xs.of({selection: true, search: true, size: UI.Size.Fluid}),
        content$: xs.of(months.map(month => ({body: month, value: month})))
      });
      let vTree$: xs.combine(ddlStates.DOM, ddlCountries.DOM, ddlCards.DOM, ddlMonths.DOM).map(
        ([ddlStates, ddlCountries, ddlCards, ddlMonths]) => UI.Form.render([
          UI.Header.render({dividing: true}, "Shipping Information"),
          UI.Field.render({ content: { label: "Name", main: [
            UI.Fields.render({equalWidth: true}, [
              UI.Field.render(UI.Textbox.render({placeholder: "First Name"})),
              UI.Field.render(UI.Textbox.render({placeholder: "Last Name"}))
            ])
          ]}}),
          UI.Field.render({ content: { label: "Billing adress", main: [
            UI.Fields.render([
              UI.Field.render({ width: 12}, [UI.Textbox.render({placeholder: "Street Adress"})]),
              UI.Field.render({ width: 4}, [UI.Textbox.render({placeholder: "Apt #"})])
            ])
          ]}}),
          UI.Fields.render({equalWidth: true}, [
            UI.Field.render({content: {label: "State", main: ddlStates}}),
            UI.Field.render({content: {label: "Country", main: ddlCountries}})
          ]),
          UI.Header.render({dividing: true}, "Billing Information"),
          UI.Field.render({content: { label: "Card Type", main: ddlCards}}),
          UI.Fields.render([
            UI.Field.render({props: {width: 7}, content: { label: "Card Number", main: [UI.Textbox.render({placeholder: "Card #"})]}}),
            UI.Field.render({props: {width: 3}, content: { label: "CVC", main: [UI.Textbox.render({placeholder: "CVC"})]}}),
            UI.Field.render({props: {width: 6}, content: { label: "Expiration", main: [
              UI.Fields.render({equalWidth: true}, [
                UI.Field.render([ddlMonths]),
                UI.Field.render([UI.Textbox.render({placeholder: "Year"})])
              ])
            ]}})
          ]),
          UI.Header.render({dividing: true}, "Receipt"),
          //TODO Multiple dropdown example,
          UI.Segment.render([
            UI.Checkbox.render({toggle: true}, "Do not include a receipt in the package")
          ]),
          UI.Button.render("Submit order")
        ])
      )`
    });
    return xs.combine(ex.DOM, ex2.DOM);
  }
}
