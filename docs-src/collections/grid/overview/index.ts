import * as UI from "../../../ui";
import xs, { Stream } from "xstream";
import { VNode } from "@cycle/dom";
import { Introduction} from "./introduction";
import { Columns } from "./columns";
import { Rows } from "./rows";
import { VaryingGrids} from "./varyingGrids";
import { ResponsiveGrids } from "./responsiveGrids";

export namespace Overview {
  export function run(sources): Stream<VNode> {
    let intro = Introduction.run(sources);
    let columns = Columns.run(sources);
    let rows = Rows.run(sources);
    let varyingGrids = VaryingGrids.run(sources);
    let responsiveGrids = ResponsiveGrids.run(sources);

    let vTree$ = xs.combine(intro, columns, rows, varyingGrids, responsiveGrids).map(
      ([intro, columns, rows, varyingGrids, responsiveGrids]) => UI.Container.render([
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
      ])
    );
    return vTree$;
  }
}
