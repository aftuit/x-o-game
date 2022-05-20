
let arr1 = [1,2,3,4,5,6];

let arr2 = [
    // [1,2,3],
    [6,4,5],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [1,5,7],
];

function detect(arr1, arr2) {
   return arr2.every(e => arr1.includes(e))
}

let bor = arr2.some(e => detect(arr1, e));

console.log(bor);