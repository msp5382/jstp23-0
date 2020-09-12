import firebase from "firebase";
import "firebase/firestore";
import { getUsersLean } from "./fetchUsers";
import { timeTable } from "./times";
export const getStep = async () => {
  const db = firebase.firestore();
  const { count: now } = (
    await db.collection("gameData").doc("nowQuestCount").get()
  ).data();
  return now;
};

export const setStep = async (step) => {
  const db = firebase.firestore();
  return await db
    .collection("gameData")
    .doc("nowQuestCount")
    .set({ count: parseInt(step) });
};

export const setDate = async (date) => {
  const db = firebase.firestore();
  return await db.collection("gameData").doc("worldTime").set({ date: date });
};

export const getDate = async () => {
  const db = firebase.firestore();
  return (await db.collection("gameData").doc("worldTime").get()).data()?.date;
};

export const cleanAnswer = async () => {
  const db = firebase.firestore();
  const users = await getUsersLean();
  return await Promise.all(
    users.map(({ id }) => {
      return Promise.all([
        db
          .collection("users")
          .doc(id)
          .collection("gameMetaData")
          .doc("quest")
          .delete(),
        db
          .collection("users")
          .doc(id)
          .collection("gameMetaData")
          .doc("quest_answers")
          .delete(),
        db
          .collection("users")
          .doc(id)
          .collection("gameMetaData")
          .doc("answers")
          .delete(),
      ]);
    })
  );
  //https://us-central1-jstp-23-0.cloudfunctions.net/world-data-watch
};

window.cleanAnswer = cleanAnswer;
