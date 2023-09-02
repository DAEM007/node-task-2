const async = require('async');

// array of data items
const numbers = [1, 3, 5, 6, 3];

// function to process each item with a 1-second delay
function processItem(item, callback) {
  setTimeout(() => {
    const result = item * 2;
    callback(null, result);
  }, 1000);
};

// Processing data and handling errors
async.mapSeries(numbers, processItem, (err, results) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Processed results:', results);
  }
});
