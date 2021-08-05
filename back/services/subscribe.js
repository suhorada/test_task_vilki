const tasks = [1, 2, 3, 4, 5, 6, 7];

function receive() {
  tasks.push('a');
  console.log(tasks);
}

function send() {
  console.log(tasks.shift());
}

function sender() {
  let run = true;
  setInterval(() => {
    if (run) {
      send();
      if (!tasks.length) {
        run = false;
      }
    }
  }, 1000);
}

// one receive with users array
// receive();
// receive();
// receive();
// receive();
// one receive with users array
// sender();

const queue = (type, array) => new Promise((res) => setTimeout(() => {
  const requests = [];
  while (array.length) {
    setTimeout(() => {
      const temp = array.shift();
      requests.push(new Promise((resolve) => {
        console.log(type, ' to ', temp);
        resolve();
      }));
    }, 1000);
  }
  res();
}, 500));

queue('asd', tasks);

exports = { tasks, receive, send };
