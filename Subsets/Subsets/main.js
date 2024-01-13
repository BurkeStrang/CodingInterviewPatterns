function lstToSetStr(lst) {
  if (lst.length === 0) {
    out = "{}";
    return out;
  }
  var i;
  out = "{";
  for (i = 0; i < lst.length - 1; i++) {
    out += lst[i] + ", ";
  }
  out += lst[i] + "}";
  return out;
}

function twoDLstToSetStr(lst) {
  if (lst.length === 1) {
    out = "[{}]";
    return out;
  }
  out = "[{}, ";
  count1 = 0;
  for (var i = 1; i < lst.length; i++) {
    count2 = 0;
    out += "{";
    for (var j = 0; j < lst[i].length; j++) {
      if (count2 === lst[i].length - 1) {
        out += lst[i][j] + "}";
      } else {
        out += lst[i][j] + ", ";
      }

      count2++;
    }
    count1++;

    if (count1 === lst.length - 1) {
      out += "]";
    } else {
      out += ", ";
    }
  }
  return out;
}

function getBit(num, bit) {
  let temp;
  temp = 1 << bit;
  temp = temp & num;

  if (temp === 0) {
    return 0;
  }

  return 1;
}

function findAllSubsets(nums) {
  let sets = [];

  if (nums.length === 0) {
    return [[]];
  } else {
    let subsetsCount = 2 ** nums.length;
    for (let i = 0; i < subsetsCount; i++) {
      let subset = new Set();
      for (let j = 0; j < nums.length; j++) {
        console.log("this nums", nums[j], getBit(i, j));
        if (getBit(i, j) == 1 && !subset.has(nums[j])) {
          subset.add(nums[j]);
        }
      }
      if (i === 0) {
        sets.push([]);
      } else {
        sets.push(Array.from(subset));
      }
    }
  }
  return sets;
}

// driver code
function main() {
  nums = [[], [2, 5, 7], [1, 2], [1, 2, 3, 4], [7, 3, 1, 5]];

  for (var i = 0; i < nums.length; i++) {
    console.log(i + 1 + ".\tSet:", lstToSetStr(nums[i]));
    subsets = findAllSubsets(nums[i]);
    console.log("\tSubsets:", twoDLstToSetStr(subsets));
    console.log("-".repeat(100));
  }
}

main();
