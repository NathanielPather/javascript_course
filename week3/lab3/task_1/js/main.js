$(document).ready(function() {
    $("#photos").hide(); 
    $.get("./data/photodata.json", function(data){
        console.log(data);
        display(data);
        $("#photos").show(1500);
        search_Register();
    });
});

function search_Register() {
    let fig = $("figure").html();
    $("#search-btn").click(function(){
        let htmlStr = "";
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
}

function display(data) {
    let num = $("#search-input").val();
    if(!isNaN(num)) {
        let htmlStr = "";
        for (let i = 0; i < data.photos.length; i++) {
            htmlStr += `<figure><a href="${data.photos[i].file}"><img src="${data.photos[i].file}" alt="data.photos[i].file" width="200" height="200"></a><figurecaption>${data.photos[i].title}</figurecaption></figure>`;
        }
        $("#photos").html(htmlStr);
    }
}