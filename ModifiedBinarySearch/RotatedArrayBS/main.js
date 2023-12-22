function binarySearch(nums, low, high, target) {
    if (low > high) return -1;
    let mid = low + Math.floor((high - low) / 2);
    if (nums[mid] == target) return mid;

    if (nums[low] <= nums[mid]) {
        if (nums[low] <= target && target < nums[mid]) {
            return binarySearch(nums, low, mid - 1, target);
        }
        return binarySearch(nums, mid + 1, high, target);
    }
    else {
        if (nums[mid] < target && target <= nums[high]) {
            return binarySearch(nums, mid + 1, high, target);
        } 
        return binarySearch(nums, low, mid - 1, target);
    }
}

function binarySearchRotated(nums, target){
    
    return binarySearch(nums, 0, nums.length-1, target)
}

// Driver code
function main() {
    let numsList = [[5, 6, 7, 1, 2, 3, 4],
                 [40, 50, 60, 10, 20, 30],
                 [47, 58, 69, 72, 83, 94, 12, 24, 35], 
                 [77, 82, 99, 105, 5, 13, 28, 41, 56, 63], 
                 [48, 52, 57, 62, 68, 72, 5, 7, 12, 17, 21, 28, 33, 37, 41]];

    let targetList = [1, 50, 12, 56, 5];

    for (let i = 0; i < targetList.length; i++) {
        console.log(
            i + 1 + ".\tSorted array: ",
            numsList[i],
            "\n\ttarget",
            targetList[i],
            "found at index ",
            binarySearchRotated(numsList[i], targetList[i])
        );
        console.log("-".repeat(100));
    }
}

main();
