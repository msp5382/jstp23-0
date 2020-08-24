const axios = require("axios");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAcc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jstp-23-0.firebaseio.com",
});
const db = admin.firestore();
exports["world-time-increaser"] = async (req, res) => {
  const origin =
    (await db.collection("gameData").doc("worldTime").get()).data().date || "0";
  db.collection("gameData")
    .doc("worldTime")
    .set({
      date: (parseInt(origin) + 1).toString(),
    });
  res.send({
    success: true,
  });
};
