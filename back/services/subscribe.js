const queue = [];

const send = (category, user) => new Promise((resolve) => setTimeout(() => {
  console.log(`Fork ${category} was created, ${user}!`);
  resolve();
}, 1000));

const notify = async () => {
  const currentItem = queue[0];
  if (currentItem) {
    await Promise.all(currentItem.users.map((user) => send(currentItem.category, user)));
    queue.shift();
  }
  if (queue.length !== 0) notify();
};

const addForMailing = (category, users) => {
  queue.push({
    category,
    users,
  });
  if (queue.length === 1) {
    notify();
  }
};

module.exports = addForMailing;
