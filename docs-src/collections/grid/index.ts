import * as UI from "../../ui";
import xs, { Stream } from "xstream";
import { div, VNode } from "@cycle/dom";
import { Introduction} from "./introduction";
import { Columns } from "./columns";
import { Rows } from "./rows";
import { VaryingGrids} from "./varyingGrids";
import { ResponsiveGrids } from "./responsiveGrids";
// import { FieldsVariations} from "./fieldsvariations";

export namespace Grid {
  export function run(sources) {
    let intro = Introduction.run(sources);
    let columns = Columns.run(sources);
    let rows = Rows.run(sources);
    let varyingGrids = VaryingGrids.run(sources);
    let responsiveGrids = ResponsiveGrids.run(sources);

    const vTree$ = xs.combine(intro, columns, rows, varyingGrids, responsiveGrids).map(
      ([intro, columns, rows, varyingGrids, responsiveGrids]) =>
        div({ props: { className: "article" } }, [
          UI.Segment.render({ vertical: true }, [
            UI.Container.render([
              UI.Header.render({ size: UI.Size.Huge }, "Grid", {
                subtext: "A grid is used to harmonize negative space in a layout"
              }),
            ]),
          ]),
          UI.Container.render([
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Introduction")]
              .concat(intro)
            ),
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Columns")]
              .concat(columns)
            ),
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Rows")]
              .concat(rows)
            ),
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Varying Grids")]
              .concat(varyingGrids)
            ),
            UI.Segment.render({ basic: true }, [
              UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Responsive Grids")]
              .concat(responsiveGrids)
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
