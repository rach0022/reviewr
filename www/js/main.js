/*************************
 *
 *  @description Android media player app called REVIEWR built using Cordova
 *
 *  @author Ravi Chandra Rachamalla rach0022@algonquinlive.com
 *
 *  @version Jan 26, 2020
 *
 ***********************/

 //import code to use module in browser taken form :https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
import * as stars from './stars.js';

const reviewr = {
    active: "home",
    pages: [],
    baseUrl: null,
    stars: stars,
    userReviews: [
        {
            id: Date.now(),
            title: "Test Review",
            rating: 4,
            path: '/www/img/testphoto.png'
        }
    ],
    
    //this is an object holding all my string values for text for easy fixing
    appTextSource: {
        welcome: "You Havent Added any Photos, Click the Plus Arrow To Start Your Journey in Reviews",
        confirm: "Would You Like to Add Photo?",
        error: "UhOh Something Funky is Happening, I'd Say start Running"
    },

    init: () => {
        reviewr.pages = document.querySelectorAll(".page");
        let links = document.querySelectorAll("[data-href]");

        links.forEach(link => {
            link.addEventListener("click", reviewr.nav);
        });

        //get the base url to use in the app
        reviewr.baseUrl = location.href.split("#")[0];
        let hash = location.hash;

        //check for the current url hash
        if(hash && hash != "#"){
            //there is an id in the url
            reviewr.active = hash.replace("#", "");
            reviewr.showPage(reviewr.active);
        } else {
            //no url so use our default url (home)
            history.replaceState({}, reviewr.active, `${reviewr.baseUrl}#${reviewr.active}`);
            reviewr.showPage(reviewr.active);
        }

        //handle the back button
        window.addEventListener('popstate', reviewr.backbutton)

        //init events for other functionalities
        reviewr.stars.starInit();

        //testing REVIEWR APP fucntions and photos
        console.log(reviewr.userReviews);
        reviewr.buildHomePage();
    },

    nav: ev => {
        ev.preventDefault();
        ev.stopPropagation();
        let link = ev.target;
        let target = link.getAttribute("data-href");

        //update the url
        history.pushState({}, target, `${reviewr.baseUrl}#${target}`);

        //change the display of the "page"
        reviewr.showPage(target);
    },

    showPage: target => {
        document.querySelector('.active').classList.remove('active');
        document.querySelector(`#${target}`).classList.add('active');

        //use a switch(target) to target page specific details
        //since home is dynamically created we will readd the event listeners
        switch(target){
            default:
                console.log(reviewr.appTextSource.error);
                break;
            case 'home':
                console.log('this is the home page');
                break;
            case 'details':
                console.log('this is the detail page');
                break;
            case 'add-review':
                console.log('this is the add review page');
                break;
        }
    },

    backbutton: ev => {
        //get the id fromthe back button
        let target = location.hash.replace("#", "");
        reviewr.showPage(target);
    },

    //function to run to build the home page:
    //it will build the home page based on the reivew page
    //if it is empty it will build just some simple elements to ask the user to add reviews
    //and will buidl the page based on this:
    //reviews(div)>review(figure)*userReviewslength>img+figcation
    //these will be made in the #home div
    buildHomePage: function() {
        let home = document.getElementById('home');
        let reviews = document.createElement('div');
        reviews.classList.add('reviews');
        //clear out the home div
        home.innerHTML = "";

        //check if there are any user reivews
        if(reviewr.userReviews.length === 0){
            let intro = document.createElement('p');
            intro.textContent = reviewr.appTextSource.welcome;
            home.appendChild(intro);
        } else {
            reviewr.userReviews.forEach(rev =>{

                //create the elements for each review div
                let figure = document.createElement('figure');
                figure.classList.add('review');
                figure.setAttribute('data-id', rev.id);
                let title = document.createElement('figcaption');
                let date = document.createElement('figcaption')
                let img = document.createElement('img');

                //set the values on the elements
                img.src = rev.path;
                img.alt = `${rev.title}`;
                title.textContent = rev.title;
                //build the date as YYYY:MM:DD using pad start to make sure its always 2 digits for month and day
                let time = new Date(rev.id);
                date.textContent = `${time.getFullYear()}:${(time.getMonth() + 1).toString().padStart(2,'0')}:${time.getDate().toString().padStart(2, '0')}`;

                //append the divs in the proper order and add the listners
                figure.appendChild(img);
                figure.appendChild(title);
                figure.appendChild(date);
                figure.addEventListener('click', reviewr.buildDetailPage);
                reviews.appendChild(figure);
            });
            //append the reviews div after being built to the home div
            home.appendChild(reviews);

            //make sure to show the home page after it is built and add the listeners
            reviewr.showPage('home');
            reviewr.homePageListeners(); //helper method call to add all the listeners to the new built items
        }

        //for now i need buttons to navigate to other pages so i am adding the links to their inner html
        home.innerHTML += `<a href="#add-review" data-href="add-review">Add Review</a>
        <a href="#details" data-href="details">Details</a>`;
    },

    //helper method to add the event listerners back to the home page:
    homePageListeners: function(){
        let figures = document.querySelectorAll('figure.review');
        if(figures){
            figures.forEach(fig => {
                fig.addEventListener('click', reviewr.buildDetailPage);
            })
        }
    },

    //function to build the details page of a single review
    //it will be passed an event object that will have the data-id attribute to link it to a reivew in the user reviews array
    buildDetailPage: ev => {
        console.log('happens');

        let detail = document.getElementById('details');
        let id = ev.currentTarget.getAttribute('data-id');

        //clear out any existing html in the detail div
        detail.innerHTML = "";

        //find the review based on the id using the arrow syntax and since it is one check we can do it on one line
        let rev = reviewr.userReviews.find(entry => entry.id == id);
        console.log(rev);
        //if we find a review we will create and append all the elements to a figure and append that to the details div
        if(rev){
            let fig = document.createElement('figure');
            let img = document.createElement('img');
            let title = document.createElement('figcaption');
            let date = document.createElement('figcaption');
            let rating = document.createElement('div')

            img.src = rev.path;
            img.alt = rev.title;
            title.textContent = rev.title;

            //build the date string
            let time = new Date(rev.id);
            date.textContent = `${time.getFullYear()}:${(time.getMonth() + 1).toString().padStart(2,'0')}:${time.getDate().toString().padStart(2, '0')}`;
            
            //we use a for loop up to the rating number and add a *star* (currently numbers) to the div
            for(let i = 1; i <= rev.rating; i++){
                let text = document.createElement('p');
                text.textContent = i.toString();
                rating.appendChild(text);
            }
            fig.appendChild(img);
            fig.appendChild(title);
            fig.appendChild(date);
            fig.appendChild(rating);
            detail.appendChild(fig);
        } else {
            let error = document.createElement('p');
            error.textContent = reviewr.appTextSource.error;
            detail.appendChild(error);
        }

        //for now i need buttons to navigate to other pages so i am adding the links to their inner html
        //i am also setting the delete button to have the same id as the element building the detail page
        //to allow easier targetting for deleting an entry
        detail.innerHTML += `<button class="delete" id="${id}"><i class="fas fa-trash"></i></button>
        <a href="#add-review" data-href="add-review">Add Review</a>
        <a href="#details" data-href="details">Details</a>`;

        //show the page
        reviewr.showPage('details');

    }
};

//copied from https://prof3ssorst3v3.github.io/mad9014/modules/week13/#domcontentloaded-vs-deviceready
//check to see which device we are ready on:
let ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";

document.addEventListener(ready, reviewr.init);