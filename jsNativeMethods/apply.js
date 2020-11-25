Function.prototype.apply = function (context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0; i < arr.length; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");   //  args 自动调用toString方法，与join(',')效果相同
  }

  delete context.fn;
  return result;
};
