// Array that will hold any game added to the library
let myGameLibrary = [];

// DOM elements
const addGameButton = document.querySelector('.add-game');
const saveGame = document.querySelector('.save');
const form = document.querySelector('#form');
const show = document.querySelector('.show-library');
const cardsContainer = document.querySelector('.game-library');
const addGame = document.querySelector('.add-game');

// Event to save game to library, with a call
// to function prevent, made for preventing
// default behaviour with submit, since theres no
// database attached 
saveGame.addEventListener('click', prevent, false);

// Object constructor
function Game(name, genre, platform, isCompleted) {
  this.name = name;
  this.genre = genre;
  this.platform = platform;
  this.isCompleted = isCompleted;
}

// Add function to prototype of Game Obj
// for storing new obj into the array
Game.prototype.addGameToLibrary = function () {
  myGameLibrary.push(this);
}

// Attach event to button Add Game, so it shows
// the form for the user to fill. Also it removes
// the game cards if they were being showed. 
addGame.addEventListener('click', () => {
  form.classList.remove('display');
  if (cardsContainer != null) {
    while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
    }
  }
})

// Attach event listener to button 'show library',
// this event will create cards with the games info
// and show it. It will also remove the form from view.
show.addEventListener('click', () => {
  
  myGameLibrary.forEach(game => {
    const div = document.createElement('div');
    div.className = 'game-card';
    cardsContainer.appendChild(div);
    Object.entries(game).forEach(([key, value]) => {
      const info = document.createElement('p');
      info.textContent = `${key}: ${value}`;
      div.appendChild(info);
    })
  });
  form.classList.add('display');
})

// Function to prevent default behaviour on submit
// and create a new object whilst storing it in the
// library array, using the user input data.
function prevent(event) {
  const formData = new FormData(form);
  const formArray = [];
  for (const pair of formData.entries()) {
    formArray.push(pair[1]);
  }
  const newGame = new Game(...formArray);
  newGame.addGameToLibrary();
  event.preventDefault();
  form.reset();
}




// function prevent(event) {
//   const formData = new FormData(form);
//   const formArray = [];
//   for (const pair of formData.entries()) {
//     formArray.push(pair[1]);
//   }
//   const newGame = new Game(...formArray);
//   console.log(newGame);
//   newGame.addGameToLibrary();
//   event.preventDefault();
// }



// const zelda = new Game('Zelda Wind Waker', 'Action/Adventure', 'Nintendo GameCube', true);

// zelda.addGameToLibrary();

// function addGameToLibrary(game) {
//   myGameLibrary.push(game);
// }