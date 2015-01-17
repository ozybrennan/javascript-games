Function.prototype.myBind = function (context) {
  var fn = this;
  return function () {
    fn.apply(context);
  };
}

var Snowman = function (name) {
  this.name = name;
};

var melt = function () {
  console.log(this.name + " is melting.")
};

olaf = new Snowman("olaf")

myBoundFunction = melt.myBind(olaf)

myBoundFunction();
