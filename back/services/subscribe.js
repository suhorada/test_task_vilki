const tasks = [];

function recieve() {
  tasks.push('a');
  console.log(tasks);
}

function send() {
  console.log(tasks.shift());
}

exports = { recieve, send };

// var keepGoing = true;
// setInterval(function () {
//      if (keepGoing) {
//         //DO YOUR STUFF HERE
//         console.log(i);
//      }
//      //YOU CAN CHANGE 'keepGoing' HERE
//   }, 500);
