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
class KthLargest {
    // Constructor to initialize heap and add values in it
    constructor(k, nums) {
        this.topKHeap = new MinHeap();
        this.k = k;

        for (const element of nums) {
            this.add(element);
        }
    }

    // Adds element in the heap and return the Kth largest
    add(val) {
        if (this.topKHeap.size() < this.k) {
            this.topKHeap.offer(val);
        } else if (val > this.topKHeap.peek()) {
            this.topKHeap.poll();
            this.topKHeap.offer(val);
        }

        return this.topKHeap.peek();
    }
}

function main() {
    const nums = [3, 6, 9, 10];
    const temp = [3, 6, 9, 10];
    console.log("Initial stream: [" + nums + "]");
    console.log("k: " + 3);
    const kLargest = new KthLargest(3, nums);
    const val = [4, 7, 10, 8, 15];
    for (let i = 0; i < val.length; i++) {
        console.log("\tAdding a new number " + val[i] + " to the stream");
        temp.push(val[i]);
        console.log("\tNumber stream: [" + temp + "]");
        console.log("\tKth largest element in the stream: " + kLargest.add(val[i]));
        console.log("-".repeat(100));
    }
}


main();
