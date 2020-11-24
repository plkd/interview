function delegate(parent, selector, type,  handler) {
  if(parent.addEventListener) {
    parent.addEventListener(type, eventFn, false)
  } else {
    parent.attachEvent('on' + type, eventFn)
  }

  function eventFn(e) {
    var e = e || window.event
    var target = e.target || e.srcElement
    if(target.querySelector(selector)){
      handler.call(target,e)
    }
  }
}