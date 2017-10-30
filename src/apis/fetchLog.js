const fetchSomething = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, 500);
});

export default fetchSomething;
