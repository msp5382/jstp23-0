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

  timeTable.map((t) => {
    const Quests = allQuestAtTime.find((q) => q.time === t);
    users
      .filter((u) => u.time === t)
      .forEach(async (u) => {
        const quests = Object.keys(
          (
            await db
              .collection("users")
              .doc(u.user)
              .collection("gameMetaData")
              .doc("quest")
              .get()
          ).data() ?? []
        ).length;
        console.log(u, { pos: quests + 1 });
        await db
          .collection("users")
          .doc(u.user)
          .collection("gameMetaData")
          .doc("quest")
          .set(
            {
              [quests + 1]: {
                ...Quests,
                expTime: moment().add(12, "hours").toISOString(),
                location: Math.floor(Math.random() * (6 - 1)) + 1,
              },
            },
            { merge: true }
          );
      });
  });
  alert("เรียบร้อย");
};

export const assignQuestToSpecificUser = async (
  questCount,

  userId,
  userTime
) => {
  const db = firebase.firestore();
  const users = [{ user: userId, time: userTime }];
  const allQuestAtTime = await getQuest(questCount);

  const quests = Object.keys(
    (
      await db
        .collection("users")
        .doc(userId)
        .collection("gameMetaData")
        .doc("quest")
        .get()
    ).data() ?? []
  );

  const dayTime = quests.length + 1;
  timeTable.map((t) => {
    const Quests = allQuestAtTime.find((q) => q.time === t);
    users
      .filter((u) => u.time === t)
      .forEach(async (u) => {
        console.log(u, { pos: dayTime });
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
    return;
  });
};

export const getUserLastQuest = async (uid) => {
  const res = await this.db
    .collection("users")
    .doc(uid ?? this.uid)
    .collection("gameMetaData")
    .get();
  let col = [];

  res.forEach((d) => {
    col.push({ ...d.data(), id: d.id });
  });
  const QuestData = col.find((d) => d.id === "quest");
  const QuestAnswer = col.find((d) => d.id === "answers") || [];
  const Answers = Object.values(QuestAnswer)
    .filter((a) => a !== "answers")
    .map((a) => a.answerFor);
  console.log(
    "RawQuests",
    Object.values(QuestData)
      .filter((d) => d !== "quest")
      .sort((a, b) => parseInt(a.id) - parseInt(b.id))
      .map((a) => ({ ...a, v: moment(a.expTime).fromNow() }))
  );
  return Object.values(QuestData)
    .filter((d) => d !== "quest")
    .filter((d) => new Date(d.expTime) > Date.now());
};
