import React from "react";
import IndexPage from "../pages/index";
import Test1Page from "../pages/test1";
/*
  วิธีการวาง Page และใช้ router นะครับ
  1.สร้าง page เป็น component ใน /page
  2.import เข้ามา ละมาเพิ่ม { name: ชื่อ, path: พาร์ท , component: <คอมโพเน้น /> },
 */
export default [
  { name: "index", path: "/index", component: <IndexPage /> },
  { name: "test1", path: "/test1", component: <Test1Page /> },
];
