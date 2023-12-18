import LinkedList from "./linked_list.js";
import LinkedListNode from "./linked_list_node.js";
import printListWithForwardArrow from "./print_list.js";

export function reorderList(head) {
    if (!head || !head.next) {
        return head;
    }

    // Find the middle node
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }

    // Reverse the second half of the linked list
    let reversedSecondHalf = reverseLinkedList(slow);

    // Merge the first and reversed second half
    let mergedList = new LinkedListNode(); // Assuming you have a LinkedListNode class
    let current = mergedList;
    while (head && reversedSecondHalf) {
        current.next = new LinkedListNode(head.data);
        current = current.next;
        head = head.next;

        if (reversedSecondHalf.next) {
            // If reversedSecondHalf is not at the last node, add its data to mergedList
            current.next = new LinkedListNode(reversedSecondHalf.data);
            current = current.next;
            reversedSecondHalf = reversedSecondHalf.next;
        }
    }

    return mergedList.next; // Return the head of the merged list
}

function reverseLinkedList(head) {
    let previous = null;
    let current = head;
    let next = null;

    while (current) {
        next = current.next;
        current.next = previous;
        previous = current;
        current = next;
    }

    return previous; // Return the new head of the reversed list
}
function main() {
    let inputList = [
        [1, 1, 2, 2, 3, -1, 10, 12],
        [10, 20, -22, 21, -12],
        [1, 1, 1],
        [-2, -5, -6, 0, -1, -4],
        [3, 1, 5, 7, -4, -2, -1, -6]
    ];
    
    inputList.map((inp, i) => {
        // creating linked list
        let obj = new LinkedList();
        obj.createLinkedList(inp);

        // Displaying original linked list
        console.log(i + 1 + ".\tOriginal list:", printListWithForwardArrow(obj.head));

        // Calling the reorderList function
        let result = reorderList(obj.head);

        // Displaying modified linked list
        console.log("\tAfter folding:", printListWithForwardArrow(result));
        if (i != inputList.length - 1)
            console.log("-".repeat(100));
    });
}

main()
