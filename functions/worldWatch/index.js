const axios = require("axios");
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAcc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jstp-23-0.firebaseio.com",
});
const db = admin.firestore();

const timeTable = [
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

const fetchQuestAnswer = async () => {
  const res = await db.collection("users").get();

  let users = [];
  res.forEach((doc) => {
    users.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  const data = await Promise.all(
    users.map(async (u) => ({
      answer:
        (
          await db
            .collection("users")
            .doc(u.id)
            .collection("gameMetaData")
            .doc("answers")
            .get()
        ).data() || "NULL",
      quest_answer:
        (
          await db
            .collection("users")
            .doc(u.id)
            .collection("gameMetaData")
            .doc("quest_answers")
            .get()
        ).data() || "NULL",
      id: u.id,
      data: u.data,
    }))
  );
  return parseUserIntoEdiableQuest(data);
};

const parseUserIntoEdiableQuest = (d) => {
  const QuestAnswerAll = d.reduce((p, c) => {
    if (c.answer !== "NULL" && c.quest_answer !== "NULL") {
      return [
        ...p,
        ...Object.keys(c.quest_answer)
          .map((key) => ({ ...c.quest_answer[key], quest_answer_id: key }))
          .map((answer) => ({ ...answer, id: c.id })),
      ];
    } else {
      return p;
    }
  }, []);
  const AnswerAll = d.reduce((p, c) => {
    if (c.answer !== "NULL" && c.answer !== "NULL") {
      return [
        ...p,
        ...Object.keys(c.answer)
          .map((key) => ({ ...c.answer[key], answer_id: key }))
          .map((answer) => ({ ...answer, id: c.id })),
      ];
    } else {
      return p;
    }
  }, []);

  return {
    QuestAnswerAll: QuestAnswerAll,
    AnswerAll: AnswerAll,
  };
};

exports["world-data-watch"] = async (req, res) => {
  const consequence = (await fetchQuestAnswer()).QuestAnswerAll;
  let consq = consequence.split("\n");
  consq = consq.filter((a) => a !== "");
  consq = consq.map((a) => ({ data: a.split(" ")[1], key: a.split(" ")[0] }));

  res.send(consq);
};
