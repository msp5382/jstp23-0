import firebase from "firebase";
import "firebase/firestore";
import UserProfile from "../service/UserProfile";
export default class Admin {
  constructor() {
    this.db = firebase.firestore();
    this.profile = new UserProfile();
    this.uid = this.profile.getUser().uid;
  }
  createNewQuest = async (questData) => {
    const res = await this.db
      .collection("quest")
      .doc(this.uid)
      .set(data, { merge: true });
    return res;
  };

  setMyMeta = async (data) => {
    const res = await this.db
      .collection("users")
      .doc(this.uid)
      .collection("gameMetaData")
      .doc("meta")
      .set(data, { merge: true });
    return res;
  };
}
