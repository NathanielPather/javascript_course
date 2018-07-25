/* API key used for flicker */
/* An API key identifies the calling program, its developer, or its user to the Web site */
let API_KEY = "api_key=dc140afe3fd3a251c2fdf9dcd835be5c";
/* String searched based on category clicked by user */
let SEARCHSTRING = "";
/* Full API search call */
let SEARCHAPICALL = "";
/* Full API Comment call */
let COMMENTSAPICALL = "";
/* Array containing photo objects key value pairs id and title */
let PHOTOS = []
/* Array containing comment objects key value pairs content and realname */
let COMMENTS = []
/* Number of photos requested based on the length of the array containing the photo data */
let NREQUEST;
/* Counter for photos received */
let NRECEIVE;
/* Added to search string to ensure only sport related searches are displayed */
let SPORT = "Sport";
/* Array containing recent photos clicked */
let RECENTPHOTOS = [];

/* Occurs when Document Object Model is loaded */
$(document).ready(function() {
    
/* Search functions */
    searchTennis();
    searchFootball();
    searchSwimming();

/* Modal close function */
    $("#modal-close").click(function() {
/* Recent photos function */
        recentPhotos();

/* Modal container display is no longer shown */
        $('#modal-container').css('display', 'none');
/* Modal content is no longer shown */
        $('#modal-content').attr('src', '');
    });
});

/* Event handlers for possible searches */
/* Search string is dependent on the button clicked */
/* Tennis search function */
function searchTennis() {
    $("#tennis-btn").click(function(){
        SEARCHSTRING = "Tennis";
        searchRegister(SEARCHSTRING);
    });
}

/* Football search function */
function searchFootball() {
    $("#football-btn").click(function(){
        SEARCHSTRING = "Football";
        searchRegister(SEARCHSTRING);
    });
}

/* Swimming search function */
function searchSwimming() {
    $("#swimming-btn").click(function(){
        SEARCHSTRING = "Swimming";
        searchRegister(SEARCHSTRING);
    });
}

/* Performs the search */
function searchRegister(SEARCHSTRING) {
/* Flicker's search API call */
/* The word sport is added to increase sport related photos */
/* The search API call is specified to receive 10 photos */
    SEARCHAPICALL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=10&format=json&nojsoncallback=1&extras=url_o&" + API_KEY + "&text=" + SEARCHSTRING + " " + SPORT;
    
/* Loads data from server using HTTP GET request */
/* Fetch photos stored in data and display them */
    $.get(SEARCHAPICALL, function(data) {
/* Fetch the photo data */
        fetchPhoto(data);
/* Display the photos */
        display(PHOTOS);
    });
}

/* Function that fetches photo data based on search API call */
function fetchPhoto(data) {
/* Clears the photo array */
    PHOTOS = [];
/* Number of requested photos is determined by the lengh of the photos array in the data received by the search API call */
/* The search API call is specified to receive 10 photos */
    NREQUEST = data.photos.photo.length;
/* Resets the number received counter */
    NRECEIVE = 0;
/* While there are still photos */
    for (let i = 0; i < data.photos.photo.length; i++) {
/* Store the photo's ID and title inside an object*/
        let photoObj = {id: data.photos.photo[i].id, title: data.photos.photo[i].title};
/* Add the object to an array */
        PHOTOS.push(photoObj);
/* Get the sizes of the specfied photo */
        getSizes(photoObj);
    }
}

/* Get the photo sizes for the stored photo IDs */
function getSizes(photoObj) {
/* Flicker's sizes API call */
    let SIZESAPICALL = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&" + API_KEY+ "&photo_id=" + photoObj.id;
    
    $.get(SIZESAPICALL, function(data) {
/* Increment photos received counter when a size is retrieved */
        NRECEIVE++;
        
/* Look for small photos */
/* Counter for sizes array */
        let sizeCounter = 0;
/* While the label at the specified counter is not small and the counter is less than the length of the array */
/* Breaks if small is found or counter exceeds array length */
        while ((data.sizes.size[sizeCounter].label != "Small") && (sizeCounter < data.sizes.size.length-1)) {
            sizeCounter++;
        }
        
/* If the label is small */
        if (data.sizes.size[sizeCounter].label == "Small") {
/* Store this photos source address at this size */
            photoObj.file = data.sizes.size[sizeCounter].source;
        }
        
        else {
/* If the label small is not found */
/* Store this photos source address at the smallest size */
/* Assumption: smallest index is smallest size photo */
            photoObj.file = data.sizes.size[0].source;
        }

/* Look for large photos */
        sizeCounter = 0;
/* While the label at the specified counter is not large and the counter is less than the length of the array */
/* Breaks if large is found or counter exceeds array length */
        while ((data.sizes.size[sizeCounter].label != "Large") && (sizeCounter < data.sizes.size.length-1)) {
            sizeCounter++;
        }
/* If the label is large */
        if (data.sizes.size[sizeCounter].label == "Large") {
/* Store this photos source address at this size */
            photoObj.full = data.sizes.size[sizeCounter].source;
        } 
        
        else {
/* If the label small is not found */
/* Store this photos source address at the largest size */
/* Assumption: largest index is largest size photo */
            photoObj.full = data.sizes.size[data.sizes.size.length-1].source;
        }
        
        photoObj.recent = data.sizes.size[0].source;

/* If the photos received counter is equal the number of photos requested */
        if (NRECEIVE == NREQUEST) {
/* Display the photos */
            display(PHOTOS);
        }
    });
}

