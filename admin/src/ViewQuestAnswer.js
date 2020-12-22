import React, { useEffect, useState } from "react";
import { fetchQuestAnswer } from "./service/fetchQuestAnswer";
import { fetchQuestByIdAndTime } from "./service/fetchQuests";
import setAnswerCorrect, {
  readAnswerSet,
  readAnswerSetRealTime,
} from "./service/setAnswerCorrect";
const QuestAnswerR = (props) => {
  const [QD, setQ] = useState({ quest_answer_id: "0", answerText: "" });
  const [Checking, setChecking] = useState(false);
  useEffect(() => {
    fetchQuestByIdAndTime(props.q.quest_answerFor, props.q.time).then((res) =>
      setQ(res)
    );
  }, [props.q]);
  const setPassOrNot = async (isPass) => {
    await setAnswerCorrect(props.q.quest_answer_id, isPass, {
      quest_answerFor: props.q.quest_answerFor,
      time: props.q.time,
    });
    setChecking(true);
    setTimeout(() => {
      props.checked(isPass, props.q.quest_answer_id);
      setChecking(false);
    }, 500);
  };
  if (!Checking) {
    return (
      <div class="border-solid w-1/2 mx-auto shadow-md	bg-teal-900	p-2 m-2 rounded ">
        <div>
          <div className=" text-sm text-white bg-teal-600 p-1 rounded">
            คำถาม : {QD.quest}
          </div>

          <div className=" text-md text-white	 mt-1">
            {" "}
            คำตอบ : {props.q.answerText}
          </div>
          {props.q.attatchFile.map((a, i) => (
            <img key={i} src={a} alt="attatchfile" />
          ))}
        </div>
        <div class="flex mt-2 justify-end">
          <button
            onClick={() => setPassOrNot(true)}
            class=" bg-teal-500 text-sm  hover:bg-teal-700 text-white font-bold py-1 px-2 rounded">
            ผ่าน
          </button>

          <button
            onClick={() => setPassOrNot(false)}
            class=" bg-red-500 text-sm ml-2 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
            ไม่ผ่าน
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div class="border-solid w-1/2 mx-auto shadow-md	bg-teal-900	p-2 m-2 rounded ">
        <div class="mx-auto">SAVING....</div>
      </div>
    );
  }
};
export default (props) => {
  const [questAnswer, setQuestAnswer] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [filterChecked, setfilterChecked] = useState(true);
  useEffect(() => {
    (async () => {
      const fetched = await fetchQuestAnswer();
      console.log(fetched);
      ///const marked = await readAnswerSet();
      readAnswerSetRealTime((marked) => {
        setAnswer(
          filterChecked
            ? fetched.QuestAnswerAll.filter(
                (a) => !marked.includes(a.quest_answer_id)
              )
            : fetched.QuestAnswerAll
        );
      });
      setQuestAnswer(fetched.AnswerAll);
    })();
  }, [filterChecked]);

  //useEffect(() => {}, [answer]);

  return (
    <>
      <div class="container mx-auto pt-5 ">
        <button
          onClick={() => {
            setfilterChecked(!filterChecked);
          }}
          class="bg-indigo-300 mr-3 hover:bg-indigo-700 text-black mb-3 font-bold py-2 px-4 rounded">
          {filterChecked ? "view all answer" : "view only new answer"}
        </button>
        {answer?.map((d, i) => (
          <QuestAnswerR
            key={i}
            q={d}
            checked={(isPass, quest_answer_id) =>
              setAnswer(
                answer.filter((a) => a.quest_answer_id !== quest_answer_id)
              )
            }
          />
        ))}
      </div>
    </>
  );
};
