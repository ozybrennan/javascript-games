var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var HanoiGame = function () {
  this.stack = [[3, 2, 1], [], []];
};

HanoiGame.prototype.isWon = function () {
  if (this.stack[2].join() === [3, 2, 1].join()) {
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  var startLength = this.stack[startTowerIdx].length - 1;
  var endLength = this.stack[endTowerIdx].length - 1;
  if (startLength === -1 ) {
    return false;
  } else if (endLength === -1) {
    return true;
  } else if (this.stack[startTowerIdx][startLength] < this.stack[endTowerIdx][endLength]) {
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    this.stack[endTowerIdx].push(this.stack[startTowerIdx].pop());
    return true;
  } else {
    // do something later
    return false;
  }
};

HanoiGame.prototype.print = function () {
  console.log(JSON.stringify(this.stack));
};

HanoiGame.prototype.promptMove = function (callback) {
  this.print();
  reader.question("What tower do you want to move from? ", function (startTowerIdx) {
    reader.question("What tower do you want to move to? ", function (endTowerIdx) {
      var startTower = parseInt(startTowerIdx);
      var endTower = parseInt(endTowerIdx);

      callback(startTower, endTowerIdx);
    });
  });
};

HanoiGame.prototype.run = function (completionCallback) {
  var that = this;
  this.promptMove( function (startTowerIdx, endTowerIdx) {
    if (!that.move(startTowerIdx, endTowerIdx)) {
      console.log("You can't make that move! ");
    }
    if (that.isWon()) {
      console.log("You win!");
      completionCallback();
    } else {
      that.run(completionCallback);
    }
  });
};

var HanoiGame = new HanoiGame
HanoiGame.run(function () {
  reader.close()
})
