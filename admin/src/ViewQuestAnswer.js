import React, { useEffect, useState } from "react";
import { fetchQuestAnswer } from "./service/fetchQuestAnswer";
import { fetchQuestByIdAndTime } from "./service/fetchQuests";
const QuestAnswerR = (props) => {
  const [QD, setQ] = useState({ quest_answer_id: "0", answerText: "" });
  useEffect(() => {
    fetchQuestByIdAndTime(props.q.quest_answerFor, props.q.time).then((res) =>
      setQ(res)
    );
  }, [props.q]);
  return (
    <div class="border-solid border border-white	p-2 m-2 rounded flex">
      <div class="w-1/2">
        <div className=" text-sm text-gray-500">{props.q.quest_answer_id}</div>
        <div className=" text-sm ">{props.q.answerText}</div>
        {props.q.attatchFile.map((a) => (
          <img src={a} alt="attatchfile" />
        ))}
      </div>
    </div>
  );
};
export default (props) => {
  const [questAnswer, setQuestAnswer] = useState([]);
  const [answer, setAnswer] = useState([]);
  useEffect(() => {
    (async () => {
      const fetched = await fetchQuestAnswer();
      console.log(fetched);
      setQuestAnswer(fetched.AnswerAll);
      setAnswer(fetched.QuestAnswerAll);
    })();
  }, []);
  return (
    <>
      <div class="container mx-auto pt-5 ">
        {answer?.map((d) => (
          <QuestAnswerR q={d} />
        ))}
      </div>
    </>
  );
};
