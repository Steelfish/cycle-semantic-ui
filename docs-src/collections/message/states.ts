import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { VNode } from "@cycle/dom";
import { Example } from "../../components";

export namespace States {
  export function run(sources): Stream<VNode[]> {
    let ex1 = Example.run(sources, {
      header: "Hidden",
      description: "A message can be hidden",
      VNode$: xs.of(UI.Message.render({hidden: true}, "You can't see me!")),
      code: `UI.Message.render({hidden: true}, "You can't see me!")`
    });

    let ex2 = Example.run(sources, {
      header: "Visible",
      description: "A message can be set to visible to force itself to be shown.",
      VNode$: xs.of(UI.Message.render({forceVisible: true}, "You can always see me.")),
      code: `UI.Message.render({forceVisible: true}, "You can always see me.")`
    });


    return xs.combine(ex1.DOM, ex2.DOM);
  }
}
