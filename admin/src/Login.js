import React, { useEffect, useState } from "react";
import { getStep, setStep } from "./service/Inspector";
import firebase from "firebase";
export default (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div class="container mx-auto pt-5 ">
      <div class="mb-2">
        <div className="text-lg">Login</div>
        <input
          type="number "
          class="bg-teal-900"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="USER"
          value={email}
        />
        <input
          type="number "
          class="bg-teal-900"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="USER"
          value={password}
        />

        <button
          onClick={() => {
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => (window.location = "/"));
          }}
          class="bg-indigo-300 mr-3 hover:bg-indigo-700 text-black mb-3 font-bold py-2 px-4 rounded">
          Login
        </button>
      </div>
    </div>
  );
};
