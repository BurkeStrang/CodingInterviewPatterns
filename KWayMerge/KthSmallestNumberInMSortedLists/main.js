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

function kSmallestNumber(lists, k) {
    // storing the length of lists to use it in a loop later
    let listLength = lists.length,
        // declaring a min-heap to keep track of smallest elements
        minHeapforKSmallest = new MinHeap()
 
    for (let index = 0; index < listLength; index++) {
        // if there are no elements in the input lists, return []
        if (lists[index].length == 0){
            continue
        } 
            
        // placing the first element of each list in the min-heap
        else 
            minHeapforKSmallest.offer([lists[index][0], index, 0]);
    }

    // set a counter to match if our kth element
    // equals to that counter, return that number
    let numbersChecked = 0,
        smallestNumber = 0,
        listIndex = 0, 
        numIndex = 0;
    
    while (minHeapforKSmallest.size() > 0) {
        // iterating over the elements pushed in our min-heap
        // get the smallest number from top of heap and its corresponding list
        let result = minHeapforKSmallest.poll();
        [smallestNumber, listIndex, numIndex] = result;

        numbersChecked += 1;

        if (numbersChecked == k) 
            break;

        // if there are more elements in list of the top element,
        // add the next element of that list to the min-heap
        if (numIndex + 1 < lists[listIndex].length) {
            minHeapforKSmallest.offer([
                lists[listIndex][numIndex + 1],
                listIndex,
                numIndex + 1,
            ]);
        }
    }

    // return the kth number found in input lists
    return smallestNumber == undefined ? 0 : smallestNumber;
}

// helper function
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
    // multiple inputs for efficient results
    let lists = [[[2, 6, 8], [3,6,10], [5, 8, 11]],
             [[1, 2, 3], [4, 5], [6, 7, 8, 15], [10, 11, 12, 13], [5, 10]],
             [[], [], []],
             [[1, 1, 3, 8], [5, 5, 7, 9], [3, 5, 8, 12]],
             [[5, 8, 9, 17], [], [8, 17, 23, 24]]]

    let k = [5, 50, 7, 4, 8]

    // loop to execute till the length of list k
    for (let i = 0; i < k.length; i++) {
        console.log(
            i + 1 + ".\t Input lists: ",
            print2DArray(lists[i]),
            `\n\t K = ${k[i]}`,
            `\n\t ${k[i]}th smallest number from the given lists is:`,
            kSmallestNumber(lists[i], k[i])
        );
        console.log("-".repeat(100));
    }
}

main();
