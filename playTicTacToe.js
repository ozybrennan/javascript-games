var ttt = require ('./ttt');

var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

g = new ttt.Game(reader);
g.run(function () {
  reader.close();
});
