import { TreeNode } from "./TreeNode.js";
import { BinaryTree } from "./BinaryTree.js";

function rob(root) {
  const result = heist(root);
  return Math.max(result[0], result[1]);
}

function heist(root) {
  if (root === null) {
    return [0, 0];
  }
  const leftSubtree = heist(root.left);
  const rightSubtree = heist(root.right);
  const includeRoot = root.data + leftSubtree[1] + rightSubtree[1];
  const excludeRoot =
    Math.max(leftSubtree[0], leftSubtree[1]) +
    Math.max(rightSubtree[0], rightSubtree[1]);

  return [includeRoot, excludeRoot];
}

function main() {
  const listOfTrees = [
    [
      new TreeNode(10),
      new TreeNode(9),
      new TreeNode(20),
      new TreeNode(15),
      new TreeNode(7),
    ],
    [
      new TreeNode(7),
      new TreeNode(9),
      new TreeNode(10),
      new TreeNode(15),
      new TreeNode(20),
    ],
    [
      new TreeNode(8),
      new TreeNode(2),
      new TreeNode(17),
      new TreeNode(1),
      new TreeNode(4),
      new TreeNode(19),
      new TreeNode(5),
    ],
    [
      new TreeNode(7),
      new TreeNode(3),
      new TreeNode(4),
      new TreeNode(1),
      new TreeNode(3),
    ],
    [
      new TreeNode(9),
      new TreeNode(5),
      new TreeNode(7),
      new TreeNode(1),
      new TreeNode(3),
    ],
    [
      new TreeNode(9),
      new TreeNode(7),
      null,
      null,
      new TreeNode(1),
      new TreeNode(8),
      new TreeNode(10),
      null,
      new TreeNode(12),
    ],
  ];

  function displayTree(root) {
    if (root === null) {
      return;
    }
    displayTree(root.left);
    console.log(root.data);
    displayTree(root.right);
  }

  const inputTrees = [];
  listOfTrees.forEach((listOfNodes) => {
    const tree = new BinaryTree(listOfNodes);
    inputTrees.push(tree);
  });

  let x = 1;
  inputTrees.forEach((tree) => {
    console.log(`${x}. Input Tree:`);
    displayTree(tree.root);
    x += 1;
    console.log(
      "\tMaximum amount we can rob without getting caught:",
      rob(tree.root),
    );
    console.log("-".repeat(100));
  });
}

main();
