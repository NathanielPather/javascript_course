import $ from "jquery";
const APP_ID = "2126619820890771";

export function bootstrap(ready) {
    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function() {
        FB.init({
            appId: APP_ID,
            version: 'v3.0' // or v2.1, v2.2, v2.3, ...
        });     
        FB.getLoginStatus(updateStatusCallback);
    });
}

export function updateStatusCallback (response) {
    if (response.status === 'connected') {
        console.log('Logged in.');
    }
    else {
        console.log('Not logged in.');
    }
}

export function login() {
    FB.login(function(response) {
        FB.api('/me', function(response) {
            console.log(response);
        });
    }, {scope: 'user_posts, user_likes, user_age_range, user_friends, user_photos'});
}

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

export function getFB() {
    console.log("getFB");
    FB.api('/me?fields=id,name,posts,email,age_range,friends,picture', function(response){
        console.log(response);
        if (response.posts == undefined) {
            console.log("No posts");
        }
        else {
            console.log("There are posts");
            var htmlStr = "";
            for(var i = 0; i < response.posts.data.length; i++) {
                htmlStr += `${response.posts.data[i].message}<br>`;
            }
            htmlStr += `age is: ${response.age_range.min}<br>`;
            htmlStr += `number of friends: ${response.friends.summary.total_count}<br>`;
            $('#photos').html(`<p>` + htmlStr + `</p>`);
        }
    });
}