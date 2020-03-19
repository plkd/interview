var isPalindrome = function(x){
    if (x < 0) return false
    for (let i=0;i<parseInt(x.length -1 / 2);i++){
        if (x[i] != x[x.length - i]){
            return false
        }
    }
    return true
}