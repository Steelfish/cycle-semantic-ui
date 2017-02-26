import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace FormVariations {
  export function run(sources): Stream<VNode[]> {
    let equalWidthExample = Example.run(sources, {
      header: "Equal Width",
      description: "Forms can automatically divide fields to be equal width",
      VNode$: xs.of(UI.Form.render({ equalWidth: true }, [
        UI.Fields.render([
          UI.Field.render({
            content: {
              label: "Username",
              main: [UI.Textbox.render({ placeholder: "Username" })]
            }
          }),
          UI.Field.render({
            content: {
              label: "Password",
              main: [UI.Textbox.render({ type: "password", placeholder: "Password" })]
            }
          })
        ]),
        UI.Fields.render([
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
      code: `UI.Form.render({ equalWidth: true}, [
        UI.Fields.render([
          UI.Field.render({content: {
            label: "Username",
            main: [UI.Textbox.render({placeholder: "Username"})]
          }}),
          UI.Field.render({content: {
            label: "Password",
            main: [UI.Textbox.render({type: "password", placeholder: "Password"})]
          }})
        ]),
        UI.Fields.render([
          UI.Field.render({content: {
            label: "First name",
            main: [UI.Textbox.render({placeholder: "First Name"})]
          }}),
          UI.Field.render({content: {
            label: "Middle name",
            main: [UI.Textbox.render({placeholder: "Middle Name"})]
          }}),
          UI.Field.render({content: {
            label: "Last name",
            main: [UI.Textbox.render({placeholder: "Last Name"})]
          }})
        ])
      ])`
    });

    let invertedEx = Example.run(sources, {
      header: "Inverted",
      description: "A form on a dark background may have to invert its color scheme",
      VNode$: xs.of(UI.Segment.render({ inverted: true }, [
        UI.Form.render({ inverted: true }, [
          UI.Fields.render({ equalWidth: true }, [
            UI.Field.render({
              content: {
                label: "First Name",
                main: [UI.Textbox.render({ placeholder: "First Name" })]
              }
            }),
            UI.Field.render({
              content: {
                label: "Last name",
                main: [UI.Textbox.render({ placeholder: "Last Name" })]
              }
            })
          ]),
          UI.Field.render({inline: true}, [UI.Checkbox.render("I agree to the Terms and Conditions")]),
          UI.Button.render("Submit")
        ])
      ])),
      code: `UI.Segment.render({ inverted: true }, [
        UI.Form.render({ inverted: true }, [
          UI.Fields.render({ equalWidth: true }, [
            UI.Field.render({
              content: {
                label: "First Name",
                main: [UI.Textbox.render({ placeholder: "First Name" })]
              }
            }),
            UI.Field.render({
              content: {
                label: "Last name",
                main: [UI.Textbox.render({ placeholder: "Last Name" })]
              }
            })
          ]),
          UI.Field.render({inline: true}, [UI.Checkbox.render("I agree to the Terms and Conditions")]),
          UI.Button.render("Submit")
        ])
      ])`
    });

    let examples = [].concat(createSizeVariations(sources), equalWidthExample, invertedEx);
    return xs.combine.apply(null, examples.map(ex => ex.DOM));
  }

  function createSizeVariations(sources) {
    let ex = Example.run(sources, {
      header: "Size",
      description: "A form can vary in size",
      VNode$: xs.of(UI.Form.render({ size: "mini" }, [
        UI.Fields.render([
          UI.Field.render({
            content: {
              label: "First Name",
              main: [UI.Textbox.render({ placeholder: "First Name" })]
            }
          }),
          UI.Field.render({
            content: {
              label: "Last Name",
              main: [UI.Textbox.render({ placeholder: "Last Name" })]
            }
          })
        ]),
        UI.Button.render("Submit")
      ])),
      code: `UI.Form.render({size: "mini"}, [
        UI.Fields.render([
          UI.Field.render({
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
        UI.Button.render("Submit")
      ])`
    });
    let ex2 = Example.run(sources, {
      VNode$: xs.of(UI.Form.render({ size: "tiny" }, [
        UI.Fields.render([
          UI.Field.render({
            content: {
              label: "First Name",
              main: [UI.Textbox.render({ placeholder: "First Name" })]
            }
          }),
          UI.Field.render({
            content: {
              label: "Last Name",
              main: [UI.Textbox.render({ placeholder: "Last Name" })]
            }
          })
        ]),
        UI.Button.render("Submit")
      ])),
      code: `UI.Form.render({size: "tiny"}, [
        UI.Fields.render([
          UI.Field.render({
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
        UI.Button.render("Submit")
      ])`
    });
    let ex3 = Example.run(sources, {
      VNode$: xs.of(UI.Form.render({ size: "small" }, [
        UI.Fields.render([
          UI.Field.render({
            content: {
              label: "First Name",
              main: [UI.Textbox.render({ placeholder: "First Name" })]
            }
          }),
          UI.Field.render({
            content: {
              label: "Last Name",
              main: [UI.Textbox.render({ placeholder: "Last Name" })]
            }
          })
        ]),
        UI.Button.render("Submit")
      ])),
      code: `UI.Form.render({size: "small"}, [
        UI.Fields.render([
          UI.Field.render({
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
        UI.Button.render("Submit")
      ])`
    });
    let ex4 = Example.run(sources, {
      VNode$: xs.of(UI.Form.render({ size: "medium" }, [
        UI.Fields.render([
          UI.Field.render({
            content: {
              label: "First Name",
              main: [UI.Textbox.render({ placeholder: "First Name" })]
            }
          }),
          UI.Field.render({
            content: {
              label: "Last Name",
              main: [UI.Textbox.render({ placeholder: "Last Name" })]
            }
          })
        ]),
        UI.Button.render("Submit")
      ])),
      code: `medium`
    });
    let ex5 = Example.run(sources, {
      VNode$: xs.of(UI.Form.render({ size: "large" }, [
        UI.Fields.render([
          UI.Field.render({
            content: {
              label: "First Name",
              main: [UI.Textbox.render({ placeholder: "First Name" })]
            }
          }),
          UI.Field.render({
            content: {
              label: "Last Name",
              main: [UI.Textbox.render({ placeholder: "Last Name" })]
            }
          })
        ]),
        UI.Button.render("Submit")
      ])),
      code: `UI.Form.render({size: "large"}, [
        UI.Fields.render([
          UI.Field.render({
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
        UI.Button.render("Submit")
      ])`
    });
    let ex6 = Example.run(sources, {
      VNode$: xs.of(UI.Form.render({ size: "big" }, [
        UI.Fields.render([
          UI.Field.render({
            content: {
              label: "First Name",
              main: [UI.Textbox.render({ placeholder: "First Name" })]
            }
          }),
          UI.Field.render({
            content: {
              label: "Last Name",
              main: [UI.Textbox.render({ placeholder: "Last Name" })]
            }
          })
        ]),
        UI.Button.render("Submit")
      ])),
      code: `UI.Form.render({size: "big"}, [
        UI.Fields.render([
          UI.Field.render({
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
        UI.Button.render("Submit")
      ])`
    });
    let ex7 = Example.run(sources, {
      VNode$: xs.of(UI.Form.render({ size: "huge" }, [
        UI.Fields.render([
          UI.Field.render({
            content: {
              label: "First Name",
              main: [UI.Textbox.render({ placeholder: "First Name" })]
            }
          }),
          UI.Field.render({
            content: {
              label: "Last Name",
              main: [UI.Textbox.render({ placeholder: "Last Name" })]
            }
          })
        ]),
        UI.Button.render("Submit")
      ])),
      code: `UI.Form.render({size: "huge"}, [
        UI.Fields.render([
          UI.Field.render({
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
        UI.Button.render("Submit")
      ])`
    });
    let ex8 = Example.run(sources, {
      VNode$: xs.of(UI.Form.render({ size: "massive" }, [
        UI.Fields.render([
          UI.Field.render({
            content: {
              label: "First Name",
              main: [UI.Textbox.render({ placeholder: "First Name" })]
            }
          }),
          UI.Field.render({
            content: {
              label: "Last Name",
              main: [UI.Textbox.render({ placeholder: "Last Name" })]
            }
          })
        ]),
        UI.Button.render("Submit")
      ])),
      code: `UI.Form.render({size: "massive"}, [
        UI.Fields.render([
          UI.Field.render({
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
        UI.Button.render("Submit")
      ])`
    });
    return [ex, ex2, ex3, ex4, ex5, ex6, ex7, ex8];
  }
}
