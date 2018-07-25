import $ from "jquery";
const APP_ID = "2126619820890771";

/* Include facebook SDK */
export function bootstrap() {
    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function () {
        FB.init({
            appId: APP_ID,
            version: 'v3.0',
            xfbml: 1
        });
        $('#loginbutton,#feedbutton').removeAttr('disabled');
        FB.getLoginStatus(updateStatusCallback);
    });
}

/* get login status */
export function updateStatusCallback (response) {
    if (response.status === 'connected') {
        console.log('Logged in.');
    }
    else {
        console.log('Not logged in.');
    }
}

/* Facebook login */
export function login() {
    FB.login(function(response) {
        FB.api('/me', function(response) {
            console.log(response);
        });
    }, {scope: 'user_posts, user_likes, user_age_range, user_friends, user_photos'});
}

/* Facebook logout */
export function logout() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            FB.logout(function(response){
            console.log("Logged out");
            });
        }
        else {
            login();
            console.log("Logged in");
        }
    });
}

/* Facebook share */
export function share() {
    FB.ui({
        method: 'share',
        href: 'https://developers.facebook.com/docs/',
        }, function(response) {
    });
}