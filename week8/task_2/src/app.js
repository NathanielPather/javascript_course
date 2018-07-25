import $ from "jquery";
import hello from "./templates/hello.handlebars";
import thumbnails from "./templates/photos.handlebars";
import photo1 from './assets/DSC01049.JPG';

let data = {photos:
    [
        {src: photo1, title: "whatever"},
        {src: photo1, title: "2nd one"},
        {src: photo1, title: "3rd copy"}
    ]
};

let name = {loggedin: true, first: "Bob", last: "Hawk" };
$(document).ready(function() {
    let temp = hello(name);
    $("#hello").html(temp);
    
    $("#photo").html(thumbnails(data));
});
