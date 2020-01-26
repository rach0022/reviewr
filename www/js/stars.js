/*************************
 *
 *  @description Review Module for ReviewR iOS app
 *
 *  @author Ravi Chandra Rachamalla rach0022@algonquinlive.com
 *
 *  @version Jan 26, 2020
 *
 ***********************/
//www/js/reviews.js
//module used to keep code cleaner and get user reviews.
//check module.exports for the functions addListeners and set Rating //set this in init fn
//starter code taken from : https://codepen.io/mad-d/pen/aJMPWr?editors=0010

export let setRating = function(ev){
    let stars = document.querySelectorAll('.star');
    let value = ev.target.getAttribute('data-value');
    stars.forEach(star => {
        if(star.getAttribute('data-value') <= value){
            star.classList.add('rated');
        } else {
            star.classList.remove('rated');
        }
    })

    //set the data rating to the .stars so we have a value to reference for the current rating
    document.querySelector('.stars').setAttribute('data-rating', value);
}

export let starInit = function(){
    let stars = document.querySelectorAll('.star');

    stars.forEach(star => {
        star.addEventListener('click', setRating);
    });

    let rating = parseInt(document.querySelector('.stars').getAttribute('data-rating'));
    let target = stars[rating -1];
    target.dispatchEvent(new MouseEvent('click'));
}

// module.exports = {addListeners, setRating, starInit};