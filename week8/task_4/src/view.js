import $ from "jquery";
import thumbs from "./templates/thumbnails.handlebars";

export function display(photosArr) {
    let data = {photos: photosArr};
    $("#photos").html(thumbs(data));
}

export function navAppend(searchStr) {
    let data = {categories: searchStr};
    $("#list").append(thumbs(data));
}