import firebase from "firebase";

export default class Auth {
  loginWithPassword = async (email, password) => {
    if (email || password) {
      try {
        const res = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        console.log(res);
        localStorage.setItem("JSTPLOGIN", "true");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("กรุณากรอกข้อมูล");
    }
  };
  registerWithPassword = async (email, password) => {
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
  signOut = async () => {
    await firebase.auth().signOut();
    localStorage.removeItem("JSTPLOGIN");
    localStorage.removeItem("JSTP_USER_DATA");
    return;
  };
  isLogin = () => {
    if (localStorage.JSTPLOGIN === "true") {
      console.log("USER LOGGED IN");
      return true;
    } else {
      console.log("USER NOT LOGGED IN");
      return false;
    }
  };
  getUserDataListener = (cb) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const { name, email, photoUrl, uid, displayName, emailVerified } = user;
        localStorage.setItem(
          "JSTP_USER_DATA",
          JSON.stringify({
            name,
            email,
            photoUrl,
            uid,
            emailVerified,
            displayName,
          })
        );
        cb({ name, email, photoUrl, uid, displayName, emailVerified });
      } else {
      }
    });
  };
  updateUserProfile = () => {
    const {
      name,
      email,
      photoURL,
      uid,
      displayName,
      emailVerified,
    } = firebase.auth().currentUser;

    localStorage.setItem(
      "JSTP_USER_DATA",
      JSON.stringify({
        name,
        email,
        photoURL,
        uid,
        emailVerified,
        displayName,
      })
    );
  };
  getUserData = () => {
    if (localStorage.JSTP_USER_DATA) {
      return JSON.parse(localStorage.JSTP_USER_DATA);
    }
  };
}
