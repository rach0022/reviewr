/*************************
 *
 *  @description Android media player app called REVIEWR built using Cordova
 *
 *  @author Ravi Chandra Rachamalla rach0022@algonquinlive.com
 *
 *  @version Jan 26, 2020
 *
 ***********************/

const reviewr = {
    active: "home",
    pages: [],
    baseUrl: null,

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
    },

    backbutton: ev => {
        //get the id fromthe back button
        let target = location.hash.replace("#", "");
        reviewr.showPage(target);
    }
};

//copied from https://prof3ssorst3v3.github.io/mad9014/modules/week13/#domcontentloaded-vs-deviceready
//check to see which device we are ready on:
let ready = "cordova" in window ? "deviceready" : "DOMContentLoaded";

document.addEventListener(ready, reviewr.init);