/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let categories = new Set();
  let answer = {};
  let output = [];

  transactions.forEach(transaction => {
    categories.add(transaction.category);
  });

  transactions.forEach(transaction => {
    if (transaction.category in answer) {
      answer[transaction.category] += transaction.price;
    } else {
      answer[transaction.category] = transaction.price;
    }
  });

  for (var key in answer) {
    output.push(
      {
        'category': key,
        'totalSpent': answer[key]
      }
    );
  }

  return output;
}

module.exports = calculateTotalSpentByCategory;
