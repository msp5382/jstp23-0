import firebase from "firebase";
import Auth from "./Auth";
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

  setProfilePicture = (file) => {
    const ref = firebase.storage().ref("/profileImg").child(this.getUser().uid);

    return ref.put(file).then(
      async (d) =>
        await this.setProfile({
          profileImg: await firebase
            .storage()
            .ref("/profileImg")
            .child(this.getUser().uid)
            .getDownloadURL(),
        })
    );
  };
  getUserProfileImg = async (uid = this.getUser().uid) => {
    const url = firebase
      .storage()
      .ref("/profileImg")
      .child(uid)
      .getDownloadURL();
    return url;
  };
}
