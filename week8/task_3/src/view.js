import $ from "jquery";
import thumbs from "./templates/thumbnails.handlebars";

export function display(photosArr) {
    let data = {photos: photosArr};
    $("#photos").html(thumbs(data));
}