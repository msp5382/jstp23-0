import firebase from "firebase";
import "firebase/firestore";
const timesTable = [
  "T_M1",
  "T_M2",
  "T_R1",
  "T_R2",
  "T_R3",
  "T_D1",
  "T_D2",
  "T_D3",
  "T_B1",
  "T_B2",
  "T_B3",
  "T_V1",
  "T_V2",
  "T_V3",
  "T_V4",
  "T_V5",
];
export default async () => {
  const db = firebase.firestore();

  const res = await Promise.all(
    timesTable.map((t) => db.collection("quests").doc(t).get())
  );
  return res
    .map((r) => r.data().quests)
    .reduce((p, c, i) => {
      return [...p, ...c];
    }, []);
};

export const fetchQuestByIdAndTime = async (id, time) => {
  const db = firebase.firestore();

  const res = (await db.collection("quests").doc(time).get()).data().quests;

  return res.find((a) => a.id === id);
};
