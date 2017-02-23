import xs, { MemoryStream, Stream } from "xstream";
import dropRepeats from "xstream/extra/dropRepeats";
import { div, VNode, DOMSource } from "@cycle/dom";
import {Menu, Attachment, Segment} from "../../index";


export namespace Tabs {
  export interface TabsSources {
    DOM: DOMSource;
    labels: string[];
    content: Stream<VNode>[];
    active?: string;
    menuProps$?: Stream<Partial<Menu.Props>>;
    segmentProps$?: Stream<Partial<Segment.Props>>;
  }
  export function run(sources: TabsSources) {
    let menuProps$ = sources.menuProps$ ? sources.menuProps$ : xs.of({ tabular: true, attachment: Attachment.Top });
    let segmentProps$ = sources.segmentProps$ ? sources.segmentProps$ : xs.of({attachment: Attachment.Bottom});
    let menuValue$ = xs.create() as Stream<string>;
    let activeTab$ = menuValue$.startWith(sources.active ? sources.active: sources.labels[0]).compose(dropRepeats()).remember();
    let menu = Menu.run({
      DOM: sources.DOM,
      props$: menuProps$,
      content$: activeTab$.map(activeTab =>
        sources.labels.map(label =>
          ({
            link: true,
            active: activeTab === label,
            main: label
          })
        )
      )
    });
    menuValue$.imitate(menu.value$.map(x => (x as any).body));
    let tabContent$ = activeTab$.map(
      tab => xs.merge(xs.of(div()), sources.content[sources.labels.indexOf(tab)])
    ).flatten();
    
    const vTree$ = xs.combine(menu.DOM, tabContent$, segmentProps$).map(
      ([menu, tabcontent, segmentProps]) => div([
        menu,
        Segment.render(segmentProps, [tabcontent])
      ])
    );
    return {
      DOM: vTree$,
      active$: activeTab$
    };
  }
}
