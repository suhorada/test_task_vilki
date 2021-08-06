const queue = [];

const send = (category, user) => new Promise((resolve) => setTimeout(() => {
  console.log(`Fork ${category} was created, ${user}!`);
  resolve();
}, 1000));

const notify = async () => {
  while (queue.length !== 0) {
    const currentItem = queue[0];
    if (currentItem) {
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(currentItem.users.map((user) => send(currentItem.category, user)));
      queue.shift();
    }
  }
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
