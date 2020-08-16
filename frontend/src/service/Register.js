import firebase from "firebase";

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
  switch (time) {
    case "X":
      return ["EYE1", "EYE2", "GLASSES", "MOUTH1", "MOUTH2"];
      break;
    default:
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
