/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    let dummy = new ListNode(null)
    dummy.next = head

    let len = 0
    let first = head
    while (first != null) {
        len++
        first = first.next
    }

    len -= n
    first = dummy
    while (len > 0) {
        len--
        first = first.next
    }
    first.next = first.next.next
    return dummy.next
};

var removeNthFromEnd1 = function (head, n) {
    let dummy = new ListNode(0)
    dummy.next = head
    let first = dummy, second = dummy
    for(let i=0;i<n+1;i++) {
        first = first.next
    }
    while(first != null) {
        first = first.next
        second = second.next
    }
    second.next = second.next.next
    return dummy.next
}
