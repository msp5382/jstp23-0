const axios = require("axios");

exports["jstp-23-backend"] = async (req, res) => {
  const resu = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
  res.send(await resu.data);
};
