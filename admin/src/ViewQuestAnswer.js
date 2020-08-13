import React, { useEffect, useState } from "react";
import { fetchQuestAnswer } from "./service/fetchQuestAnswer";
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
        {questAnswer?.map((q) => (
          <div class="border-solid border border-white	p-2 m-2 rounded flex">
            <div class="w-1/2">
              <div className=" text-sm text-gray-500">{q.answer_id}</div>
              <div className=" text-sm ">{q.answerText}</div>
            </div>
          </div>
        ))}
      </div>
      <div class="container mx-auto pt-5 ">
        {answer?.map((q) => (
          <div class="border-solid border border-white	p-2 m-2 rounded flex">
            <div class="w-1/2">
              <div className=" text-sm text-gray-500">{q.quest_answer_id}</div>
              <div className=" text-sm ">{q.answerText}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
