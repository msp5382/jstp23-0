import firebase from "firebase";
import "firebase/firestore";
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
    .set({ count: step - 1 });
};
