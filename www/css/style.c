.star {
  color: #263242;
  font-size: 2.0rem;
  padding: 0 1rem; }
  .star::before {
    content: '\2606';
    cursor: pointer; }
  .star:hover::before {
    content: '\2605';
    color: #263242; }
  .star.rated::before {
    content: '\2605'; }

* {
  color: #E8ECEC; }

header {
  width: 100%;
  min-height: 65px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #E8ECEC;
  background-color: #263242; }
  header .gohome {
    position: absolute;
    left: 3vw; }
  header h2 {
    margin-right: 3vw; }

body {
  padding: 0;
  margin: 0;
  min-height: 100vh;
  font-family: sans-serif; }

main {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0; }

.page {
  box-sizing: border-box;
  min-height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.4s linear;
  padding-top: 10vh;
  overflow-y: hidden;
  background-color: #708396; }

.page:last-child {
  border: none; }

.page.active {
  opacity: 1;
  z-index: 100; }

#home figure {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #708396; }
  #home figure img {
    width: 200px;
    height: auto; }
#home .empty-reviews {
  text-align: center; }

#add-review form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; }
  #add-review form img {
    border-radius: 100%;
    width: 200px;
    height: 200px; }
  #add-review form button {
    border-radius: 100%;
    width: 60px;
    height: 60px; }
  #add-review form input {
    background-color: transparent;
    border: none;
    border-radius: 0;
    color: #263242;
    border-bottom: 2px solid #263242; }

#details figure {
  width: 100%;
  border: 2px solid #708396;
  text-align: center; }
  #details figure img {
    width: 100%;
    height: auto; }
  #details figure .rating {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; }
    #details figure .rating p {
      color: #263242;
      padding: 0.5em; }

#fab {
  font-size: 1.8em;
  position: fixed;
  top: 80vh;
  left: 70vw;
  z-index: 115;
  border-radius: 100%;
  width: 100px;
  height: 100px;
  background-color: #547D87; }

/*# sourceMappingURL=style.c.map */
