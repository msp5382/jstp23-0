exports.test = (req, res) => res.send(req.body || "wowowow");

exports.run = async (req, res) => {
  const resu = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  res.send(await resu.json());
};
