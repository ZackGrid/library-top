// Array that will hold any game added to the library
let myGameLibrary = [];

// DOM elements
const addGameButton = document.querySelector('.add-game');
const saveGame = document.querySelector('.save');
const form = document.querySelector('#form');
const show = document.querySelector('.show-library');
const cardsContainer = document.querySelector('.game-library');
const addGame = document.querySelector('.add-game');

// Object constructor
function Game(name, genre, platform, completed) {
  this.Name = name;
  this.Genre = genre;
  this.Platform = platform;
  this.Completed = completed;
}

// Add function to prototype of Game Obj
// for storing new obj into the array
Game.prototype.addGameToLibrary = function () {
  myGameLibrary.push(this);
}

Game.prototype.toggleCompleted = function () {
  if (this.Completed === 'Yes') {
    this.Completed = 'Not Yet';
  } else {
    this.Completed = 'Yes';
  }
}

// Event to save game to library, with a call
// to function prevent, made for preventing
// default behaviour with submit, since there's no
// database attached 
saveGame.addEventListener('click', prevent, false);

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
// Inside this event is every event related to the cards
// such as delete card, and toggle completed status.
show.addEventListener('click', () => {

  // Check if there are cards in display already.
  // if so, it will return before creating new ones.
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
      info.classList.add = `${key}`;
      div.appendChild(info);
    })
  });
  // Remove 'add game form' from view
  form.classList.add('display');

  // Make a node list with all the game cards
  const cardsList = cardsContainer.childNodes;

  // Add a delete button for each card
  cardsList.forEach(card => {
    card.innerHTML += `<button class="delete ${card.id}" type="button">Delete</button>`;
    card.innerHTML += `<button class="toggle ${card.id}" type="button">Change Status</button>`;
  })

  // Make a node list with all the delete buttons
  // and one with the toggle buttons
  const deleteButton = document.querySelectorAll('.delete');
  const toggleButton = document.querySelectorAll('.toggle');

  // function to get the index of the object in the array
  function getIndex(button) {
    const btnClass = button.getAttribute('class').split(' ');
    const btnName = btnClass[1];
    const index = myGameLibrary.findIndex(checkGame);
    function checkGame(game) {
      return game.Name === btnName;
    }
    return index;
  }
    
  // Add event listener so it can delete an object from the
  // array, and card from view.
  deleteButton.forEach(button => button.addEventListener('click', () => { 
    const index = getIndex(button);
    cardsList[index].innerHTML += '<span class="you-sure-message">Are You Sure You Want to Delete?</span>';

    const time = setTimeout(youSureButton, 1000);
    const deleteTime = setTimeout(deleteTimeout, 1001);
    
    // cardsList[index].innerHTML += '<button class="you-sure" type="button">Yes</button>';

    function youSureButton () {
      cardsList[index].innerHTML += '<button class="you-sure" type="button">Yes</button>';
    }

    function deleteTimeout() {
      const youSure = document.querySelector('.you-sure');
      youSure.addEventListener('click', () => {
      myGameLibrary.splice(index, 1);
      addGame.click();
      show.click();
    })
    }    
  }))

  // Add event listener so it will toggle game completed
  // status
  toggleButton.forEach(button => button.addEventListener('click', () => {
    const index = getIndex(button);
    myGameLibrary[index].toggleCompleted();
    addGame.click();
    show.click();
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