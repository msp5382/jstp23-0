import React, { useEffect, useState } from "react";
import { getStep, setStep, setDate, getDate } from "./service/Inspector";
import { fetchQuestAnswer } from "./service/fetchQuestAnswer";
import { calculateWorldData } from "./service/calculateWorldData";
import "./service/editUserTest";
export default (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentDate, setCurrentDate] = useState(1);

  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    (async () => {
      setCurrentStep(await getStep());
      setAnswer((await fetchQuestAnswer()).AnswerAll);
      setCurrentDate(await getDate());
    })();
  }, []);
  return (
    <div class="container mx-auto pt-5 ">
      <div class="mb-2">
        <div className="text-lg">Monitor</div>
        <div className="flex text-sm">
          Current quest id :{" "}
          <div className="text-white ml-2"> {currentStep}</div>
        </div>
        <input
          type="number "
          class="bg-teal-900"
          onChange={(e) => {
            setCurrentStep(e.target.value);
            setStep(e.target.value).then(() => alert("เรียบร้อย"));
          }}
          value={currentStep}
        />
      </div>
      <div class="mb-2">
        <div className="flex text-sm">
          Current Game Date :{" "}
          <div className="text-white ml-2"> {currentDate}</div>
        </div>
        <input
          type="number "
          class="bg-teal-900"
          onChange={(e) => {
            setCurrentDate(e.target.value);
            setDate(e.target.value).then(() => alert("เรียบร้อย"));
          }}
          value={currentDate}
        />
      </div>
      <div class="bg-black text-sm p-10 text-white">
        {answer.map((a) => (
          <div>
            {calculateWorldData(a.consequence)}
            action {a.consequence} in time {a.time}
          </div>
        ))}
      </div>
    </div>
  );
};
