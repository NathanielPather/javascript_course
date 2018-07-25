import $ from "jquery";
import styles from "./css/styles.css";
import img1 from "./assets/DSC01049.JPG";
import {display} from "./view.js";
import * as view from "./view.js";
import * as flicker from "./flicker.js";
import * as facebook from "./facebook.js";

$(document).ready(function() {
    $('#loaders').html(`<img src=${img1}>`);
    
    facebook.bootstrap();
    
    $("#button").click(function() {
        facebook.logout();
    });
    
    $("#search-btn").click(function() {
       facebook.getFB(); 
    });
/*
// The getInteresting function is passed the flickrReady function
    flicker.getInteresting(flickrReady);
    $("#model-close").click(function() {
        $('#model-container').css('display', 'none');
        $('#model-content').attr('src', '');
    });
*/
});

/*
// flickerReady is passed the photos data.
// data is photos, just renamed
// the paramater name can be anything
// the paramter just holds the data, it doesn't refer to the actual variable.
function flickrReady(data, searchStr) {
    display(data);
    registerModal();
    $("#search-btn").unbind('click').click(function(){
        searchClick();
    });
}

function registerModal() {
        $('figure').each(function(index) {
        // This = the current figure
        // console.log(this);
       $(this).click(function() {
           $('#model-container').css('display', 'block');
           $('#model-content').attr('src', $(this).attr('data-full'));
           $('#model-caption').html($(this).attr('data-title'));
       });
    });
}

function searchClick() {
    view.navAppend(flicker.searchRegister());
}
*/