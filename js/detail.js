const key = "b979415";
const details = document.querySelector(".detailFilm");
const basket = document.querySelector(".basket");
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
console.log(params.id)


fetch(`http://www.omdbapi.com/?apikey=${key}&i=${params.id}`)
    .then(response => response.json())
    .then(data => details.innerHTML = `
  <div class = "container d-flex justify-content-center">
  <div class=" col-12 text-center">
  <a href=${data.Poster} rel="lightbox [group]">  <img src=${data.Poster} class="detailPoster"/></a>
  <p class="mb-0 " > <span class="movieText">İsmi:</span> ${data.Title}</p>
  <p class="mb-0 " > <span class="movieText"> Yılı:</span> ${data.Year}</p>
  <p class="mb-0 " > <span class="movieText"> Tipi:</span> ${data.Type} </p>
   <a href=https://www.imdb.com/title/${data.imdbID} target="_blank" 
   style="text-decoration: none;" > <span class="movieText"> IMDB:</span> https://www.imdb.com/title/${data.imdbID} </a> <br>
   <button class="btn btn-primary"  onclick="basketOnClick()">Sepete Ekle </button>
   </div>
   </div>`
    );

function basketOnClick() {
    const basketTextNode = document.querySelector(".basketTextNode");
    basketTextNode.innerHTML = `<div class="text-success text-uppercase font-weight-bold"> Film Sepete eklendi </div>`;
    fetch(`http://www.omdbapi.com/?apikey=${key}&i=${params.id}`)
        .then(response => response.json())
        .then(data => basket.innerHTML = `
       <div class="text-start ">
    <img src=${data.Poster} class="detailBasketPoster"/> <div>
    <div class ="basket-body">
    <p class="mb-0 "> <span class="movieText"> İsmi </span>: ${data.Title}</p>
    <p class="mb-0 "> <span class="movieText"> Yılı:</span> ${data.Year}</p> 
    <p class="mb-0 "> <span class="movieText"> Tipi:</span> ${data.Type} </p>
    </div>
    </div>
    </div>`
     );
    }
function onPostClick() {
    const basketWrapper = document.querySelector(".basketWrapper");
    const basket = document.querySelector(".basket");
    const basketTextNode = document.querySelector(".basketTextNode");
    basket.children.length == 0 ? setTimeout(() => {
        basketTextNode.innerHTML = `<div class="text-danger text-uppercase font-weight-bold"> Sepette Film Yok </div>`
    }, 1) : setTimeout(() => {
        basketWrapper.style.display = "block", basketTextNode.innerHTML = `<div class=""> Sepetime Gitmek için Tıkla </div>`
    }, 1000),
       console.log("basket1", basket.children)
}