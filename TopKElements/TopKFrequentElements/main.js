function printList(lst) {
  output = "[";
  var i = 0;
  for (i = 0; i < lst.length - 1; i++) {
    output += lst[i] + ", ";
  }
  output += lst[i] + "]";
  return output;
}

class MinHeap {
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
      if (this.compareVal(this.data[index][0], this.data[parentIndex][0]) < 0) {
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
        this.compareVal(this.data[leftIndex][0], this.data[findIndex][0]) < 0
      ) {
        findIndex = leftIndex;
      }

      if (
        rightIndex <= lastIndex &&
        this.compareVal(this.data[rightIndex][0], this.data[findIndex][0]) < 0
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
function topKFrequent(arr, k) {
  const countMap = new Map();
  const minHeap = new MinHeap();

  // Count element frequencies by setting in map
  for (const num of arr) {
    countMap.set(num, (countMap.get(num) ?? 0) + 1);
    console.log(countMap);
  }

  //  if we do not have k elements in the min heap yet
  //  add them until we do
  //  if less than the current min then pop the current min
  //  and put the new value in the min heap
  for (let [value, count] of countMap) {
    if (minHeap.size() < k) {
      minHeap.offer([count, value]);
    } else if (minHeap.peek()[0] < count) {
      minHeap.poll();
      minHeap.offer([count, value]);
    }
  }

  // Should only be the top
  // k values so get all of them
  const res = [];
  while (minHeap.size() > 0) {
    res.push(minHeap.poll()[1]);
  }

  return res;
}

// Driver code
function main() {
  arr = [
    [1, 3, 5, 12, 11, 12, 11, 12, 5],
    [1, 3, 5, 14, 18, 14, 5],
    [2, 3, 4, 5, 6, 7, 7],
    [2, 4, 3, 2, 3, 4, 5, 4, 4, 4],
    [1, 1, 1, 1, 1, 1],
    [2, 3],
  ];
  k = [3, 2, 1, 3, 1, 2];
  for (var i = 0; i < k.length; i++) {
    console.log(i + 1 + ".\tInput:(" + printList(arr[i]) + ",", k[i] + ")");
    console.log(
      "\tTop",
      k[i],
      "frequent Elements:",
      printList(topKFrequent(arr[i], k[i])),
    );
    console.log("-".repeat(100));
  }
}

main();
