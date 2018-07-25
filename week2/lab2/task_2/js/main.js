let fig = document.getElementsByTagName("figure")[0].innerHTML;

document.getElementById("search-btn").onclick = function(){
    event.preventDefault();
    
    let num = document.getElementById("search-input").value;
    document.getElementById("photos").innerHTML = "";
    for (let i = 0; i < num; i++) {
        document.getElementById("photos").innerHTML += `<figure> ${fig} </figure>`;
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