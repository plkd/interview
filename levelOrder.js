var levelOrder = function(root) {
  if(!root) return []
  let queue = [root],res =[],level = 0;
  while(queue.length) {
    res[level] = []
    let levelNum = queue.length
    while(levelNum--) {
      let front = queue.shift()
      res[level].push(front.val)
      if(front.left) {
        queue.push(front.left)
      }
      if(front.right) {
        queue.push(front.right)
      }
    }
    level++
  }
  return res
}