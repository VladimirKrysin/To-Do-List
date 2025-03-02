/**
 * @param {string} word
 * @return {number}
 */
var addMinimum = function(word) {
    const arr = word.split("")
    let k = 0;
    while(true) {
        let counter = 0;
        for (let i=0; i < arr.length ; i++) {
            if(arr[i] === "a" && arr[i+1] !== "b") {
                arr.splice(i+1,0,"b");
                counter++;
                    k++;
                    break;
            }
            if(arr[i] === "b") {
                if (i === 0) {
                    arr.splice(i,0,"a");
                    counter++;
                    k++;
                    break;
                }
                if(arr[i-1] !== "a") {
                    arr.splice(i-1,0,"a");
                    counter++;
                    k++;
                    break;
                } 
                if(arr[i+1] !== "c") {
                    arr.splice(i+1,0,"c");
                    counter++;
                    k++;
                    break;
                } 
            }

             if(arr[i] === "c") {
                if (i === 0) {
                    arr.splice(i,0,"b");
                    counter++;
                    k++;
                    break;
                }
                if( arr[i-1] && arr[i-1] !== "b") {
                    arr.splice(i-1,0,"b");
                    counter++;
                    k++;
                    break;
                } 
                if(arr[i+1] && arr[i+1] !== "a") {
                    arr.splice(i+1,0,"a");
                    counter++;
                    k++;
                    break;
                } 
            }
        }
        if (counter === 0) {
            break;
        }
    }

    return k
};

console.log(addMinimum("b"))