/* Display photos stored in photos array */
function display(PHOTOS) {
    
/* Clear the html string */
    let htmlString = "";
/* While there are still photos */
    for (let i = 0; i < PHOTOS.length; i++) {
/* Add html implementation of photo data to html string */
        htmlString += `<figure data-full="${PHOTOS[i].full}" data-title="${PHOTOS[i].title}"><img src="${PHOTOS[i].file}" alt="data.photos[i].file" width="200" height="200"><figurecaption>${PHOTOS[i].title}</figurecaption></figure>`;
    }
    
/* Implement the html string into column 2 */
    $("#col-2").html(htmlString);

/* For each figure element specified by the index */
    $('figure').each(function(index) {
/* This instance of figure */
        $(this).click(function() {
            
/* Upshift adds elements to the beginning of an array */
/* Add html implementation of photo data to html string */
                RECENTPHOTOS.unshift(
                    `<figure style="height: 100px; width: 100px; margin: 5px; margin-right: auto; margin-left: auto;" data-full="${PHOTOS[index].full}" data-title="${PHOTOS[index].title}"><img src="${PHOTOS[index].recent}" alt="data.photos[i].file" width="100" height="100"><figurecaption>${PHOTOS[index].title}</figurecaption></figure>`
                );
                
/* Remove photos starting at index 5 and remove 5 photos */
/* Indicies 0 - 4 will contain the most recent photos */
                RECENTPHOTOS.splice(5, 5);
                
/* Display the modal container */
            $('#modal-container').css('display', 'block');
/* The src attribute is set to the figure instance's source address specified in the data-full attribute within the html string */
            $('#modal-content').attr('src', $(this).attr('data-full'));
/* The modal caption is set to the figure instances title specified in the data-title attribute within the html string */
            $('#modal-caption').html($(this).attr('data-title'));
            
/* ID for dispayed photo */
            let photoID = PHOTOS[index].id;
/* Comments function */
            comments(photoID);
       });
    });
}

/* Add the recent photos html implementation to column 3 */
function recentPhotos() {
    $("#col-3").html(RECENTPHOTOS);
    
    $('figure').each(function(index) {
        $(this).click(function() {
            $('#modal-container').css('display', 'block');
            $('#modal-content').attr('src', $(this).attr('data-full'));
            $('#modal-caption').html($(this).attr('data-title'));
       });
    });
}

/* Adds comments to the modal-comment section */
function comments(photoID) {
    COMMENTSAPICALL = "https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&" + API_KEY + "&photo_id=" + photoID + "&format=json&nojsoncallback=1";
    
    $.get(COMMENTSAPICALL, function(data) {
/* Clears the comments array */
        COMMENTS = [];
        
/* If comments exist */
        if (typeof data.comments.comment != 'undefined') {
/* While there are still comments */
            for (let i = 0; i < data.comments.comment.length; i++) {
/* Store the comment's content and authors name inside an object*/
                let commentObj = {content: data.comments.comment[i]._content, realname: data.comments.comment[i].realname};
/* Add the object to an array */
                COMMENTS.push(commentObj);
            }
        }
        
/* Clear the html string */
        let htmlString = "";
/* If comments exist */
        if (COMMENTS.length > 0) {
/* While there are still comments */
            for (let i = 0; i < COMMENTS.length; i++) {
/* Add html implementation of comment data to html string */
                htmlString += `${COMMENTS[i].realname}: ${COMMENTS[i].content}&#13;&#13;`;
            }
        }
        
/* If comments don't exist */
        else {
/* Add html implementation of no comments to html string */
            htmlString += `No comments yet!`;
        }
/* Implement html implementation into modal-comments section */     
        $('#modal-comments').html("<textarea rows='15' cols='100'>" + htmlString + "</textarea>");
    });
}