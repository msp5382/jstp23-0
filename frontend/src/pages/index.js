import React from "react";
import { BaseLink, useRoute } from "react-router5";

export default (props) => {
  const { router } = useRoute();

  return (
    <div>
      <div>PAGE :{router.getState().name}</div>
      <div>****หน้านี้ไม่ใช่หน้าจริงนะครับ*****</div>
      <div onClick={() => router.navigate("home")}>* Login แล้ว</div>
      <div onClick={() => router.navigate("login")}>* ยังไม่ได้ Login</div>
      <div onClick={() => router.navigate("character_username_pass")}>
        * character build
      </div>
    </div>
  );
};
