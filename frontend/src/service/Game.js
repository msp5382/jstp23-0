import firebase from "firebase";
import "firebase/firestore";
import UserProfile from "../service/UserProfile";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
export default class Game {
  constructor() {
    this.db = firebase.firestore();
    this.profile = new UserProfile();
    this.uid = this.profile.getUser().uid;

    window.getMyQuest = this.getMyQuest;
  }

  getMyQuest = async (uid, all) => {
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
    if (all) {
      return Object.values(QuestData)
        .filter((d) => d !== "quest")
        .filter((d) => new Date(d.expTime) > Date.now());
    } else {
      return Object.values(QuestData)
        .filter((d) => d !== "quest")
        .filter((d) => {
          console.log(d, new Date(d.expTime) >= Date.now());
          return new Date(d.expTime) >= Date.now();
        })
        .filter((d) => {
          const res = !Answers.includes(d.id);
          console.log(res, d);
          return res;
        });
    }
  };

  getMyMeta = async () => {
    const res = await this.db
      .collection("users")
      .doc(this.uid)
      .collection("gameMetaData")
      .get();
    let col = [];
    res.forEach((d) => {
      col.push({ ...d.data(), id: d.id });
    });
    return col.find((d) => d.id === "meta");
  };
  getQuest = async (questId) => {
    const res = await this.db
      .collection("users")
      .doc(this.uid)
      .collection("gameMetaData")
      .get();
    let col = [];

    res.forEach((d) => {
      col.push({ ...d.data(), id: d.id });
    });
    const QuestData = col.find((d) => d.id === "quest");
    console.log(
      "QuestData",
      Object.values(QuestData).filter((d) => d !== "quest")
    );
    return Object.values(QuestData)
      .filter((d) => d !== "quest")
      .find((d) => d.id === questId);
  };

  setUserSelectedChoice = async (questId, time, choiceSelect, consequence) => {
    const generatedId = uuidv4();
    const res = await this.db
      .collection("users")
      .doc(this.uid)
      .collection("gameMetaData")
      .doc("answers")
      .set(
        {
          [generatedId]: {
            answerFor: questId,
            time: time,
            choiceSelected: choiceSelect,
            consequence: consequence || "SYSTEM ASSIGNED",
            timeStamp: Date.now(),
          },
        },
        { merge: true }
      );
    console.log(res);
    return;
  };
  addContentToQuestAnswer = (file) => {
    console.log(file);
    return new Promise((sol, ject) => {
      const generatedId = uuidv4();
      const ref = firebase.storage().ref("/answer").child(generatedId);
      ref.put(file).then((d) => {
        firebase
          .storage()
          .ref("/answer")
          .child(generatedId)
          .getDownloadURL()
          .then((url) => {
            sol(url);
          });
      });
    });
  };
  submitQuestAnswer = async (answerText, attatchFile, questId, time) => {
    const generatedId = uuidv4();
    const res = await this.db
      .collection("users")
      .doc(this.uid)
      .collection("gameMetaData")
      .doc("quest_answers")
      .set(
        {
          [generatedId]: {
            quest_answerFor: questId,
            time: time,
            answerText: answerText,
            attatchFile: attatchFile,
            timeStamp: Date.now(),
          },
        },
        { merge: true }
      );

    return;
  };
  listenToWorldData = (cb) => {
    this.db
      .collection("gameData")
      .doc("worldData")
      .onSnapshot(function (doc) {
        cb(doc.data());
      });
  };

  getWorldTime = async () => {
    const data = (
      await this.db.collection("gameData").doc("worldTime").get()
    ).data();
    console.log(data);
    return parseInt(data.date) ?? 0;
  };
}
