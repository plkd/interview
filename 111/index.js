/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

// DFS
var minDepth = function (root) {
  if (root == null) return 0;
  let left = minDepth(root.left),
    right = minDepth(root.right);
  return left && right ? 1 + Math.min(left, right) : 1 + left + right;
};

// BFS
var minDepthBFS = function (root) {
  if (root == null) return 0;

  const queue = [root];
  let depth = 1;

  while (queue.length) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const cur = queue.shift();
      if (cur.left == null && cur.right == null) {
        return depth;
      }

      if (cur.left) {
        queue.push(cur.left);
      }
      if (cur.right) {
        queue.push(cur.right);
      }
    }
    depth++;
  }
};
