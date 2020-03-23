function throttle(fn, wait, options) {
    var previous = 0, timeout, result
    if(!options) options = {}

    var later = function() {
        previous = options.leading === false ? 0 : +new Date()
        timeout = null
        fn.apply(this, args)
        if(!timeout) context = arguments = null
    }

    var throttled = function() {
        var now = +new Date()
        var remaining = wait - (now - previous)
        if(remaining <= 0 ||remaining > wait) {
            if(timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            func.apply(this, arguments)
        } else if (!timeout) {
            timeout = setTimeout(later, remaining)
        }
    }
    return throttled
}