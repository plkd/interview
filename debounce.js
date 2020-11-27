function debounce(fn, wait, immediate) {
  let timeout = null,
    result;
  var debounced = function () {
    clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = fn.apply(this, arguments);
    } else {
      timeout = setTimeout(() => {
        fn.apply(this, arguments);
      }, wait);
    }
    return result;
  };
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}

function debounce1(fn, wait, immediate) {
  var timeout, timestamp, context, args, result;
  var later = function () {
    var last = +new Date() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = fn.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = +new Date();
    var callNow = !timeout && immediate;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = fn.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

function debounce3(fn, wait, immediate) {
  var result, context, args, timeout, timestamp;

  var later = function () {
    var last = +new Date() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = fn.apply(context, args);
        context = args = null;
      }
    }
  };

  return function () {
    timestamp = +new Date();
    args = arguments;
    context = this;
    var callNow = !timeout && immediate;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = fn.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

function simpleDebounce(fn, wait) {
  var timerId;
  return function () {
    var context = this;
    var args = arguments;
    if (timerId) {
      clearTimeout(timerId);
      setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    }
  };
}

function myDebounce(fn, wait, immediate) {
  var context, args, timeout, timestamp, result;

  var later = function () {
    var last = +new Date() - timestamp;
    if (last >= wait || last < 0) {
      timeout = null;
      if (!immediate) {
        fn.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    timestamp = +new Date();
    context = this;
    args = arguments;
    var callNow = !timeout && immediate;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = fn.apply(context, args);
      context = args = null;
    }
    return result;
  };
}
