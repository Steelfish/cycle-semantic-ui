// tslint:disable-next-line:no-unused-variable
import { VNode } from "@cycle/dom";
import { Stream } from "xstream";
import { Index } from "./index";
import { Breadcrumb, Form, Grid, Menu, Message} from "./collections";


let prefix = "/cycle-semantic-ui";
let routes = {
  "/": Index.run,
};
routes[prefix + "/"] = Index.run;
routes[prefix + "/collections/breadcrumb"] = Breadcrumb.run;
routes[prefix + "/collections/form"] = Form.run;
routes[prefix + "/collections/grid"] = Grid.run;
routes[prefix + "/collections/menu"] = Menu.run;
routes[prefix + "/collections/message"] = Message.run;
export default routes;
