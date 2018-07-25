import $ from "jquery";
import styles from "./css/styles.css";
import img1 from "./assets/DSC01049.JPG";

let API_KEY = "api_key=dc140afe3fd3a251c2fdf9dcd835be5c";
let interestingStr = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=10&format=json&nojsoncallback=1&" + API_KEY;
let photos = [];
let nrequest;
let nreceive;

$(document).ready(function() {
    $('#loaders').html(`<img src=${img1}>`)
    searchRegister();
    $.get(interestingStr, function(data){
        fetchPhoto(data);
    })
    $("#model-close").click(function() {
        $('#model-container').css('display', 'none');
        $('#model-content').attr('src', '');
    });
});

function fetchPhoto(data) {
    // can use this instead but using splice
    //photos = [];
    nrequest = data.photos.photo.length;
    nreceive = 0;
    for (let i = 0; i < data.photos.photo.length; i++) {
        let photoObj = {id: data.photos.photo[i].id, title: data.photos.photo[i].title};
        photos.push(photoObj);
        getSizes(photoObj);
    }
}

function getSizes(photoObj) {
    let getSizesStr = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&"+API_KEY+ "&photo_id="+photoObj.id;
                       
    $.get(getSizesStr, function(data){
        nreceive++;
        photoObj.file = data.sizes.size[5].source;
        photoObj.full = data.sizes.size[data.sizes.size.length-1].source;
        if (nreceive == nrequest) {
            display(photos);
        }
    });
}

function display(photos) {
    let htmlStr = "";
    for (let i = 0; i < photos.length; i++) {
        htmlStr += `<figure data-full="${photos[i].full}" data-title="${photos[i].title}"><img src="${photos[i].file}" alt="data.photos[i].file" width="200" height="200"><figurecaption>${photos[i].title}</figurecaption></figure>`;
    }
    $("#photos").html(htmlStr);
    
    $('figure').each(function(index) {
        // This = the current figure
        // console.log(this);
       $(this).click(function() {
           $('#model-container').css('display', 'block');
           $('#model-content').attr('src', $(this).attr('data-full'));
           $('#model-caption').html($(this).attr('data-title'))
       });
    });
}

function searchRegister() {
    $("#search-btn").click(function(){
        let searchStr = "";
        let search = "";
        searchStr = $("#search-input").val();
        console.log("search string is: " + searchStr);
        search = "https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=10&format=json&nojsoncallback=1&extras=url_o&"+API_KEY+ "&text="+searchStr;
        
        $.get(search, function(data){
            fetchPhoto(data);
            display(photos);
        });
        // can also clear array at top instead of splice
        photos.splice(0, 20);
        searchStr = "";
        search = "";
    });
}