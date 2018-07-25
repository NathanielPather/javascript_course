let API_KEY = "api_key=dc140afe3fd3a251c2fdf9dcd835be5c";
let interestingStr = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=20&format=json&nojsoncallback=1&" + API_KEY;

$(document).ready(function() {
    searchRegister();
    $.get(interestingStr, function(data){
        fetchPhoto(data);
    });
});

function fetchPhoto(data) {
    let index = 0;
    let photoid = data.photos.photo[index].id;
    console.log(photoid);
    let title = data.photos.photo[index].title;
    console.log(title);
    getSizes(photoid, title);
    
}

function getSizes(photoid, title) {
    let getSizesStr = "";
    getSizesStr = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&"+API_KEY+ "&photo_id="+photoid;
                       
    $.get(getSizesStr, function(data){
        console.log(data);
        let thumb = data.sizes.size[5].source;
        let photos = [{file: thumb, title: title}];
        display(photos);
    });
}

function searchRegister() {
    $("#search-btn").click(function(){
        let searchStr = "";
        let search = "";
        searchStr = $("#search-input").val();
        search = "https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=20&format=json&nojsoncallback=1&extras=url_o&"+API_KEY+ "&text="+searchStr;
        console.log("search is " + search);
        
        $.get(search, function(data){
            console.log(data);
    
            
            let title = "";
            let photoSource = "";
            title = data.photos.photo[0].title;
            photoSource = data.photos.photo[0].url_o;
            console.log("photo source is " + photoSource);
            console.log("title is " + title);
    
            let photos = [{file: photoSource, title: title}];
            console.log("photos is " + photos);
            console.log("I made it here");
            
            display(photos);
        });
        searchStr = "";
        search = "";
    });
}
function display(photos) {
    let htmlStr = "";
    for (let i = 0; i < photos.length; i++) {
        htmlStr += `<figure><a href="${photos[i].file}"><img src="${photos[i].file}" alt="data.photos[i].file" width="200" height="200"></a><figurecaption>${photos[i].title}</figurecaption></figure>`;
    }
    $("#photos").html(htmlStr);
}