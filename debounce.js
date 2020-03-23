function debounce(fn, wait, immediate) {
    let timeout = null, result
    var debounced =  function() {
        clearTimeout(timeout)
        if(immediate) {
            var callNow = !timeout
            timeout = setTimeout(function() {
                timeout = null
            }, wait)
            if(callNow) result = fn.apply(this, arguments)
        } else {
            timeout = setTimeout(() => {
                fn.apply(this, arguments)
            }, wait)
        }
        return result
    }
    debounced.cancel = function() {
        clearTimeout(timeout)
        timeout = null
    }
    return debounced
}

