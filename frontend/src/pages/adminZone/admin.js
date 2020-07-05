import React, { useEffect } from "react";
import { useRoute } from "react-router5";
import { Navbar, Body, TextBox, Button } from "../../component";
import admin from "../../service/Admin";

export default (props) => {
  const { router } = useRoute();
  const Admin = new admin();
  useEffect(() => {
    const f = async () => {
      //console.log(await new Game().getMyMeta());
      //console.log(await new Game().getMyQuest());
      /*console.log(
        await new Game().setMyQuest({
          questData: [
            {
              id: 123,
              location: 1,
              name: "เควส #1",
              description:
                "ไมรัสเด็กอายุ 8 ขวบ น่าตาเฉลียวฉลาดและน่าเอ็นดู วันนี้คือวันเกิดของเขาและคุณได้บังเอิญพบกับงานเลี้ยงเล็กๆในห้องทำงานของพ่อเขา ในมือของคุณมีหนังสือเล่มหนึ่งและนั่นคงจะเป็นสิ่งสุดท้ายที่ควรจะเป็นของขวัญ เพียงแต่คุณไม่มีอะไรอย่างอื่นเลยและเวลางานจะเริ่มต้นแล้ว",
            },
            {
              id: 323,
              location: 2,
              name: "เควส #2",
              description:
                "เวทย์มนต์คือสิ่งมหัศจรรย์ และนั่นทำให้ทุกคนเชื่อว่าเรามีอำนาจ มันทำให้อุปทานการซื้อขายสูงขึ้นจากการจัดการผังเมืองในรูปแบบที่เราเป็นไปในการถ่วงดุล คุณว่าไหมล่ะ? ",
            },
            {
              id: 423,
              location: 3,
              name: "เควส #3",
              description:
                "เทคโนโลยีคือสิ่งที่จะพาพวกเราเข้าสู่ยุคใหม่ ผมว่าเครื่องจักรไอน้ำที่ผมประดิษฐ์ขึ้นมานี้จะเป็นประวัติศาสตร์หน้าใหม่ ที่เวทย์มนต์ก็สู้ไม่ได้ คุณว่าไหมล่ะ?",
            },
          ],
        })
      );*/
      /*
      new Admin().createNewQuest({
        story:
          "เวทย์มนต์คือสิ่งมหัศจรรย์ และนั่นทำให้ทุกคนเชื่อว่าเรามีอำนาจ มันทำให้อุปทานการซื้อขายสูงขึ้นจากการจัดการผังเมืองในรูปแบบที่เราเป็นไปในการถ่วงดุล คุณว่าไหมล่ะ?",
        quest: "อุปสงค์คืออะไร",
        choice: [
          {
            text: "แน่นอน มันเป็นสิ่งที่ทำให้เรามีอำนาจ",
            effect: "-TECH",
          },
          {
            text: "ไม่มั่นใจเท่าไร แต่ก็ไม่คัดค้านคุณหรอก",
            effect: "none",
          },
        ],
      });*/
      /*
      new Admin().assignQuestToUser(
        "91199357-4d14-4c01-a70c-a95e51a0a30a",
        "OAXhBzyFupRzh8YN1FKOcLgoX9t2",
        0
      );*/
    };
    f();
  }, []);
  return (
    <div>
      <Navbar
        onGoBack={() => router.navigate("home")}
        pageName={"แอดมิน"}></Navbar>
      <Body>
        <Button
          onClick={async () => {
            alert(
              await Admin.createNewQuest({
                story:
                  "เวทย์มนต์คือสิ่งมหัศจรรย์ และนั่นทำให้ทุกคนเชื่อว่าเรามีอำนาจ มันทำให้อุปทานการซื้อขายสูงขึ้นจากการจัดการผังเมืองในรูปแบบที่เราเป็นไปในการถ่วงดุล คุณว่าไหมล่ะ?",
                quest: "อุปสงค์คืออะไร",
                answerType: "String",
                choice: [
                  {
                    text: "แน่นอน มันเป็นสิ่งที่ทำให้เรามีอำนาจ",
                    effect: "-TECH",
                  },
                  {
                    text: "ไม่มั่นใจเท่าไร แต่ก็ไม่คัดค้านคุณหรอก",
                    effect: "none",
                  },
                ],
              })
            );
          }}
          text="สร้างเควส"
        />
        <Button
          onClick={async () => {
            await Admin.assignQuestToUser(
              prompt("qId=?"),
              "OAXhBzyFupRzh8YN1FKOcLgoX9t2",
              0
            );
          }}
          text="กำหนดเควสให้ผู้เล่น"
        />
        <Button
          onClick={async () => {
            await Admin.setUserMeta(
              {
                time: "M",
                subTime: "M0",
              },
              "OAXhBzyFupRzh8YN1FKOcLgoX9t2"
            );
          }}
          text="กำหนด time และ subtime ให้ผู้เล่น"
        />
      </Body>
    </div>
  );
};
