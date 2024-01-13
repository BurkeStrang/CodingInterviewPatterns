export default function reverseLinkedList(head, k) {
    
    let previous = null;
    let current = head;
    let next = null;

    for (let i = 0; i < k; i++) {
        // temporarily store the next node
        next = current.next;
        // reverse the current node
        current.next = previous;
        // before we move to the next node, point previous to the current node
        previous = current;
        // move to the next node
        current = next;
    }

    console.log("\t\tPointers after reversing k = " + k + " elements:");
    console.log("\t\t\tcurrent: " + (current ? current.data.toString() : "null"));
    console.log("\t\t\tnext: " + (next ? next.data.toString() : "null"));
    console.log("\t\t\tprevious: " + (previous ? previous.data.toString() : "null"));

    return [previous, current];
}
