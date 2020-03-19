/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(board[i][j] == '.') continue
            for(let k = 8;k>j;k--){
                if(board[i][j] == board[i][k]){
                    return false
                }
            }
            for(let k=8;k<i;k--){
                if(board[i][j] == board[k][j]) return false
            }
            
        }
    }
};