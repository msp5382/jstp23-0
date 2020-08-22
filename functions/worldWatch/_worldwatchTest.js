const util = require("util");
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
    return origin - timeFac;
  } else if (action.includes("0")) {
    return origin;
  } else if (action === "+") {
    return origin + timeFac;
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

const buildConsequence = (t) => {
  return (a) => {
    if (a.split(" ")[2] === "กับ") {
      return {
        data: [a.split(" ")[1], a.split(" ")[3]],
        key: a.split(" ")[0],
        time: t,
      };
    } else if (a.split(" ")[2] === "ของข้อ") {
      return {
        data: { choice: a.split(" ")[1], quest: a.split(" ")[3] },
        key: a.split(" ")[0],
        time: t,
      };
    } else {
      return {
        data: a.split(" ")[1],
        key: a.split(" ")[0],
        time: t,
      };
    }
  };
};

(async () => {
  let consequence = [
    {
      time: "T_X1",
      consequence: `
เทคโนโลยี: 0
ความรู้สึก: 0
ประชากร: 0
ไม่เกิดเหตุการณ์ 11 กับ 12`,
    },
    {
      time: "T_X2",
      consequence: `
เทคโนโลยี: 0
ความรู้สึก: 0
ประชากร: 0
ไม่เกิดเหตุการณ์ 11`,
    },
    {
      time: "T_X3",
      consequence: `
เทคโนโลยี: 0
ความรู้สึก: 0
ประชากร: 0
ไม่สามารถเลือกทางเลือกที่ 3 ของข้อ 3 ได้`,
    },
  ];
  let originData = {
    T: 0,
    F: 0,
    P: 0,
  };
  const conSqMap = consequence.map(({ consequence: c, time: t }) => {
    let consq = c.split("\n");
    consq = consq.filter((a) => a !== "");
    consq = consq.map(buildConsequence(t));
    return consq;
  });

  console.log(
    "processing Map :",
    util.inspect(conSqMap, { showHidden: false, depth: null })
  );
  conSqMap.map((c) => {
    c.filter((f) => f.key.includes(":")).map(({ key: k, data: a, time: t }) => {
      originData[transformConsq(k)] = calcConsq(
        originData[transformConsq(k)],
        a,
        t
      );
    });
  });

  console.log("worldValue Res :", originData);
})();
