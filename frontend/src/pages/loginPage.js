import React, { useState } from "react";
import { useRoute } from "react-router5";
import Auth from "../service/Auth";
export default (props) => {
  const { router } = useRoute();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <div>
      <div>PAGE :{router.getState().name}</div>
      <input
        value={email}
        className="form-control"
        onChange={(t) => setEmail(t.target.value)}
        type="email"
        name="email"
      />
      <input
        value={password}
        className="form-control"
        onChange={(t) => setPassword(t.target.value)}
        type="password"
        name="password"
      />
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          new Auth().registerWithPassword(email, password);
        }}>
        สมัคร JSTPID
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          new Auth()
            .loginWithPassword(email, password)
            .then(() => router.navigate("home"));
        }}>
        เข้าสู่ระบบด่วย JSTPID
      </div>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          new Auth().signOut();
        }}>
        อ่อกๆจากระบบ JSTPID
      </div>
    </div>
  );
};
