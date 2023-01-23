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
  this.Name = name;
  this.Genre = genre;
  this.Platform = platform;
  this.Completed = isCompleted;
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
  if (cardsContainer.firstChild) {
    return;
  }
  // Create a div for each game
  myGameLibrary.forEach(game => {
    const div = document.createElement('div');
    div.className = 'game-card';
    cardsContainer.appendChild(div);
    div.setAttribute('id', game.Name);
    // Populate div with info from object
    Object.entries(game).forEach(([key, value]) => {
      const info = document.createElement('p');
      info.textContent = `${key}: ${value}`;
      div.appendChild(info);
    })
  });
  // Remove add game form from view
  form.classList.add('display');

  // Add a delete button for each card
  const cardsList = cardsContainer.childNodes;
  cardsList.forEach(card => {
    card.innerHTML += `<button class="delete ${card.id}" type="button">Delete</button>`;
  })

  // Make a node list with all the delete buttons
  const deleteButton = document.querySelectorAll('.delete');

  // Add event listener so it can delete an object from array and card from view
  deleteButton.forEach(button => button.addEventListener('click', () => { 
    const btnClass = button.getAttribute('class').split(' ');
    const btnName = btnClass[1];
    const index = myGameLibrary.findIndex(checkGame);
    function checkGame(game) {
      return game.Name === btnName;
    }
    myGameLibrary.splice(index, 1);
    button.parentNode.remove();
  }))
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

