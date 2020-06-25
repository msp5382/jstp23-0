import firebase from "firebase";
import "firebase/firestore";
import UserProfile from "../service/UserProfile";
export default class Game {
  //คลาสใช้ dev เท่านั้นนะครับ
  constructor() {
    this.db = firebase.firestore();
    this.profile = new UserProfile();
    this.uid = this.profile.getUser().uid;
  }

  getMyQuest = async () => {
    const res = await this.db
      .collection("users")
      .doc(this.uid)
      .collection("gameMetaData")
      .get();
    let col = [];
    res.forEach((d) => {
      col.push({ ...d.data(), id: d.id });
    });
    return col.find((d) => d.id === "quest");
  };

  getMyMeta = async () => {
    const res = await this.db
      .collection("users")
      .doc(this.uid)
      .collection("gameMetaData")
      .get();
    let col = [];
    res.forEach((d) => {
      col.push({ ...d.data(), id: d.id });
    });
    return col.find((d) => d.id === "meta");
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
