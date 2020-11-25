Function.prototype.call = function (context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push("arguments[" + i + "]");
  }
  eval("context.fn(" + args + ")");

  delete context.fn;
};
