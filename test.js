var intersection = function(nums) {
    const result = []
    const setArray = [];
    for (const elem of nums)
        setArray.push(new Set(elem))
    console.log(setArray);
    
    const intersectionSet = setArray.reduce((acc, currentSet) => {
        console.log(acc);
        
        return acc.intersection(currentSet)
    })

    for (const elem of intersectionSet.values())
        result.push(elem)
    return result.sort((a,b) => a - b)
};

console.log(intersection([[3,1,2,4,5],[1,2,3,4],[3,4,5,6]]));
