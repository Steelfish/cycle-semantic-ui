

import { DOMContent, ContentObj, ComponentSources, ValueComponentSinks} from "../../types";
import { getScope } from "../../utils";
import { Color, Size } from "../../enums";
import { Menu } from "../../collections/menu";
import searchDropdown from "./searchdropdown";
import dropdown from "./dropdown";



export namespace Dropdown {
  export interface Props {
    rightAligned: boolean;
    active: boolean;
    initial: any;
    selection: boolean;
    simple: boolean;
    inline: boolean;
    floating: boolean;
    loading: boolean;
    disabled: boolean;
    scrolling: boolean;
    compact: boolean;
    pointing: boolean;
    default: DOMContent;
    size: Size | string;
    color: Color | string;
  }
  export type Content<V> = Array<Partial<DropdownItem<V>>>;
  export interface DropdownItem<V> extends Menu.MenuItem {
    value: V;
  }
  export interface DropdownSources<V> extends ComponentSources<Props, Content<V>, ContentObj<Content<V>>> {
    args?: {
      search?: boolean;
      static?: boolean;
    };
  }

  export function run<V>(sources: DropdownSources<V>, scope: string = getScope()): ValueComponentSinks<V> {
    if (sources.args && sources.args.search) {
      return searchDropdown<V>(sources, scope);
    } else {
      return dropdown<V>(sources, scope);
    }
  }
}
