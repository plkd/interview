function _throttle(fn, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  options = options || {};

  var later = function () {
    previous = options.leading ? +new Date() : 0;
    timeout = null;
    result = fn.apply(context, args);
    if (!timeout) context = args = null;
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
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
}

function easeDebounce(fn, wait) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(fn.apply(context, args), wait);
  };
}

function easeThrottle(fn, wait) {
  var waiting = false;
  return function () {
    var context = this;
    var args = arguments;
    if (!waiting) {
      fn.apply(context, args);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      });
    }
  };
}

function throttle(fn, wait, options) {
  var context, result, args, timeout;
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

    var remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      fn.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing) {
      timeout = setTimeout(later, wait);
    }
  };
}

function throttle2(fn, wait, options) {
  var context, args, timeout;
  var previous = 0;
  options = options || {};

  var later = function () {
    previous = options.leading ? +new Date() : 0;
    timeout = null;
    fn.apply(context, args);
    if (!timeout) context = args = null;
  };

  return function () {
    context = this;
    args = arguments;
    var now = +new Date();

    if (!previous && !options.leading) previous = now;

    var remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      fn.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing) {
      timeout = setTimeout(later, remaining);
    }
  };
}

function t(fn, wait, options) {
  previous = 0;
  var later = function () {
    previous = options.leading ? +new Date() : 0;
    timeout = null;
    fn.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = +new Date();

    if (!previous && !options.leading) previous = now;

    var remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        fn.apply(context, args);
        previous = now;
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing) {
        timeout = setTimeout(later, remaining);
      }
    }
  };
}

function d(fn, wait, immediate) {
  var later = function () {
    var last = +new Date() - timestamp;

    if (last >= wait) {
      timeout = null;
      if (!immediate) {
        fn.apply(context, args);
        context = args = null;
      }
    } else {
      timeout = setTimeout(later, wait - last);
    }
  };

  return function () {
    var timestamp = +new Date();
    var callNow = !timeout && immediate;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      fn.apply(context, args);
      context = args = null;
    }
  };
}

function throttle_(fn, wait) {
  var loading = false;
  return function () {
    var context = this;
    var args = arguments;
    if (!loading) {
      fn.apply(context, args);
      loading = true;
      setTimeout(function () {
        loading = false;
      }, wait);
    }
  };
}

function myThrottle(fn, wait, options) {
  var context, args, result, timeout;
  var previous = 0;

  var later = function () {
    previous = options.leading ? +new Date() : 0;
    timeout = null;
    fn.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };

  return function () {
    var now = +new Date();

    if (!previous && !options.leading) previous = now;

    var remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = fn.apply(context, args);
    } else if (!timeout && options.trailing) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

function easyThrottle(fn, wait) {
  var loading = false;
  return function () {
    var context = this;
    var args = arguments;
    if (!loading) {
      fn.apply(context, args);
      setTimeout(function () {
        loading = true;
      }, wait);
    }
  };
}

function easeDebounce(fn, wait) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    if (timeout) {
      clearTimeout(timeout);
      timeout = setTimeout(fn.apply(context, args), wait);
    }
  };
}
