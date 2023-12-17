/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let max_num = -9999999999;
    
    numbers.forEach(num => {
        if (max_num < num) {
            max_num = num;
        }
    });

    if (max_num == -9999999999) {
        return undefined;
    }
    
    return max_num;
}

module.exports = findLargestElement;