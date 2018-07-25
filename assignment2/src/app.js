import $ from "jquery";
import styles from "./css/styles.css";
import hello from "./templates/hello.handlebars";
import * as facebook from "./facebook.js";
import * as riot from "./riot.js";
import {display} from "./view.js";

/* Call when document is loaded */
$(document).ready(function() {
    facebook.bootstrap();

/* When search button is clicked */
   $("#search-btn").click(function() {
       riot.searchPlayer(riotReady);
    });
 
/* When share button is clicked */
   $("#share-btn").click(function() {
       facebook.share(); 
    });
});

/* Callback function when riot data is ready */
function riotReady(data) {
    display(data);
}