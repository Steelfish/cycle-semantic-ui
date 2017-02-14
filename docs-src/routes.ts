// tslint:disable-next-line:no-unused-variable
import { VNode } from "@cycle/dom";
import { Stream } from "xstream";
import { Index } from "./index";
import { Breadcrumb, Form} from "./collections";


let prefix = "/cycle-semantic-ui";
let routes = {
  "/": Index.run,
};
routes[prefix + "/collections/breadcrumb"] = Breadcrumb.run;
routes[prefix + "/collections/form"] = Form.run;
export default routes;
