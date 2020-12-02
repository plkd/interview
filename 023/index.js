/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  var result = null
  for(let i = 0;i<lists.length;i++) {
      result = mergeTwo(result, lists[i])
  }
  return result
};

var mergeTwo = function (a, b) {
  var head = new ListNode(0);
  var tail = head,
    aPtr = a,
    bPtr = b;
  while (aPtr != null && bPtr !== null) {
    if (aPtr.val < bPtr.val) {
      tail.next = aPtr;
      aPtr = aPtr.next;
    } else {
      tail.next = bPtr;
      bPtr = bPtr.next;
    }
    tail = tail.next;
  }
  tail.next = aPtr != null ? aPtr : bPtr;
  return head.next;
};
