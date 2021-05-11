// DISPLAY BUTTON

// select the button (ALWAYS the first thing)
const btn = document.querySelector('#show-hint');
// add event listener on that btn
// btn.addEventListener('event', callback)
btn.addEventListener('click', (event) => {
  // console.log(event);
  // console.log(event.currentTarget);
  // when the event is triggered
  // select the hidden div
  const hintDiv = document.querySelector('div.hint');
  // toggle it's "activeness"
  hintDiv.classList.toggle('active');
});

//////////////
// THE GAME //
//////////////

///////////////
// FUNCTIONS //
///////////////
const canMove = (whiteTile) => {
  // the tile can only move if it's orthogonally adjacent
  const whiteTileColumn = whiteTile.cellIndex;
  const whiteTileRow = whiteTile.parentElement.rowIndex;

  const emptyTile = document.querySelector('td.empty');
  const emptyTileColumn = emptyTile.cellIndex;
  const emptyTileRow = emptyTile.parentElement.rowIndex;
  // console.log(`whiteTileColumn = ${whiteTileColumn}`);
  // console.log(`whiteTileRow = ${whiteTileRow}`);
  // console.log(`emptyTileColumn = ${emptyTileColumn}`);
  // console.log(`emptyTileRow = ${emptyTileRow}`);

  let columnDifference = whiteTileColumn - emptyTileColumn
  columnDifference = Math.abs(columnDifference)
  let rowDifference = whiteTileRow - emptyTileRow
  rowDifference = Math.abs(rowDifference)
  // console.log(`columnDifference = ${columnDifference}`);
  // console.log(`rowDifference = ${rowDifference}`);


  // if they have the same row and the column difference is 1, it can move
  // if (columnDifference === 1 && rowDifference === 0) {
  //   return true
  // // if they have the same column and the row difference is 1, it can move
  // } else if (columnDifference === 0 && rowDifference === 1) {
  //   return true
  // // else, can't move
  // } else {
  //   return false
  // }

  // Refactoring the above lines:
  // if the sum is 1, can move; else, can't move
  return columnDifference + rowDifference === 1
};

const move = (whiteTile) => {
  // find the empty tile
  const emptyTile = document.querySelector('td.empty');
  // change what's inside of the empty tile with whats inside the white tile
  emptyTile.innerText = whiteTile.innerText;
  emptyTile.classList.remove('empty');
  // empty the white tile
  whiteTile.innerText = '';
  whiteTile.classList.add('empty');
};

const gameOver = () => {
  let result = ''
  const tds = document.querySelectorAll('td');
  tds.forEach((td) => {
    result += td.innerText;
  });
  const winningCombination = "123456789101112131415";
  return result === winningCombination && finalPosition;
};

const finalPosition = () => {
  const emptyTile = document.querySelector('td.empty');
  const emptyTileColumn = emptyTile.cellIndex;
  const emptyTileRow = emptyTile.parentElement.rowIndex;
  return emptyTileColumn * emptyTileRow === 9;
};

const gameHandler = (event) => {
  const whiteTile = event.currentTarget;
  if (canMove(whiteTile)) {
    // the white tile should move into the empty spot
    move(whiteTile);
    // if all the tiles are in ascending order, the game ends
    if (gameOver()) {
      alert('GAME OVER!');
      document.window.location.reload()
    };
  }
};

// select all the white tiles
const whiteTiles = document.querySelectorAll('td');
// iterate over all the white tiles
whiteTiles.forEach((whiteTile) => {
  // add an event listener ('click')
  // when the user clicks on a white tile
  whiteTile.addEventListener('click', gameHandler);
});
