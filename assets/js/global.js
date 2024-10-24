'use strict';
const addEventOnElements=(elements,eventType,callback)=>{
    for(const element of elements)
        element.addEventListener(eventType,callback);
}
function deviceType(){
    const mobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    if(mobile)
        return "mobile";
    else    
        return "desktop";
}

const device =deviceType();
const eventType = device=="mobile" ? "touchstart" : "click";

const searchBox=document.querySelector("[search-box]");
const searchToggler=document.querySelectorAll("[search-toggler]");

addEventOnElements(searchToggler,eventType,()=>{
    searchBox.classList.toggle("active");
});

//make search bar focused on click

const openSearch = document.querySelector(".open-search");
const searchField = document.querySelector("[search-field]");

openSearch.addEventListener(eventType,()=>{
    searchField.focus();
})



// when user clikc on movie card add movie id to local storage 

const getMovieDetail=function(movieId){
    window.localStorage.setItem("movieId",String(movieId));
}

//handle local storage to open movie list page with genre user selected

const getMovieList = function(urlParam,genreName){
    window.localStorage.setItem("urlParam",urlParam);
    window.localStorage.setItem("genreName",genreName);
}

//handle local storage for watchlist and favorites
function removeFromLocalStroage(key,id){
    let watchLaterArr = window.localStorage.getItem(key).split(",");
    const index = watchLaterArr.indexOf(`${id}`);
    if (index !== -1) {
        watchLaterArr.splice(index, 1);
        window.localStorage.setItem(key, watchLaterArr.join(","));
    }
}
function addToLocalStroage(key,id){
    let existBefore=window.localStorage.getItem(key);
    window.localStorage.setItem(key,`${existBefore||""}${id},`)
}
function listToggle(ele){

    ele.classList.toggle("added")
}
function watchList(ele,id){
    const key="watchlist"
    if(!(window.localStorage.getItem(key)))
        window.localStorage.setItem(key,"")
    const watchList=window.localStorage.getItem(key).split(",")
    if(watchList.includes(`${id}`)){
        removeFromLocalStroage(key,id);
        listToggle(ele);
    }else{
        addToLocalStroage(key,id);
        listToggle(ele);
    }
}
function favorites(ele,id){
    const key ="favorites"
    if(!(window.localStorage.getItem(key)))
        window.localStorage.setItem(key,"")
    const watchList=window.localStorage.getItem(key).split(",")
    if(watchList.includes(`${id}`)){
        removeFromLocalStroage(key,id);
        listToggle(ele);
    }else{
        addToLocalStroage(key,id);
        listToggle(ele);
    }
}
function updateIcons () {
    let watchList = window.localStorage.getItem("watchlist");
    if(watchList){
        let watchListIds = window.localStorage.getItem("watchlist").split(",");
        watchListIds.forEach((id) => {
            const movieCards = document.querySelectorAll(`[movie-id="${id}"]`);       
            movieCards.forEach((card) => {
                card.querySelector(".watchlist").classList.add("added");
            });
        });
    }
    let favorites = window.localStorage.getItem("favorites");
    if(favorites){
        let favoritesIds = window.localStorage.getItem("favorites").split(",");
        favoritesIds.forEach((id) => {
            const movieCards = document.querySelectorAll(`[movie-id="${id}"]`);       
            movieCards.forEach((card) => {
                card.querySelector(".favorites").classList.add("added");
            });
        });
    }
}
