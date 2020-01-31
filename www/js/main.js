/*************************
 *
 *  @description Iphone camera app called REVIEWR built using Cordova
 *
 *  @author Ravi Chandra Rachamalla rach0022@algonquinlive.com
 *
 *  @version Jan 29, 2020
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

    //key variable used to connect back to the local storage
    KEY: null,
    
    //this is an object holding all my string values for text for easy fixing
    appTextSource: {
        welcome: "You Havent Added any Photos, Click the Plus Arrow To Start Your Journey in Reviews",
        confirm: "Would You Like to Add Photo?",
        error: "UhOh Something Funky is Happening, I'd Say start Running",
        retrievalIssue: "We are sorry, we could not recover your reviews at this time, click the add button to start adding new reviews",
        storageIssue: "We are sorry, we have run out of room to save reviews. Try deleting some reviews before you add a new one."
    },

    init: () => {

        //create the session key for the phone based on the device:
        //set key based on device id
        reviewr.KEY = "device" in window ? "REVIEW" + device.uuid : "REVIEWTEMPKEY";
        // reviewr.mediaBaseUrl = "device" in window ? `/var/mobile/Applications/${device.uuid}/Rach0022-Reviewr.app` : '';
        
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

        //handle the back button and set all the other listeners
        window.addEventListener('popstate', reviewr.backbutton)
        document.getElementById('fab').addEventListener('click', reviewr.takePhoto);
        document.getElementById('save').addEventListener('click', reviewr.submitReview);

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

    //helper function to navigate to a new page without an event
    navWithoutEvent: target => {
        //update the url
        history.pushState({}, target, `${reviewr.baseUrl}#${target}`);
        //change the display of the "page"
        reviewr.showPage(target);
    },

    showPage: target => {
        document.querySelector('.active').classList.remove('active');
        document.querySelector(`#${target}`).classList.add('active');

        // //use a switch(target) to target page specific details
        // //since home is dynamically created we will readd the event listeners
        // switch(target){
        //     default:
        //         console.log(reviewr.appTextSource.error);
        //         break;
        //     case 'home':
        //         console.log('this is the home page');
        //         break;
        //     case 'details':
        //         console.log('this is the detail page');
        //         break;
        //     case 'add-review':
        //         console.log('this is the add review page');
        //         break;
        // }
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

        //first we will load in the reviews from local storage
        reviewr.getReviews();
        let home = document.getElementById('home');
        let reviews = document.createElement('div');
        reviews.classList.add('reviews');
        //clear out the home div
        home.innerHTML = "";
        home.innerHTML += `<a href="#add-review" data-href="add-review">Add Review</a>
        <a href="#details" data-href="details">Details</a>`

        //check if there are any user reivews
        if(reviewr.userReviews.length === 0){
            let intro = document.createElement('p');
            intro.textContent = reviewr.appTextSource.welcome;
            home.appendChild(intro);
        } else {
            reviewr.userReviews.forEach(rev =>{

                //create the elements for each review div
                let figure = document.createElement('figure');
                figure.addEventListener('click', reviewr.buildDetailPage);
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
                reviews.appendChild(figure);
            });
            //append the reviews div after being built to the home div
            home.appendChild(reviews);

            //make sure to show the home page after it is built and add the listeners
            reviewr.navWithoutEvent('home');
            // reviewr.homePageListeners(); //helper method call to add all the listeners to the new built items (deleted)
        }

        //for now i need buttons to navigate to other pages so i am adding the links to their inner html
        // home.innerHTML += `<a href="#add-review" data-href="add-review">Add Review</a>
        // <a href="#details" data-href="details">Details</a>`;
    },

    //function to build the details page of a single review
    //it will be passed an event object that will have the data-id attribute to link it to a reivew in the user reviews array
    buildDetailPage: ev => {
        let detail = document.getElementById('details');
        let id = ev.currentTarget.getAttribute('data-id');
        //show the page
        reviewr.navWithoutEvent('details');
        // console.log(reviewr.mediaBaseUrl);

        //clear out any existing html in the detail div
        detail.innerHTML = "";

        //for now i need buttons to navigate to other pages so i am adding the links to their inner html
        //i am also setting the delete button to have the same id as the element building the detail page
        //to allow easier targetting for deleting an entry
        detail.innerHTML += `<a href="#add-review" data-href="add-review">Add Review</a>
        <a href="#home" data-href="home">Home</a>`;

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
            rating.classList.add('rating');

            img.src = rev.path;
            img.alt = rev.title;
            title.textContent = rev.title;

            //build the date string
            let time = new Date(rev.id);
            date.textContent = `${time.getFullYear()}:${(time.getMonth() + 1).toString().padStart(2,'0')}:${time.getDate().toString().padStart(2, '0')}`;
            
            //we use a for loop up to the rating number and add a *star* (currently numbers) to the div
            for(let i = 1; i <= rev.rating; i++){
                let text = document.createElement('p');
                text.textContent = String.fromCharCode(0x2605);
                rating.appendChild(text);
            }

            //now to build the delete button that will be placed under the figure
            let del_button = document.createElement('button');
            del_button.addEventListener('click', reviewr.deleteReview);
            let icon = document.createElement('i');
            icon.classList.add('fas', 'fa-trash');
            icon.textContent = 'Delete';
            del_button.setAttribute('data-id', id);

            //append all of the elements in the proper order
            fig.appendChild(img);
            fig.appendChild(title);
            fig.appendChild(date);
            fig.appendChild(rating);
            detail.appendChild(fig);
            
            del_button.appendChild(icon);
            detail.appendChild(del_button);
        } else {
            let error = document.createElement('p');
            error.textContent = reviewr.appTextSource.error;
            detail.appendChild(error);
        }
    },

    //start of functions to add reviews or delete reviews (starting with delete)
    deleteReview: ev =>{

        //first get the id from the button data-id attribute
        //set index as whatever the id matches to in the usreREviews array
        //for testing purposes we keep a reference to the removed item and console log it out
        let id = ev.currentTarget.getAttribute('data-id');
        let index = reviewr.userReviews.findIndex(rev => rev.id === id);
        let removed = reviewr.userReviews.splice(index, 1);
        console.log(removed);

        //now set the new reviews array in local storage to overwrite the previous
        //entry that contained the deleted item
        reviewr.setReviews();

        //navigate back to the home page (without an event content)
        reviewr.buildHomePage();
        reviewr.navWithoutEvent('home');
    },

    //start of functions to get and set the array to local storage:
    getReviews: function(){
        if(localStorage.getItem(reviewr.KEY)){
            reviewr.userReviews = JSON.parse(localStorage.getItem(reviewr.KEY));
        } else {
            console.log(reviewr.appTextSource.retrievalIssue);
        }
        //add an else logic to it to give the user some error notifications
    },

    //this is the helper function to set the reviews array
    //I will use try and catch logic to set the userReviews into local storage and if we get a warning
    //we will tell the user we are running out of space so delete some reviews
    setReviews: function(){
        try{
            let serialReviews = JSON.stringify(reviewr.userReviews);
            localStorage.setItem(reviewr.KEY, serialReviews);
        }
        catch(err){
            console.log(reviewr.appTextSource.storageIssue);
            console.error(err);
        }
    },

    //start of functions to take pictures
    //while testing we have set the source type to photo library
    //options is an object that has all the specifications for the cordova camera module to function
    //then after setting the options we use the getpicture() method with callback references
    //to process the image data
    takePhoto : function(){
        let options = {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY, //for testing using photo library but should be Camera.PictureSourceType.Camera
            mediaType: Camera.EncodingType.JPEG,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 500,
            targetHeight: 500
        };
        navigator.camera.getPicture(reviewr.cameraSuccess, reviewr.cameraFail, options);
    },

    //the camera success function is passed the image URI from the takePhoto() function above
    //we will take this uri and set it as the image src on the review page
    //and we will then move the user to the add review page where they can add details about
    //the item they are removing and then it will get saved to the array (and then to local storage)
    cameraSuccess : imgURI => {
        console.log(imgURI);
        //reset the form values first before we actually change the form
        document.querySelector('form').reset();
        document.getElementById('review-image').src = imgURI;

        //then navigate to the add review page
        reviewr.navWithoutEvent('add-review');

    },
    
    cameraFail : err => {
        console.log(err);
    },

    //these are the functions to add a review to the array of reviews
    //this is the submit review callback method that is ran when the user clicks save
    //on the add review page
    submitReview: ev =>{
        //first stop the event from preforming default actions or prevent the event from bubbling
        ev.preventDefault();
        ev.stopPropagation();
        //then get the id, title, rating and image src from the form submission
        let id = Date.now();
        let title = document.getElementById('title').value;
        let rating = document.getElementById('stars').getAttribute('data-rating');
        let path = document.getElementById('review-image').src; 

        //now push a new object containing all these properties into the user Reviews Array
        reviewr.userReviews.push({"id": id, "title": title, "rating": rating, "path": path});

        //then write the reviews into local storage
        reviewr.setReviews();

        //now time to rebuild and then show the home page
        reviewr.buildHomePage();
        reviewr.navWithoutEvent('home');
    }

};

//copied from https://prof3ssorst3v3.github.io/mad9014/modules/week13/#domcontentloaded-vs-deviceready
//check to see which device we are ready on:
let ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";

document.addEventListener(ready, reviewr.init);