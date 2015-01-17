var Board = require ('./board');

var Game = function (reader) {
  this.reader = reader,
  this.board = new Board,
  this.playerMark = "x"
};

Game.prototype.promptMove = function (callback) {
  var that = this;
  this.board.print();
  console.log( "Current player: " + this.playerMark );
  that.reader.question("Which row?", function (row) {
    that.reader.question("Which column?", function (column) {
      var x = parseInt(row);
      var y = parseInt(column);

      callback(x, y);
    });
  });
}

Game.prototype.run = function (completionCallback) {
  var that = this;
  this.promptMove(function (x, y) {
    if (!that.board.placeMark(x, y, that.playerMark)) {
      console.log ( "You can't move there! ");;
    } else {
      that.switchTurns();
    }
    var winner = that.board.winner()
    if (winner === null) {
      that.run(completionCallback);
    } else if ( winner === undefined ) {
      console.log("A draw!")
      completionCallback();
    }
      else {
      console.log(that.board.winner() + " wins!");
      completionCallback();
    }
  })
}

Game.prototype.switchTurns = function () {
  if (this.playerMark === 'x') {
    this.playerMark = 'o'
  } else {
    this.playerMark = 'x'
  }
}

module.exports = Game;
