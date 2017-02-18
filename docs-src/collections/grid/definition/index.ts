import * as UI from "../../../ui";
import xs, { Stream } from "xstream";
import { VNode } from "@cycle/dom";
import { Types } from "./types";
import { Content } from "./content";
import { Variations} from "./variations";
import { ResponsiveVariations} from "./responsiveVariations";

export namespace Definition {
  export function run(sources): Stream<VNode> {
    let types = Types.run(sources);
    let content = Content.run(sources);
    let variations = Variations.run(sources);
    let responsive = ResponsiveVariations.run(sources);

    let vTree$ = xs.combine(types, content, variations, responsive).map(
      ([types, content, variations, responsive]) => UI.Container.render([
        UI.Segment.render({ basic: true }, [
          UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Types")]
          .concat(types)
        ),
        UI.Segment.render({ basic: true }, [
          UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Content")]
          .concat(content)
        ),
        UI.Segment.render({ basic: true }, [
          UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Variations")]
          .concat(variations)
        ),
        UI.Segment.render({ basic: true }, [
          UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Responsive Variants")]
          .concat(responsive)
        ),
      ])
    );
    return vTree$;
  }
}
