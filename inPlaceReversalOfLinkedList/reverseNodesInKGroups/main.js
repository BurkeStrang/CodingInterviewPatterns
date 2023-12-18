import printListWithForwardArrow from "./print_list.js";
import LinkedList from "./linked_list.js";
import LinkedListNode from "./linked_list_node.js";
import reverseLinkedList from "./linked_list_reversal.js";

function reverseKGroups(head, k) {

    const dummy = new LinkedListNode(0);
    dummy.next = head;
    let ptr = dummy;

    while (ptr !== null) {

        let tracker = ptr;

        for (let i = 0; i < k; i++) {
            if (tracker === null) {
                break;
            }
            tracker = tracker.next;
        }

        if (tracker === null) {
            break;
        }

        const updatedNodes = reverseLinkedList(ptr.next, k);
        const previous = updatedNodes[0];
        const current = updatedNodes[1];

        const lastNodeOfReversedGroup = ptr.next;
        lastNodeOfReversedGroup.next = current;
        ptr.next = previous;
        ptr = lastNodeOfReversedGroup;        
    }

    return dummy.next;
}

// Driver code
function main() {
    var input_list = [[1, 2, 3, 4, 5, 6, 7, 8], [3, 4, 5, 6, 2, 8, 7, 7], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 7], [1]];
    var k = [3, 2, 1, 7, 1];

    for (var i = 0; i < input_list.length; i++) {
        
        var input_linked_list = new LinkedList();
        input_linked_list.createLinkedList(input_list[i]);

        console.log((i + 1) + ".\tLinked list: ", printListWithForwardArrow(input_linked_list.head));
        console.log("\n");
 
        var result = reverseKGroups(input_linked_list.head, k[i]);
        console.log("\tReversed linked list: ", printListWithForwardArrow(result));

        console.log('-'.repeat(100));
    }
}

main();
