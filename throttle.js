function throttle(fn, wait, options) {
  var previous = 0,
    timeout,
    result;
  if (!options) options = {};

  var later = function () {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    fn.apply(this, args);
    if (!timeout) context = arguments = null;
  };

  return function () {
    var now = +new Date();
    var remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, arguments);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
  };
}

function throttle1(fn, wait, options) {
  wat = wait || 0;
  var timerId,
    lastTime = 0;

  function throttled() {
    var currentTime = +new Date();
    if (currentTime >= lastTime + wait) {
      fn();
      lastTime = currentTime;
    } else {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      timerId = setTimeout(function () {
        fn();
      }, wait);
    }
  }
  return throttled;
}

function throttle3(fn, wait) {
  let lastTime,
    timerId = null;
  return function () {
    let currentTime = +new Date();
    if (currentTime >= lastTime + wait) {
      fn();
      lastTime = currentTime;
    } else {
      if (timerId) {
        clearTimeout(timerId);
        // timerId = null
      }
      timerId = setTimeout(function () {
        fn();
      }, wait);
    }
  };
}

function _throttle(fn, wait, option) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  options = options || {};
  var later = function () {
    previous = option.leading === false ? 0 : +new Date();
    timeout = null;
    result = fn.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };

  return function () {
    var now = +new Date();
    if (!previous && options.leading === false) previous = now;

    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = fn.apply(context, args);
      if (!timeout) {
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
    }
  };
}
