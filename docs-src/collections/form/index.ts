import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { div, VNode } from "@cycle/dom";
import { Types } from "./types";
import { Content } from "./content";
import { States } from "./states";
import { FormVariations } from "./formvariations";
import { FieldVariations } from "./fieldvariations";
import { FieldsVariations } from "./fieldsvariations";

export namespace Form {
  export function run(sources) {
    let types = Types.run(sources);
    let content = Content.run(sources);
    let states = States.run(sources);
    let formVariations = FormVariations.run(sources);
    let fieldVariations = FieldVariations.run(sources);
    let fieldsVariations = FieldsVariations.run(sources);

    const vTree$ = xs.combine(types, content, states, formVariations, fieldVariations, fieldsVariations).map(
      ([types, content, states, formVariations, fieldVariations, fieldsVariations]) =>
        div({ props: { className: "article" } }, [
          UI.Segment.render({ vertical: true }, [
            UI.Container.render([
              UI.Header.render({
                props: { size: UI.Size.Huge },
                content: {
                  main: "Form",
                  subtext: "A form displays a set of related user input fields in a structured way"
                }
              }),
            ]),
          ]),
          UI.Container.render([
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Types")]
              .concat(types)
            ),
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Content")]
              .concat(content)
            ),
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "States")]
              .concat(states)
            ),
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Form Variations")]
              .concat(formVariations)
            ),
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Field Variations")]
              .concat(fieldVariations)
            ),
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Group Variations")]
              .concat(fieldsVariations)
            )
          ]),
        ])
    ) as Stream<VNode>;
    return {
      DOM: vTree$,
      router: xs.never()
    };
  }

}
