function rescueBoats(people,limit){
    let count = 0;
    people.sort(function(a, b) {
        return a - b;
    });

    let left = 0;
    let right = people.length - 1;

    while (left <= right) {
        if (people[left] + people[right] <= limit) {
            left++;
        }
        right--;
        count++;
    }

    return count;
}

function runTestCase(people, limit, expected_result) {
    const result = rescueBoats(people, limit);
    console.log(`Input: [${people}], ${limit}`);
    console.log(`Expected Result: ${expected_result}`);
    console.log(`Actual Result: ${result}`);
    console.log(result === expected_result ? "Pass" : "Fail");
    console.log("\n");
}

runTestCase([1,2], 3, 1);
runTestCase([3,2,2,1], 3, 3);
runTestCase([3,5,3,4], 5, 4);