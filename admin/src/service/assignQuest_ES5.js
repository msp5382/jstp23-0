import firebase from "firebase";
import "firebase/firestore";
import { timeTable } from "./times";
import moment from "moment";
export default async () => {
  await upStep();
  console.log(await assignQuestToUser(await getStep(), 0));
  //console.log(await upStep());
};
const upStep = async () => {
  const db = firebase.firestore();
  const { count: now } = (
    await db.collection("gameData").doc("nowQuestCount").get()
  ).data();
  return await db
    .collection("gameData")
    .doc("nowQuestCount")
    .set({ count: now + 1 });
};
const getStep = async () => {
  const db = firebase.firestore();
  const { count: now } = (
    await db.collection("gameData").doc("nowQuestCount").get()
  ).data();
  return now;
};
const getUserWithTime = async () => {
  const db = firebase.firestore();
  const d = (
    await db.collection("gameData").doc("userRoleAssign").get()
  ).data();

  return Object.keys(d).map((key) => ({ user: key, time: d[key] }));
};
const getQuest = async (count) => {
  const db = firebase.firestore();
  return (
    await Promise.all(
      timeTable.map((t) => db.collection("quests").doc(t).get())
    )
  )
    .map((d) => d.data())
    .map((q) => q.quests[count - 1]);
};
const assignQuestToUser = async (questCount, dayTime) => {
  const db = firebase.firestore();
  const users = await getUserWithTime();
  const allQuestAtTime = await getQuest(questCount);
  console.log(questCount, dayTime);
  timeTable.map((t) => {
    const Quests = allQuestAtTime.find((q) => q.time === t);
    users
      .filter((u) => u.time === t)
      .forEach(async (u) => {
        console.log(u);
        await db
          .collection("users")
          .doc(u.user)
          .collection("gameMetaData")
          .doc("quest")
          .set(
            {
              [dayTime]: {
                ...Quests,
                expTime: moment().add(12, "hours").toISOString(),
                location: Math.floor(Math.random() * (6 - 1)) + 1,
              },
            },
            { merge: true }
          );
      });
  });
};
