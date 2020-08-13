const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({ credential: admin.credential.applicationDefault() });
const db = admin.firestore();
exports.myFunction = functions.firestore
  .document("gameData/nowQuestCount")
  .onWrite((change, context) => {
    db.collection("users").doc("");
  });
