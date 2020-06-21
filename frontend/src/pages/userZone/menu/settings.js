import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "react-router5";
import UserProfile from "../../../service/UserProfile";
import { Navbar } from "../../../component";
const User = new UserProfile();
export default (props) => {
  const { router } = useRoute();
  const [username, setUsername] = useState();
  const [picture, setPicture] = useState();
  const file = useRef();
  let oldUserName = User.getUser().displayName;
  useEffect(() => {
    const { displayName } = User.getUser();
    setUsername(displayName);
    User.getUserProfileImg().then((e) => setPicture(e));
  }, []);
  return (
    <>
      <Navbar onGoBack={() => router.navigate("home")} />

      <div>Name: {username}</div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <img
        src={picture}
        style={{ width: 100, height: 100, borderRadius: "50%" }}
      />
      <div>
        <input
          ref={file}
          onChange={(e) => {
            User.setProfilePicture(file.current.files[0]).then(() =>
              User.getUserProfileImg().then((e) => setPicture(e))
            );
          }}
          accept=".jpg, .jpeg, .png"
          type="file"
        />
      </div>

      {username != oldUserName &&
      username != undefined &&
      username != null &&
      username != "" ? (
        <div
          onClick={() => {
            User.setUsername(username);
          }}>
          * Save
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
