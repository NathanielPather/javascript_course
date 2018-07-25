import $ from "jquery";
import styles from "./css/styles.css";
import img1 from "./assets/DSC01049.JPG";
import {display} from "./view.js";
import * as view from "./view.js";
import * as flicker from "./flicker.js";
import * as facebook from "./facebook.js";

$(document).ready(function() {
    $('#loaders').html(`<img src=${img1}>`);
    
    facebook.bootstrap(facebookReady);

    flicker.getInteresting(flickrReady);
    $("#model-close").click(function() {
        $('#model-container').css('display', 'none');
        $('#model-content').attr('src', '');
    });
});

function facebookReady(response) {
    if (response.status === 'connected') {
        view.createLogout();
        
    }
    else if (response.status === 'unknown') {
        view.createLogin();
    }
    
    $("#button").click(function() {
         if (response.status === 'connected') {
             console.log("executed logout");
             facebook.logout();
             view.createLogin();
             console.log(response);
             console.log("connected");
         } else {
         
        // if (response.status === 'undefined') {
             console.log("executed login");
             facebook.login();
             view.createLogout();
             console.log(response);
         }
    });
}

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
function loginClick() {
    console.log("login called");
    $("#button").click(function() {
        view.createLogout(facebook.login());
    });
}

function logoutClick() {
    console.log("logout called");
    $("#button").click(function() {
        view.createLogin(facebook.logout());
    });
}

function searchClick() {
    view.navAppend(flicker.searchRegister());
}