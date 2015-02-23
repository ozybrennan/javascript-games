var readline = require('readline');

function Clock () {

}

Clock.TICK = 5000;

Clock.prototype.printTime = function () {
  console.log( this.currentTime.getHours() + ":" + this.currentTime.getMinutes() + ":" + this.currentTime.getSeconds());
};

Clock.prototype._tick = function () {
  seconds = this.currentTime.getSeconds() + 5;
  this.currentTime.setSeconds(seconds);
  this.printTime();
};

Clock.prototype.run = function () {
  this.currentTime = new Date();
  this.printTime();
  window.setInterval(this._tick.bind(this), Clock.TICK);
};

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumbers = function (sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
      reader.question("Please say a number", function (numString) {
        var number = parseInt(numString);
        sum += number;
        numsLeft--;
        console.log( sum );
        addNumbers(sum, numsLeft, completionCallback);
      })
  } else {
    completionCallback(sum)
    reader.close()
  }
};

var absurdBubbleSort = function (arr, sortCompletionCallback) {
  var outerBubbleSortLoop = function (madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop)
    }
    else {
      sortCompletionCallback(arr)
    }
  }
  outerBubbleSortLoop(true)
}

var innerBubbleSortLoop = function (arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1) {
    askIfLessThan(arr[i], arr[i + 1], function(isLessThan) {
      if (isLessThan) {
        var shuttle = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = shuttle;
        madeAnySwaps = true
      }
      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop)
    })
  }
  else {
    outerBubbleSortLoop(madeAnySwaps)
  }
}

var askIfLessThan = function (el1, el2, callback) {
  reader.question("is " + el1 + " less than " + el2 + "? ", function (answer) {
      if ( answer === "no" ) {
        callback(true);
      } else{
        callback(false);
      }
  });
};

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});
