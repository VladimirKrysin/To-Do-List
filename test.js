var removeDuplicates = function (nums) {
    const numsObj = {}
    for (const num of nums) {
        numsObj[num] = (numsObj[num] || 0) + 1;
    }
    const k = nums.length;
    for (let i = 0; i < k; i++) {
        const elem = nums[i]
        console.log(numsObj, elem)
        if (numsObj[elem] > 1) {
            nums[i] = 101;
            numsObj[elem] -= 1;
        }
    }
    nums.sort((a, b) => a - b)
    return nums.reduce((acc, curr) => {
        if (curr !== 101) {
            acc++;
        }
        return acc
    }, 0)
};
console.log(removeDuplicates([1, 1, 1, 1]))