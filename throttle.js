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

  var throttled = function () {
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
  return throttled;
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

function throttle2(fn, wait) {
  wati = wait || 0;
  var lastTime = 0,
    timerId = null;

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
