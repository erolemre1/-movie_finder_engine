const API_KEY = "b979415";
const input = document.querySelector("#input");
const button = document.querySelector(".button");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const home = document.querySelector(".display");


let value = "";
let pagenum = 1;

input.addEventListener("input", (e) => {
    //TODO: enter a basılınca arama
    e.preventDefault();
    value = input.value;
});

button.addEventListener("click", () => {
    pagenum = 1;
    getmovie(value, pagenum);
});

async function getmovie(value, pagenum) {

    if (value === "") return;

    const data = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${value}&page=${pagenum}`);  
  
    document.querySelector(".display").innerHTML = "";
    const result = await data.json();
 console.log(result.Response)
if(result.Response === "False") {
       home.innerHTML=`<h2 class="text-danger text-center mt-5"> Bu isim ile ilgili bir film yok! </h2 class="text-danger">`
}
    result.Search.forEach((item) => {
        let moviediv = document.createElement("div");
        moviediv.classList.add("movie");
        let Poster = document.createElement("a");
        Poster.classList.add("Poster");
        Poster.href = "./detail.html?id=" + `${item.imdbID}`;

        /*Total Results*/

        let tresult = document.createElement("p");
        tresult.classList.add("tresult");
        tresult.innerHTML = `Total Results:${result.totalResults}`
        moviediv.appendChild(tresult);


        let img = document.createElement("img");
        img.src = `${item.Poster}` === "N/A" ? (image.src = "./Homeimage/noimg.png") : `${item.Poster}`;
        Poster.appendChild(img);
        moviediv.appendChild(Poster);

        let description = document.createElement("div");
        description.classList.add("description");
        description.innerHTML = `
      <div class = "mx-2  "> 
        <a href="./detail.html" class="filmId" target="_blank" 
        onclick="window.location.href = './detail.html?id=' + '${item.imdbID}';" > 
        <p class="movieItem mb-0 mt-3"> <span class="movieTextHome">İsmi:</span> ${item.Title}</p></a>
        <p class="movieItem mb-0 mt-3"> <span class="movieTextHome">Yılı:</span> ${item.Year}</p>
        <p class="movieItem mb-0 mt-3"> <span class="movieTextHome">Tipi:</span> ${item.Type} </p>
        <div class="movielinkItem">
            <span class="movieTextHome"> IMDB:</span> 
            <a href=https://www.imdb.com/title/${item.imdbID} target="_blank" 
            style="text-decoration: none;"> https://www.imdb.com/title/${item.imdbID} </a>
        </div>
       </div>`;
console.log(item)


        moviediv.appendChild(description);
        document.querySelector(".display").appendChild(moviediv);
    });
    next.classList.add("visible");
    prev.classList.add("visible");
};


next.addEventListener("click", () => {
    if (value === "") return
    pagenum++;
    getmovie(value, pagenum);

});
prev.addEventListener("click", () => {
    if (value === "") return
    if (pagenum === "") return
    pagenum--;
    getmovie(value, pagenum);

});

