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

export const copyAnswer = async () => {
  const db = firebase.firestore();
  const users = await getUsersLean();
  return await Promise.all(
    users.map(({ id }) => {
      return Promise.all([
        db
          .collection("users")
          .doc(id)
          .collection("gameMetaData")
          .doc("quest_answers")
          .get(),
        db
          .collection("users")
          .doc(id)
          .collection("gameMetaData")
          .doc("answers")
          .get(),
      ]);
    })
  );
  //https://us-central1-jstp-23-0.cloudfunctions.net/world-data-watch
};

export const cleanQuest = async () => {
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
      ]);
    })
  );
  //https://us-central1-jstp-23-0.cloudfunctions.net/world-data-watch
};

export const viewQuest = async () => {
  const db = firebase.firestore();
  const users = await getUsersLean();
  return (
    await Promise.all(
      users.map(({ id }) => {
        return new Promise(async (res, rej) => {
          const a = await db
            .collection("users")
            .doc(id)
            .collection("gameMetaData")
            .doc("quest")
            .get();
          res({
            data: a,
            id: id,
          });
        });
      })
    )
  ).map(({ data, id }) => ({ data: data.data(), id: id }));
  //https://us-central1-jstp-23-0.cloudfunctions.net/world-data-watch
};

const manageQuest = async () => {
  const db = firebase.firestore();

  const data = await viewQuest();
  return await Promise.all(
    data.map(({ data, id }) => {
      if (data != undefined) {
        const Q = Object.keys(data).map((k) => data[k]);
        const fin = Q.filter(
          (_v, _i, _a) => _a.findIndex((t) => t.id === _v.id) === _i
        );
        let Out = {};
        fin.map((x, i) => (Out[i] = x));
        return db
          .collection("users")
          .doc(id)
          .collection("gameMetaData")
          .doc("quest")
          .set(Out);
      }
    })
  );
};

const removeQuest = async (ReqID) => {
  const db = firebase.firestore();

  const data = await viewQuest();
  return await Promise.all(
    data.map(({ data, id }) => {
      if (data != undefined) {
        const Q = Object.keys(data).map((k) => data[k]);
        const fin = Q.filter(
          (_v, _i, _a) => _a.findIndex((t) => t.id === _v.id) === _i
        ).filter(({ id }) => id != ReqID);
        let Out = {};
        fin.map((x, i) => (Out[i] = x));
        return db
          .collection("users")
          .doc(id)
          .collection("gameMetaData")
          .doc("quest")
          .set(Out);
      }
    })
  );
};

window.cleanAnswer = cleanAnswer;
window.copyAnswer = copyAnswer;
window.cleanQuest = cleanQuest;
window.viewQuest = viewQuest;
window.manageQuest = manageQuest;
window.removeQuest = removeQuest;
