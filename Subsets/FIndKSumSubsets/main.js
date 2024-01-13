var result = [];
function getKSumSubsets(setOfIntegers, targetSum) {
  backtrack(0, targetSum, [], setOfIntegers);
  return result;
}

function backtrack(start, target, path, setOfIntegers) {
  if (target === 0) {
    result.push([...path]);
    return;
  }

  for (let i = start; i < setOfIntegers.length; i++) {
    if (target - setOfIntegers[i] >= 0) {
      path.push(setOfIntegers[i]);
      backtrack(i + 1, target - setOfIntegers[i], path, setOfIntegers);
      path.pop();
    }
  }
}

function printResult(result) {
  for (var i = 0; i < result.length; i++) {
    console.log("\t\t ", result[i].toString());
  }
}

// Driver code
function main() {
  n = [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]];
  target = [5, 6, 3, 10, 15];

  for (var i = 0; i < n.length; i++) {
    console.log("target = " + target[i], n[i]);
    console.log("\t All combinations that equal the target sum: ");

    result = getKSumSubsets(n[i], target[i]);
    printResult(result);

    console.log("-".repeat(100));
  }
}

main();