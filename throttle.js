function throttle(fn, wait) {
    var previous = 0, timeout, result

    var later = function() {
        previous = +new Date()
        timeout = null
        fn.apply(this, args)
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