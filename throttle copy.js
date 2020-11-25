function throttle(fn, wait, options) {
  var timeout, args, context, result;

  var previous = 0;
  options = options || {};

  var later = function () {
    previous = options.leading ? +new Date() : 0;
    timeout = null;
    fn.apply(context, args);
    if (!timeout) context = args = null;
  };

  return function () {
    var now = +new Date();

    if (!previous && !options.leading) previous = now;

    var remaining = wait - (now - remaining);

    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = fn.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing) {
      timeout = setTimeout(later, remaining);
    }
  };
}
