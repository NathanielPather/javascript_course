import $ from "jquery";
import styles from "./css/styles.css";
import img1 from "./assets/DSC01049.JPG";

$(document).ready(function() {
    $('#intro').html("Hello Webpack");
    console.log(img1);
    $('#photo').html(`<img src=${img1}>`);
});