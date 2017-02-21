// tslint:disable-next-line:no-unused-variable
import { VNode } from "@cycle/dom";
import { Stream } from "xstream";
import { Index } from "./index";
import { Breadcrumb, Form, Grid, Menu} from "./collections";


let prefix = "/cycle-semantic-ui";
let routes = {
  "/": Index.run,
};
routes[prefix + "/collections/breadcrumb"] = Breadcrumb.run;
routes[prefix + "/collections/form"] = Form.run;
routes[prefix + "/collections/grid"] = Grid.run;
routes[prefix + "/collections/menu"] = Menu.run;
export default routes;
