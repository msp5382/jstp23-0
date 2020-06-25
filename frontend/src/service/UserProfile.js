import firebase from "firebase";
import Auth from "./Auth";

let CachedURL = "";
export default class UserProfile {
  setProfile = (profile) => {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.getUser().uid)
      .set(profile, { merge: true });
  };
  setUsername = async (username) => {
    await Promise.all([
      firebase.auth().currentUser.updateProfile({
        displayName: username,
      }),
      this.setProfile({
        displayName: username,
      }),
    ]);
    new Auth().updateUserProfile();
    return;
  };
  getUser = () => {
    if (localStorage.JSTP_USER_DATA) {
      return JSON.parse(localStorage.JSTP_USER_DATA);
    }
  };

  setProfilePicture = async (file) => {
    const ref = firebase.storage().ref("/profileImg").child(this.getUser().uid);

    return ref.put(file).then(async (d) => {
      const url = await firebase
        .storage()
        .ref("/profileImg")
        .child(this.getUser().uid)
        .getDownloadURL();
      CachedURL = url;
      await Promise.all([
        this.setProfile({
          profileImg: url,
        }),
        firebase.auth().currentUser.updateProfile({
          photoURL: url,
        }),
      ]);
      new Auth().updateUserProfile();
    });
  };
  getUserProfileImg = async (uid = this.getUser().uid) => {
    if (uid === this.getUser().uid) {
      //const url = this.getUser().photoURL;
      //return url;
      if (CachedURL === "") {
        const url = firebase
          .storage()
          .ref("/profileImg")
          .child(uid)
          .getDownloadURL();
        CachedURL = url;
        console.log("NO CACHED");
        return url;
      } else {
        console.log("USE CACHED");
        return CachedURL;
      }
    } else {
      const url = firebase
        .storage()
        .ref("/profileImg")
        .child(uid)
        .getDownloadURL();
      return url;
    }
  };
}