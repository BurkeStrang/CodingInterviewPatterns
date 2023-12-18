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
            if (
                this.compareVal(
                    this.data[index][0],
                    this.data[parentIndex][0]
                ) < 0
            ) {
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
                this.compareVal(
                    this.data[leftIndex][0],
                    this.data[findIndex][0]
                ) < 0
            ) {
                findIndex = leftIndex;
            }

            if (
                rightIndex <= lastIndex &&
                this.compareVal(
                    this.data[rightIndex][0],
                    this.data[findIndex][0]
                ) < 0
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

function kSmallestPairs(list1, list2, k) {
    let listLength = list1.length;
    let minHeapForPairs = new MinHeap();
    let pairs = [];
    for (let i = 0; i < Math.min(k, listLength); i++) {
        minHeapForPairs.offer([list1[i] + list2[0], i, 0]);
    }

    let counter = 1;

    while (minHeapForPairs.size() > 0 && counter <= k) {
        let [sumOfPairs, i, j] = minHeapForPairs.poll();
        pairs.push([list1[i], list2[j]]);
        let nextElement = j + 1;

        if (list2.length > nextElement) {
            minHeapForPairs.offer([list1[i] + list2[nextElement], i, nextElement]);
        }
        counter++;
    }
    return pairs;
}

// Helper function
function print2DArray(arr) {
    let result = "[";
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] == "object") {
            result += print2DArray(arr[i]);
        } else {
            result += arr[i];
        }
        if (i != arr.length - 1) result += ", ";
    }
    return (result += "]");
}

// Driver code
function main() {
    let list1 = [
            [2, 8, 9],
            [1, 2, 300],
            [1, 1, 2],
            [4, 6],
            [4, 7, 9],
            [1, 1, 2],
        ],

        list2 = [
            [1, 3, 6],
            [1, 11, 20, 35, 300],
            [1, 2, 3],
            [2, 3],
            [4, 7, 9],
            [1],
        ],
        k = [9, 30, 1, 2, 5, 4];

    for (let i = 0; i < k.length; i++) {
        console.log(i + 1 + `.\t Input pairs: ${print2DArray(list1[i])}, ${print2DArray(list2[i])} \n\t k = ${k[i]}`);
        console.log(
            "\t Pairs with the smallest sum are:",
            print2DArray(kSmallestPairs(list1[i], list2[i], k[i]))
        );
        console.log("-".repeat(100));
    }
}

main()
