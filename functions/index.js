const axios = require("axios");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAcc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jstp-23-0.firebaseio.com",
});
const db = admin.firestore();

exports["jstp-23-backend"] = async (req, res) => {
  const resu = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
  res.send(await resu.data);
};
