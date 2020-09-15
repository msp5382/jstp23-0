import React, { useEffect, useState } from "react";
import fetchUsers, { setTime } from "./service/fetchUsers";
const User = (u) => {
  const [time, setUTime] = useState(u?.meta?.subTime);
  return (
    <div class="border-solid border border-white	p-2 m-2 rounded flex">
      <div class="w-1/2" onClick={() => (window.location = `/user?id=${u.id}`)}>
        <div className=" text-sm text-gray-500">{u.id}</div>
        <div className=" text-sm ">{u.data?.displayName}</div>
      </div>
      <div class="w-1/2 block">
        <select
          onChange={(e) => {
            setUTime(e.target.value);
            setTime(e.target.value, u.id);
          }}
          value={time}
          class="bg-teal-800 w-100 h-10 text-sm">
          <option value="NULL">ยังไม่ได้ตั้งค่า</option>
          <option value="T_M1">ยุคเวทมนต์_มนุษย์</option>
          <option value="T_M2">ยุคเวทมนต์_ผู้วิเศษ</option>
          <option value="T_R1">ยุคปฎิวัติอุตสาหกรรม_ตอนต้น</option>
          <option value="T_R2">ยุคปฎิวัติอุตสาหกรรม_ตอนกลาง</option>
          <option value="T_R3">ยุคปฎิวัติอุตสาหกรรม_ตอนปลาย</option>
          <option value="T_D1">ยุคดิจิตอล_ตอนต้น</option>
          <option value="T_D2">ยุคดิจิตอล_ตอนกลาง</option>
          <option value="T_D3">ยุคดิจิตอล_ตอนปลาย</option>
          <option value="T_B1">ยุคปลีกวิเวก_ตอนต้น</option>
          <option value="T_B2">ยุคปลีกวิเวก_ตอนกลาง</option>
          <option value="T_B3">ยุคปลีกวิเวก_ตอนปลาย</option>
          <option value="T_V1">ยุคโลกเสมือน_1</option>
          <option value="T_V2">ยุคโลกเสมือน_2</option>
          <option value="T_V3">ยุคโลกเสมือน_3</option>
          <option value="T_V4">ยุคโลกเสมือน_4</option>
          <option value="T_V5">ยุคโลกเสมือน_5</option>
        </select>
      </div>
    </div>
  );
};

export default (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      setUsers(await fetchUsers());
    })();
  }, []);
  return (
    <>
      <div class="container mt-5 mx-auto">
        <button
          onClick={() => {
            window.location = "/quest";
          }}
          class="bg-indigo-300 mr-3 hover:bg-indigo-700 text-black mb-3 font-bold py-2 px-4 rounded">
          Quest
        </button>
        <button
          onClick={() => {
            window.location = "/monitor";
          }}
          class="bg-indigo-300 mr-3 hover:bg-indigo-700 text-black mb-3 font-bold py-2 px-4 rounded">
          Monitor
        </button>
        <button
          onClick={() => {
            window.location = "/view_quest_answer";
          }}
          class="bg-indigo-300 mr-3 hover:bg-indigo-700 text-black mb-3 font-bold py-2 px-4 rounded">
          View Quest Answer
        </button>

        <button
          onClick={() => {
            window.location = "/login";
          }}
          class="bg-indigo-300 mr-3 hover:bg-indigo-700 text-black mb-3 font-bold py-2 px-4 rounded">
          Login
        </button>
        {users
          .sort((a, b) => {
            if (a.data.displayName < b.data.displayName) {
              return -1;
            } else if (a.data.displayName > b.data.displayName) {
              return 1;
            }
          })
          .map((u) => (
            <User {...u} />
          ))}
      </div>
    </>
  );
};
