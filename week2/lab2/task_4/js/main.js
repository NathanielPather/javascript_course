/*
$(document).ready(function() {
    let fig = $("figure").html();
    let htmlStr = "";
    
    random(fig, htmlStr);
    
    $("#search-btn").click(function(){
        let num = $("#search-input").val();
        if(!isNaN(num)) {
            for (let i = 0; i < num; i++) {
                htmlStr += `<figure> ${fig} </figure>`;
            }
            $("#photos").html(htmlStr);
            htmlStr = "";
        }
        else {
            htmlStr += `<li><a href=""> ${num} </a></li>`;
            $("#list").append(htmlStr);
        }
        htmlStr = "";
    });
});

function random(fig, htmlStr) {
    var result = Math.floor(16 * Math.random())
    
    $("#photos").html(htmlStr);
    for (let i = 0; i < result; i++) {
        htmlStr += `<figure> ${fig} </figure>`;
    }
    $("#photos").html(htmlStr);
    htmlStr = "";
    console.log("result is: " + result);
}
*/

/*
function knockHandler(){
    $(“#knockDiv”).html(“Did you knock?”);
}

$(“#knockBtn”).click(knockHandler);

$(document).on('dblclick', '#an_tnam tr', function(event) {
    ADS('hello');
});

$("#search-btn").click(fig, htmlStr, input);
*/


$(document).ready(function() {
    let fig = $("figure").html();
    let htmlStr = "";
    
    console.log("fig before input is: " + fig);
    /*
    random(fig, htmlStr);
    */
    /*
    $("#search-btn").click(input(fig, htmlStr));
    */
    $("#search-btn").click(function() {
        input(fig, htmlStr);
    });
});

function random(fig, htmlStr) {
    var result = Math.floor(16 * Math.random())
    
    $("#photos").html(htmlStr);
    for (let i = 0; i < result; i++) {
        htmlStr += `<figure> ${fig} </figure>`;
    }
    $("#photos").html(htmlStr);
    htmlStr = "";
    console.log("result is: " + result);
}

function input(fig, htmlStr) {
    console.log("fig after input is: " + fig);
    let num = $("#search-input").val();
    console.log("num is: " + num)
    if(!isNaN(num)) {
        for (let i = 0; i < num; i++) {
            htmlStr += `<figure> ${fig} </figure>`;
        }
        $("#photos").html(htmlStr);
        htmlStr = "";
    }
    else {
        htmlStr += `<li><a href=""> ${num} </a></li>`;
        $("#list").append(htmlStr);
    }
    htmlStr = "";
}
/*
let fig = document.getElementsByTagName("figure")[0].innerHTML;

document.getElementById("search-btn").onclick = function(){
    event.preventDefault();
    
    let num = document.getElementById("search-input").value;
    // IMPLMENET IS NAN FOR JQUERY
    if (!isNaN(num)){
        document.getElementById("photos").innerHTML = "";
        for (let i = 0; i < num; i++) {
            document.getElementById("photos").innerHTML += `<figure> ${fig} </figure>`;
        }
    }
    else {
        document.getElementById("list").innerHTML += `<li><a href=""> ${num} </a></li>`;
    }
}

function random () {
    event.preventDefault();
    
    var result = Math.floor(16 * Math.random());
    document.getElementById("photos").innerHTML = "";
    for (let i = 0; i < result; i++) {
        document.getElementById("photos").innerHTML += `<figure> ${fig} </figure>`;
    }
}

window.onload = random;
*/