let moment = require('moment');

// let date = moment();
// date.add(1, 'year')
// console.log(date.format('MMMM Do, YYYY'));

//10:35 am
//unpadded for hour
//padded for minute

let time = moment();
console.log(time.format('h:mm a'));
