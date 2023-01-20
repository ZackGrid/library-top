let myGameLibrary = [];

const addGameButton = document.querySelector('.add-game');
const saveGame = document.querySelector('.save');
const form = document.querySelector('#form');

saveGame.addEventListener('click', prevent, false);

function Game(name, genre, platform, isCompleted) {
  this.name = name;
  this.genre = genre;
  this.platform = platform;
  this.isCompleted = isCompleted;
}

Game.prototype.addGameToLibrary = function () {
  myGameLibrary.push(this);
}

function showGameLibrary() {
  console.log(myGameLibrary);
}

function prevent(event) {
  const formData = new FormData(form);
  const formArray = [];
  for (const pair of formData.entries()) {
    formArray.push(pair[1]);
  }
  const newGame = new Game(...formArray);
  newGame.addGameToLibrary();
  event.preventDefault();
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