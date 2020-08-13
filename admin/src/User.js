import React, { useEffect, useState, useCallback } from "react";
import fetchUserById from "./service/fetchUserById";

export default (props) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      setUser(await fetchUserById(props.params.id));
      console.log(user);
    })();
  }, [props.params.id]);
  return (
    <>
      <img class="w-48 mt-3 mb-3 mx-auto" src={user.User?.profileImg}></img>

      <div class="w-1/2 mx-auto">user : {props.params.id}</div>
      <div class="w-1/2 mx-auto">name : {user.User?.displayName}</div>
      <div class="w-1/2 mx-auto">time : {user.UserMeta?.time}</div>
      <div class="w-1/2 mx-auto">subTime : {user.UserMeta?.subTime}</div>
      {user.UserQuest?.questData.map((q, i) => (
        <div key={i} class="w-1/2 mx-auto">
          {JSON.stringify(q)}
        </div>
      ))}
    </>
  );
};
