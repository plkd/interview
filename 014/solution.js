var longestCommonPrefix = function(strs) {
    let start = strs[0]
    if(!start) return ''
    if (strs.length == 1) return strs[0]
    let index=  0
    for (let i =0;i<start.length;i++){
        for(let j =0;j<strs.length-1;j++){
            var prev = strs[j][i], next = strs[j+1][i]
            if(prev != next){
                index = i
                if (index == 0) return ''
                return strs[0].slice(0,index)
            } 
        }
        index++
    }
    return strs[0].slice(0,index)
};