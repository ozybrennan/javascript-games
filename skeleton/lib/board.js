var Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  var grid = [];
  for (var i = 0; i < 8; i++) {
    row = [];
    for (var j = 0; j < 8; j++ ) {
      row.push(undefined);
    };
    grid.push(row);
  };
  grid[3][3] = new Piece("white");
  grid[3][4] = new Piece("black");
  grid[4][3] = new Piece("black");
  grid[4][4] = new Piece("white");
  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  var x = pos[0];
  var y = pos[1];
  if (!this.isValidPos(pos)){
    throw new Error("Not valid pos!");
  }
  var piece = this.grid[x][y];
  return piece;
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {

};

/**
 * Checks if every position on the Board is occupied.
 */
Board.prototype.isFull = function () {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (this.grid[i][j] === undefined) {
        return false;
      }
    };
  };
  return true;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  var x = pos[0];
  var y = pos[1];
  if (this.grid[x][y].color === color) {
    return true;
  } else {
    return false;
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  var x = pos[0];
  var y = pos[1];
  console.log("I work");
  if (this.grid[x][y] !== undefined) {
    return true;
  } else {
    return false;
  }
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  var x = pos[0]
  var y = pos[1]
  if (x < 0 || x > 7 || y < 0 || y > 7) {
    return false;
  } else {
    return true;
  }
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
  var piece = board.grid[pos[0]][pos[1]];
  if (!board.isValidPos(pos)) {
    return null;
  } else if (piece === undefined) {
    return null;
  } else if (piece.color === color) {
    if (piecesToFlip[0] === undefined) {
      return null;
    } else {
      return piecesToFlip;
    }
  } else {
    var new_x = pos[0] + dir[0];
    var new_y = pos[1] + dir[1];
    piecesToFlip.push(pos);
    return _positionsToFlip(board, [new_x, new_y], color, dir, piecesToFlip)
  }
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  for (var i = 0; i < 8; i++) {
    console.log(this.grid[i] + "\n")
  };
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  var x = pos[0];
  var y = pos[1];
  if (this.isOccupied(pos)) {
    return false
  }
  for (var i = 0; i < Board.DIRS.length; i++) {
    var dx = Board.DIRS[i][0]
    var dy = Board.DIRS[i][1]
    var new_pos = [x + dx, y + dy]
    var positions = _positionsToFlip(this, new_pos, color, Board.DIRS[i], [])
    if (positions !== null) {
      return true
    }
  };
  return false;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

module.exports = Board;
