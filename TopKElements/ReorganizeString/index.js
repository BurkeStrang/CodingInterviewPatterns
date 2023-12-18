class MaxHeap {
  constructor(data = new Array()) {
    this.data = data;
    this.compareVal = (a, b) => a - b;
    this.heapify();
  }

  heapify() {
    if (this.size() < 2) {
      return;
    }
    for (let i = 1; i < this.size(); i++) {
      this.percolateUp(i);
    }
  }

  peek() {
    if (this.size() === 0) {
      return null;
    }
    return this.data[0];
  }

  offer(value) {
    this.data.push(value);
    this.percolateUp(this.size() - 1);
  }

  poll() {
    if (this.size() === 0) {
      return null;
    }
    const result = this.data[0];
    const last = this.data.pop();
    if (this.size() !== 0) {
      this.data[0] = last;
      this.percolateDown(0);
    }
    return result;
  }

  percolateUp(index) {
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      if (this.compareVal(this.data[index][0], this.data[parentIndex][0]) > 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  percolateDown(index) {
    const lastIndex = this.size() - 1;
    while (true) {
      const leftIndex = index * 2 + 1;
      const rightIndex = index * 2 + 2;
      let findIndex = index;

      if (
        leftIndex <= lastIndex &&
        this.compareVal(this.data[leftIndex][0], this.data[findIndex][0]) > 0
      ) {
        findIndex = leftIndex;
      }

      if (
        rightIndex <= lastIndex &&
        this.compareVal(this.data[rightIndex][0], this.data[findIndex][0]) > 0
      ) {
        findIndex = rightIndex;
      }

      if (index !== findIndex) {
        this.swap(index, findIndex);
        index = findIndex;
      } else {
        break;
      }
    }
  }

  swap(index1, index2) {
    [this.data[index1], this.data[index2]] = [
      this.data[index2],
      this.data[index1],
    ];
  }

  size() {
    return this.data.length;
  }
}

function reorganizeString(str) {
  let charCounter = {};
  for (let i = 0; i < str.length; i++) {
    charCounter[str[i]] = charCounter[str[i]] ? charCounter[str[i]] + 1 : 1;
  }

  let mostFreqChars = new MaxHeap();

  for (let char in charCounter) {
    mostFreqChars.offer([charCounter[char], char]);
  }

  let previous = null,
    result = "";

  while (mostFreqChars.size() || previous) {
    if (previous && mostFreqChars.size() == 0) {
      return "";
    }

    let element = mostFreqChars.poll(),
      count = element[0],
      char = element[1];
    result = result + char;
    count = count - 1;

    if (previous != null) {
      mostFreqChars.offer(previous);
      previous = null;
    }

    if (count !== 0) {
      previous = [count, char];
    }
  }

  return result;
}

// Driver code
function main() {
  testCases = [
    "programming",
    "hello",
    "fofjjb",
    "abbacdde",
    "aba",
    "",
    "awesome",
    "aaab",
  ];
  for (var i = 0; i < testCases.length; i++) {
    console.log(i + 1 + ".\tInput string:", '"' + testCases[i] + '"');
    console.log(
      "\tReorganized string:",
      '"' + reorganizeString(testCases[i]) + '"',
    );
    console.log("-".repeat(100));
  }
}

main();
