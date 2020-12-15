import firebase from "firebase";
import UserProfile from "./UserProfile";
export const UploadProfileImg = async (
  file,
  uid = firebase.auth().currentUser.uid
) => {
  const ref = firebase.storage().ref("/profileImg").child(uid);

  return new Promise((sol, ject) => {
    ref.put(file).then(async (d) => {
      const url = await firebase
        .storage()
        .ref("/profileImg")
        .child(uid)
        .getDownloadURL();
      new UserProfile().setProfile({
        profileImg: url,
      });
      firebase.auth().currentUser.updateProfile({
        photoURL: url,
      });
      sol(url);
    });
  });
};

export const registerWithPassword = async (email, password) => {
  if (email || password) {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(res);
      localStorage.setItem("JSTPLOGIN", "true");
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("กรุณากรอกข้อมูล");
  }
};

export const getCharacterBuildIndex = async (time) => {
  const COMMON_ITEMS = [
    "FACE1",
    "FACE2",
    "FACE3",
    "FACE4",
    "FACE5",
    "FACE6",
    "FACE7",
    "FACE8",
    "FACE9",
    "FACE10",
    "FACE11",
  ];
  switch (time) {
    case "X":
      return ["EYE1", "EYE2", "GLASSES", "MOUTH1", "MOUTH2"];
      break;
    default:
      return ["1", "2", "3", "4", "5", "6", "7", "8", ...COMMON_ITEMS];
      break;
  }
};

export const UploadUserCharacter = async (
  file,
  uid = firebase.auth().currentUser.uid
) => {
  const ref = firebase.storage().ref("/character").child(uid);

  return new Promise((sol, ject) => {
    ref.put(file).then(async (d) => {
      const url = await firebase
        .storage()
        .ref("/character")
        .child(uid)
        .getDownloadURL();
      sol(url);
    });
  });
};
