import React, { useEffect, useState, useCallback } from "react";
import fetchQuests from "./service/fetchQuests";
import accessSpreadSheet from "./service/accessSpreadSheet";
import assignQuest from "./service/assignQuest";
export default (props) => {
  const [quests, setQuest] = useState([]);
  useEffect(() => {
    (async () => {
      setQuest(await fetchQuests());
      console.log(quests);
    })();
  }, []);
  return (
    <div class="container mx-auto pt-5 ">
      <div class="mb-2">
        <div>Quest</div>
        <a href="https://docs.google.com/spreadsheets/d/1lVZLx0x1lfLOO5p_9pAxqRyFtobpB1HI6YuAvRazzJI/edit?usp=sharing">
          QuestDataBase
        </a>
      </div>

      <button
        onClick={() => {
          accessSpreadSheet();
        }}
        class="bg-indigo-300 mr-3 hover:bg-indigo-700 text-black mb-3 font-bold py-2 px-4 rounded">
        Sync Quest with database
      </button>
      <button
        onClick={() => {
          assignQuest();
        }}
        class="bg-indigo-300 hover:bg-indigo-700 text-black mb-3 font-bold py-2 px-4 rounded">
        Trigger Quest Assigner
      </button>
      {quests.map((q, i) => (
        <div key={i} class="mt-2 border border-gray-300 rounded p-2">
          <div class="text-sm text-gray-500">
            {q.id} in {q.time}
          </div>
          <div class="text-sm truncate">{q.quest}</div>
        </div>
      ))}
    </div>
  );
};
