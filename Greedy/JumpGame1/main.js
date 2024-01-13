function jumpGame(nums){
    let targetNumIndex = nums.length - 1;
    for(let i = nums.length - 2; i >= 0; i--){
        if(i + nums[i] >= targetNumIndex){
            targetNumIndex = i;
        }
    }
    return targetNumIndex === 0;
}


function runTestCase(nums, expected_result) {
    const result = jumpGame(nums);
    console.log(`Input: [${nums}]`);
    console.log(`Expected Result: ${expected_result}`);
    console.log(`Actual Result: ${result}`);
    console.log(result === expected_result ? "Pass" : "Fail");
    console.log("\n");
}

runTestCase([3,2,1,0,4], false);