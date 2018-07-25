let fig = document.getElementsByTagName("figure")[0].innerHTML;

document.getElementById("search-btn").onclick = function(){
    event.preventDefault();
    
    let num = document.getElementById("search-input").value;
    document.getElementById("photos").innerHTML = "";
    for (let i = 0; i < num; i++) {
        document.getElementById("photos").innerHTML += `<figure> ${fig} </figure>`;
    }
}