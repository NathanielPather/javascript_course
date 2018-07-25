import $ from "jquery";
import hello from "./templates/hello.handlebars";

/* Display data with handlebars */
export function display(matchPlayers) {
    let data = {categories: matchPlayers};
    $("#col-2").append(hello(data));
}
