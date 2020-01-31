# IOS REVIEWR APP by RACH0022

## Info at: https://prof3ssorst3v3.github.io/mad9022/assignments/cordova2.html

### To Do:
#### Code:
- [x] after clicking the photo button the user should be brought to the add review page with the image taken populating the form
- [ ] find out why after taking an image and saving it into the array it will not give the proper path
- [x] create a div containing all the form elements needed to add a review (1 textfields, submit button and rating system)
- [x] push any new review object into the array
- [x] use localstorage.getitem() and localstorage.setitem() to save and reload the array of review json objects
- [x] to searlize the array use JSON.stringfy() and JSON.parse()
- [ ] add a button to the add review page to allow the user to retake the photo
- [ ] finish the css for the app
- [ ] add an svg loader when saving to the array (display: none to display:block for an svg animation inside a div which we place with positioning absolute)
- [ ] implement the navigator cleanup: navigator.camera.cleanup(successCallback, errorCallback);

#### General:
- [x] Accept invite to Apple Developer Account
- [x] Update MacOS and XCODE
- [x] Create Icons for iOS
- [ ] Create Splashscreen for iOS
- [x] Download and Install the NPM modules "ios-sim" and "ios-deploy"
- [x] Follow remaining steps from here: https://prof3ssorst3v3.github.io/mad9022/modules/week4/ios.html
    * [x] Certificates
    * [x] Provisioning Profiles
    * [x] Adding your own iOS Devices
    * [x] Set up XCode for Cordova
    * [x] Set up for iOS Deployment from Cordova
    * [x] After doing the above, read through sections: iOS Simulator Notes & Note About XCode 10 & Installation Problems with ios-sim and ios-deploy and reconfirm that everything is working
- [ ] ReWrite Reviews Module



#### Home Page:
- [x] The home page for the app is a list which will show either a message saying that there are no reviews or a list of the names of the items that have been reviewed.
- [x] The list of reviews will be stored in localStorage as an Array of objects. Each item reviewed needs to be saved as an object like this:
```json
{
    "id": 134128716842,
    "title": "thing being reviewed",
    "rating": 4,
    "img": "path/on/phone/to/image"
}
```
- [ ] Use the current timestamp when taking the picture as the id for each item.
- [ ] Clicking on any of the titles will take you to the details page and show the image, title, and rating for the reviewed item.
- [ ] The home page needs a button in the top bar to add new reviews by taking the user to the Add Page. Follow the Apple HIG when designing and placing this button.

#### Details Page:
- [ ] The image should fill the whole width of the container. The title should be a label for the thing in the picture being reviewed. Use a figure, figcaption, and img element for the picture and title.
- [x] The rating system needs to be a number between 1 and 5 OR a star rating system displaying 1 to 5 stars. See the video link below as an example for how to create the rating system.
- [x] There needs to be a delete button which will remove the data from localstorage and return the user to the home page.
- [ ] There also needs to be a button in the top bar for the user to navigate back to the home screen.

#### Add Page: 
- [ ] The Add Page should show a button to take the picture. This should always be the first step on this page. Do not show the input or prompt for the title until after the picture is taken.
- [x] After the picture is taken and displayed (on a canvas or img element) then show the input field for the title and some type of input for the rating (number input or star system).
- [ ] After the picture is taken there should also be a save and a cancel button. The save button will also update localStorage adding the new item. Both buttons will take the user back to the home page.

#### Installation Instructions:
```bash
$: cordova create reviewr com.algonquinlive.rach0022.reviewr Rach0022-Reviewr
$: cordova platforms add ios
$: cordova plugin add cordova-plugin-camera
$: cordova plugin add cordova-plugin-device
# $: cordova plugin add cordova-plugin-file (consider adding this at a later time once code supports it)
```

#### Commands to Remember:
````bash
> ios-sim showdevicetypes
> ios-sim start --devicetypeid "device, version#fromabove"
> cordova run ios
> cordova run ios --target="IPHONE<#>,version"
````
