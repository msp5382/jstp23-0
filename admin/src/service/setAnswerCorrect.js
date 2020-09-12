import firebase from "firebase";
import "firebase/firestore";
export default async (id, isPass, data) => {
  const db = firebase.firestore();
  return await db
    .collection("gameData")
    .doc("AnswerMark")
    .set(
      {
        [id]: { ...data, isPass: isPass },
      },
      { merge: true }
    );
};

export const readAnswerSet = async () => {
  const db = firebase.firestore();
  const k =
    (await db.collection("gameData").doc("AnswerMark").get()).data() ?? [];
  console.log(k);
  return Object.keys(k);
};

export const readAnswerSetRealTime = async (cb) => {
  const db = firebase.firestore();
  await db
    .collection("gameData")
    .doc("AnswerMark")
    .onSnapshot(async (doc) => {
      cb(Object.keys(doc.data()));
    });
};
