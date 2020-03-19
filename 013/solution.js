var romanToInt = function(s) {
    let m = parseInt(s/1000)
    s = s % 1000
    let d = parseInt(s / 500)
    s = s % 500
    let c = parseInt(s / 100)
    s = s %100
    let l = parseInt(s / 50)
    s = s % 50
    let x = parseInt(s / 10)
    s = s %10
    let v = parseInt(s / 5)
    s = s %5
    let i = s
    console.log(m,d,c,l,x,v,i);
    let result = '' + m ? 'M' || ''
}