import $ from "jquery";

export function display(photos) {
    let htmlStr = "";
    for (let i = 0; i < photos.length; i++) {
        htmlStr += `<figure data-full="${photos[i].full}" data-title="${photos[i].title}"><img src="${photos[i].file}" alt="data.photos[i].file" width="200" height="200"><figurecaption>${photos[i].title}</figurecaption></figure>`;
    }
    $("#photos").html(htmlStr);
}