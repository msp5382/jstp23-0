exports["jstp-23-backend"] = async (req, res) => {
  const resu = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  res.send(await resu.json());
};
