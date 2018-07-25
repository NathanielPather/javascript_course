import $ from "jquery";
const APP_ID = "2126619820890771";
let ready_cb;

export function bootstrap(ready) {
    ready_cb = ready;
    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function() {
        FB.init({
            appId: APP_ID,
            version: 'v2.7' // or v2.1, v2.2, v2.3, ...
        });     
        //$('#loginbutton,#feedbutton').removeAttr('disabled');
        FB.getLoginStatus(updateStatusCallback);
        
    });
}

export function updateStatusCallback (response) {
    if (response.status === 'connected') {
        console.log('Logged in.');
    }
    else if (response.status === 'unknown') {
        console.log('Not logged in.');
    }
    ready_cb(response);
}

export function login() {
    FB.login(function(response) {
        FB.api('/me', function(response) {
        });
    }, {scope: 'user_friends, user_birthday'});
}

export function logout() {
    FB.logout(function(response){
        console.log("Logged out");
    });
}