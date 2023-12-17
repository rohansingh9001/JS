/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';
  str = str.toLowerCase();
  let palindrome = true;

  var resultString = str.replace(/[^a-z]/g, '');
  for (var i = 0; i < resultString.length; i++) {
    if (resultString[i] != resultString[resultString.length - 1 - i]) {
      palindrome = false;
    }
  }
  return palindrome;
}

module.exports = isPalindrome;
