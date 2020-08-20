const axios = require("axios");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAcc.json");

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

const transformConsq = (consq) => {
  switch (consq) {
    case "เทคโนโลยี:":
      return "T";
      break;
    case "ความรู้สึก:":
      return "F";
      break;
    case "ประชากร:":
      return "P";
      break;
    default:
      return;
      break;
  }
};

const calcConsq = (origin, action, time) => {
  let timeFac = 1;

  if (time.includes("M")) {
    timeFac = 11;
  } else if (time.includes("R")) {
    timeFac = 5;
  } else if (time.includes("D")) {
    timeFac = 3;
  } else if (time.includes("B")) {
    timeFac = 2;
  } else if (time.includes("V")) {
    timeFac = 1;
  }

  if (action === "-") {
    return origin - 1 * timeFac;
  } else if (action === "0") {
    return origin;
  } else if (action === "+") {
    return origin + 1 * timeFac;
  }
};

const loadOrigin = async () => {
  let origin = (await db.collection("gameData").doc("worldData").get()).data();
  if (!origin) {
    origin = {
      T: 0,
      F: 0,
      P: 0,
    };
  }
  const dataKey = { "เทคโนโลยี:": "T", "ความรู้สึก:": "F", "ประชากร:": "P" };
  return {
    T: origin["T"] || 0,
    F: origin["F"] || 0,
    P: origin["P"] || 0,
  };
};

exports["world-data-watch"] = async (req, res) => {
  let originData = await loadOrigin();
  let consequence = (await fetchQuestAnswer()).AnswerAll;
  console.log(consequence);
  const conSqMap = consequence.map(({ consequence: c, time: t }) => {
    let consq = c.split("\n");
    consq = consq.filter((a) => a !== "");
    consq = consq.map((a) => ({
      data: a.split(" ")[1],
      key: a.split(" ")[0],
      time: t,
    }));
    return consq;
  });
  conSqMap.map((c) => {
    c.filter((f) => f.key.includes(":")).map(({ key: k, data: a, time: t }) => {
      console.log(k, a, t);
      console.log(transformConsq(k));
      originData[transformConsq(k)] = calcConsq(
        originData[transformConsq(k)],
        a,
        t
      );
    });
  });
  //console.log(await db.collection("gameData").doc("worldData").set(originData));

  res.send(originData);
};
