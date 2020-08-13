import firebase from "firebase";
import "firebase/firestore";
import util from "util";
import axios from "axios";
import { timeTableTranslate, timeTable } from "./times";
export default async () => {
  const data = await getAllQuestData();
  console.log(data);
  putToFirebase(data);
};

const putToFirebase = async (d) => {
  timeTable.forEach((t) => {
    if (
      util.inspect(d[t], { showHidden: false, depth: 10 }).includes("undefined")
    ) {
      alert("ข้อมูลผิดพลาดในยุค" + t);
      console.log(util.inspect(d[t], { showHidden: false, depth: 10 }));
    } else {
      console.log("inspecting:", t, "   status: Good");
    }
  });

  try {
    await timeTable.map((t) =>
      firebase.firestore().collection("quests").doc(t).set({ quests: d[t] })
    );
  } catch (error) {
    console.error(error);
  }
};

const parseChoice = (choiceString) => {
  if (choiceString !== undefined) {
    return {
      choiceText: choiceString.split("ค่าสเตตัส")[0],
      consequnce: choiceString.split("ค่าสเตตัส")[1],
    };
  } else {
    return null;
  }
};

const parseEvent = (event) => {
  if (event !== undefined) {
    if (event.split("")[0] === "*") {
      return {
        event: event
          .split("")
          .slice(1, event.split("").length - 1)
          .join(""),
        startWithChoice: true,
      };
    } else {
      return { event: event };
    }
  } else {
    return { event: "ยังไม่กำหนด" };
  }
};

const getAllQuestData = async () => {
  let out = {};
  const data = await Promise.all(timeTable.map((t) => getSheetData(1, 21, t)));
  console.log(data);
  data.map(
    (time, i) =>
      (out[timeTable[i]] = time.values.map((q) => ({
        id: q[0] || "ยังไม่กำหนด",
        time: timeTable[i],
        quest: q[1] || "ยังไม่กำหนด",
        ...parseEvent(q[2]),
        choice: [
          parseChoice(q[3]) || "ยังไม่กำหนด",
          parseChoice(q[4]) || "ยังไม่กำหนด",
          parseChoice(q[5]) || "ยังไม่กำหนด",
        ],
      })))
  );
  return out;
};
const getSheetData = async (rowStart, rowEnd, time) => {
  const range = `A${rowStart}:F${rowEnd}`;

  console.log("Access Database at", timeTableTranslate[time] + "!" + range);
  try {
    const { data: result } = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/1lVZLx0x1lfLOO5p_9pAxqRyFtobpB1HI6YuAvRazzJI/values/${
        timeTableTranslate[time] + "!" + range
      }?key=AIzaSyCXv1-O5QjGLB9bUV0KAvo9G1ODqfx05p8`
    );

    return result;
  } catch (error) {
    console.log(error);
  }
};
