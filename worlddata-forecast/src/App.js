import React, { useState, useEffect } from "react";
import firebase from "firebase";
export default () => {
  const [time, setTime] = useState("");
  const [quests, setQuests] = useState([]);
  const [selectedChoice, setSelected] = useState([]);
  useEffect(() => {
    if (time !== "") {
      window.firebase
        .firestore()
        .collection("quests")
        .doc(time)
        .get()
        .then((data) => {
          console.log(data.data());
          setQuests(data.data().quests);
        });

      window.firebase
        .firestore()
        .collection("gameData")
        .doc("adminSetData")
        .get()
        .then((data) => {
          console.log(data.data());
          if (data.data()[time]) {
            setSelected(data.data()[time]);
          }
        });
    }
  }, [time]);
  const addSelectedChoice = (selected, number, consq) => {
    let s;
    if (selectedChoice.find((a) => a.id === number)) {
      s = selectedChoice.filter((a) => a.id !== number);
      setSelected([...s]);
    } else {
      s = {
        id: number,
        select: selected,
        consq: consq,
      };
      setSelected([...selectedChoice, s]);
    }
  };
  return (
    <div class="container mx-auto pt-10 max-w-xs	">
      {quests.length > 0 ? (
        <>
          {quests.map((a) => (
            <>
              <div class="p-3 bg-pink-900	rounded text-sm text-white mt-3">
                <b>Story: </b>
                {a.event}
                <br />
                <div class="mt-2">
                  <b>Quest:</b> {a.quest}
                </div>
              </div>
              {a.choice
                .filter((c) => c !== "ยังไม่กำหนด")
                .map((c, i) => (
                  <>
                    <div
                      onClick={() =>
                        addSelectedChoice(i + 1, a.id, c.consequence)
                      }
                      class={`mt-5 cursor-pointer p-3 rounded ${
                        selectedChoice.find(
                          (z) => z.id === a.id && z.select === i + 1
                        )
                          ? `bg-pink-700 text-white`
                          : `border-pink-900`
                      } border`}>
                      {c.choiceText}
                    </div>
                    <div class="text-xs">{c.consequence}</div>
                  </>
                ))}
            </>
          ))}
          <div
            onClick={() => {
              window.firebase
                .firestore()
                .collection("gameData")
                .doc("adminSetData")
                .set({ [time]: selectedChoice })
                .then(() => {
                  alert("saved");
                });
            }}
            class="p-3 bg-pink-600	rounded mb-5 text-white mt-3">
            บันทึก
          </div>
        </>
      ) : (
        <div className="flex pt-5">
          <select
            onChange={(e) => {
              setTime(e.target.value);
            }}
            value={time}
            class="bg-pink-800 w-100 text-white h-10 text-sm border-white border rounded mx-auto">
            <option value="">เลือกยุค</option>
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
      )}
    </div>
  );
};
