import firebase from "firebase";
import "firebase/firestore";
import { timeTable } from "./times";
export const fetchQuestAnswer = async () => {
  const db = firebase.firestore();
  const res = await db.collection("users").get();

  let users = [];
  res.forEach((doc) => {
    users.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  console.log(users);
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
  console.log(data);
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
