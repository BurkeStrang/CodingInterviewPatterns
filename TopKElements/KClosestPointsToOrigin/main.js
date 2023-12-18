class Point {
  // __init__ will be used to make a Point type object
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // str is used to print the x and y values
  str() {
    let string = "[" + this.x + ", " + this.y + "]";
    return string;
  }

  // distanceFromOrigin calculates the distance using x, y coordinates
  distanceFromOrigin() {
    // ignoring sqrt to calculate the distance
    return this.x * this.x + this.y * this.y;
  }
}
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

// Function used to convert list to string
function printList(lst) {
  out = "[";
  for (var i = 0; i < lst.length - 1; i++) {
    if (lst[i].length == 2) {
      out += lst[i].str() + ", ";
    } else {
      out += lst[i].str() + ", ";
    }
  }

  if (lst[lst.length - 1].length == 2) {
    out += lst[lst.length - 1][1].str() + "]";
  } else {
    out += lst[lst.length - 1].str() + "]";
  }
  return out;
}

function kClosest(points, k) {
  let maxHeap = new MaxHeap(),
    result = [];

  // put first 'k' points in the max heap
  for (var i = 0; i < k; i++) {
    maxHeap.offer([points[i].distanceFromOrigin(), points[i]]);
  }

  // go through the remaining points of the input array, if a point
  // is closer to the origin than the top point of the max-heap, remove
  // the top point from heap and add the point from the input array
  for (var i = k; i < points.length; i++) {
    if (
      points[i].distanceFromOrigin() < maxHeap.peek()[1].distanceFromOrigin()
    ) {
      maxHeap.poll();
      maxHeap.offer([points[i].distanceFromOrigin(), points[i]]);
    }
  }

  for (var i = 0; i < k; i++) {
    let point = maxHeap.poll()[1];
    result.push(point);
  }
  return result;

  // // the heap has 'k' points closest to the origin, return them in a list
  // return maxHeap.data;
}

// Driver code
function main() {
  let pointsOne = [new Point(1, 3), new Point(3, 4), new Point(2, -1)],
    pointsTwo = [
      new Point(1, 3),
      new Point(2, 4),
      new Point(2, -1),
      new Point(-2, 2),
      new Point(5, 3),
      new Point(3, -2),
    ],
    pointsThree = [
      new Point(1, 3),
      new Point(5, 3),
      new Point(3, -2),
      new Point(-2, 2),
    ],
    pointsFour = [
      new Point(2, -1),
      new Point(-2, 2),
      new Point(1, 3),
      new Point(2, 4),
    ],
    pointsFive = [
      new Point(1, 3),
      new Point(2, 4),
      new Point(2, -1),
      new Point(-2, 2),
      new Point(5, 3),
      new Point(3, -2),
      new Point(5, 3),
      new Point(3, -2),
    ],
    kArray = [2, 3, 1, 4, 5],
    points = [pointsOne, pointsTwo, pointsThree, pointsFour, pointsFive];

  for (var i = 0; i < kArray.length; i++) {
    result = kClosest(points[i], kArray[i]);
    console.log(i + 1 + ".\tSet of points:", printList(points[i]));
    console.log("\tk:", kArray[i]);
    console.log(
      "\tHere are the k =",
      kArray[i],
      "points closest to the origin (0, 0):",
      printList(result),
    );
    console.log("-".repeat(100));
  }
}

main();
