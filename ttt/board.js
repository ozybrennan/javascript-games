var Board = function () {
  this.grid = [["_", "_", "_"], ["_", "_", "_"], ["_", "_", "_"]]
};

Board.prototype.winner = function () {
  for(var i = 0; i < 3; i++) {
    var row = this.grid[i].join();
    if (row === "x,x,x" || row === "o,o,o" ) {
      return row.charAt(0);
    } else if (this.grid[0][i] === this.grid[1][i] &&
      this.grid[1][i] === this.grid[2][i] && this.grid[0][i] != "_") {
        return this.grid[0][i];
    }
  };
  if (this.diagonals()) {
      return this.grid[1][1];
    }
  if (this.full()) {
    return undefined;
  }
  return null;
};

Board.prototype.full = function () {
  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      if (this.grid[x][y] === '_') {
        return false;
      }
    };
  };
  return true;
};

Board.prototype.diagonals = function () {
  if (this.grid[1][1] === "_") {
    return false;
  } else if (this.grid[0][0] === this.grid[1][1] && this.grid[1][1] === this.grid[2][2]) {
    return true;
  } else if (this.grid[0][2] === this.grid[1][1] && this.grid[1][1] === this.grid[2][0]) {
    return true;
  } else {
    return false;
  }
}

Board.prototype.empty = function (x, y) {
  if (this.grid[x][y] === "_") {
    return true;
  }
  else {
    return false;
  }
};

Board.prototype.placeMark = function (x, y, mark) {
  if (this.empty(x, y)) {
    this.grid[x][y] = mark;
    return true;
  }
  else {
    return false;;
  }
};

Board.prototype.print = function () {
  for(var i = 0; i < 3; i++) {
    console.log(this.grid[i] + '\n');
  }
};

module.exports = Board;
