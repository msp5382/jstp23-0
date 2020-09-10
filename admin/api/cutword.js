var wordcut = require("wordcut");

wordcut.init();
module.exports = (req, res) => {
  console.log(req.body);

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.body !== undefined) {
    res.send(req.body.cut.map((c) => wordcut.cut(c)));
  } else {
    res.send({});
  }
};
