exports.test = (req, res) => res.send(req.body || "wowowow");

exports.run = async (req, res) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  res.send(await res.json());
};
