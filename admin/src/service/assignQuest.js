import firebase from "firebase";
import "firebase/firestore";
import { timeTable } from "./times";
import moment from "moment";

export default async () => {
  await upStep();
  await upPosition();
  console.log(await assignQuestToUser(await getStep(), await getPosition()));
};
const upStep = async () => {
  const db = firebase.firestore();
  const { count: now } = (
    await db.collection("gameData").doc("nowQuestCount").get()
  ).data() ?? { count: 0 };
  return await db
    .collection("gameData")
    .doc("nowQuestCount")
    .set({ count: parseInt(now) + 1 });
};

const getStep = async () => {
  const db = firebase.firestore();
  const { count: now } = (
    await db.collection("gameData").doc("nowQuestCount").get()
  ).data() ?? { count: 0 };
  return now;
};

const getPosition = async () => {
  const db = firebase.firestore();
  const { count: now } = (
    await db.collection("gameData").doc("nowQuestPosition").get()
  ).data() ?? { count: 0 };
  return now;
};

const upPosition = async () => {
  const db = firebase.firestore();
  const { count: now } = (
    await db.collection("gameData").doc("nowQuestPosition").get()
  ).data() ?? { count: 0 };
  // let plus;
  // if (parseInt(now) < 3) {
  //   plus = parseInt(now) + 1;
  // } else if (parseInt(now) >= 3) {
  //   plus = 0;
  // }
  let plus = parseInt(now) + 1;
  return await db
    .collection("gameData")
    .doc("nowQuestPosition")
    .set({ count: plus });
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
                expTime: moment().add(8, "hours").toISOString(),
                location: Math.floor(Math.random() * (6 - 1)) + 1,
              },
            },
            { merge: true }
          );
      });
  });
};

export const assignQuestToSpecificUser = async (
  questCount,

  userId,
  userTime
) => {
  const db = firebase.firestore();
  const users = [{ user: userId, time: userTime }];
  const allQuestAtTime = await getQuest(questCount);
  const dayTime = (await getPosition()) + 1;
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
                expTime: moment().add(6, "hours").toISOString(),
                location: Math.floor(Math.random() * (6 - 1)) + 1,
              },
            },
            { merge: true }
          );
      });
  });
};
