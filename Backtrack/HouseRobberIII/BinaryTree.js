import { TreeNode } from "./TreeNode.js";

export class BinaryTree {
  constructor(ListOfNodes) {
    this.root = this.createBinaryTree(ListOfNodes);
  }

  createBinaryTree(ListOfNodes) {
    if (ListOfNodes.length === 0) {
      return null;
    }

    // Create the root node of the binary tree
    const root = new TreeNode(ListOfNodes[0].data);

    // Create a queue and add the root node to it
    const queue = [];
    queue.push(root);

    // Start iterating over the list of ListOfNodes starting from the second node
    let i = 1;
    while (i < ListOfNodes.length) {
      // Get the next node from the queue
      const curr = queue.shift();

      // If the node is not null, create a new TreeNode object for its left child,
      // set it as the left child of the current node, and add it to the queue
      if (ListOfNodes[i] !== null) {
        curr.left = new TreeNode(ListOfNodes[i].data);
        queue.push(curr.left);
      }

      i += 1;

      // If there are more ListOfNodes in the list and the next node is not null,
      // create a new TreeNode object for its right child, set it as the right child
      // of the current node, and add it to the queue
      if (i < ListOfNodes.length && ListOfNodes[i] !== null) {
        curr.right = new TreeNode(ListOfNodes[i].data);
        queue.push(curr.right);
      }

      i += 1;
    }

    // Return the root of the binary tree
    return root;
  }
}
