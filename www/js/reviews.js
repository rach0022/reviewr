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

export let addListeners = function (){
    let stars = document.querySelectorAll('.star');
    
    //go through each star and add the listenrs
    [].forEach.call(stars, (star, index) => {
        star.addEventListener('click', (idx => {
            console.log('added rating on ', index);

            document.querySelector('.stars').setAttribute('data-rating', idx+1);
            console.log('Rating is now', idx +1);
            setRating();
        }).bind(window, index));
    });
}

export let setRating = function(){
    let stars = document.querySelectorAll('.star');
    let rating = parseInt(document.querySelector('.stars').getAttribute('data-rating'));

    stars.forEach.call(stars, function(star, index){
        if(rating > index){
            star.classList.add('rated');
            console.log('added rating on', index);
        } else {
            star.classList.remove('rated');
            console.log('removed rating on', index);
        }
    });
}

export let starInit = function(){
    addListeners();
    setRating();
}

// module.exports = {addListeners, setRating, starInit};