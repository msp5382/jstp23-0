import firebase from "firebase";
import "firebase/firestore";
import UserProfile from "../service/UserProfile";
export default class Game {
  //คลาสใช้ dev เท่านั้นนะครับ
  //onProd ใช้ uid กับ profile ของ user ที่ต้องการ
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
  getQuest = async (questId) => {
    const res = (
      await this.db
        .collection("users")
        .doc(this.uid)
        .collection("gameMetaData")
        .doc("quest")
        .get()
    ).data().questData;
    return res.find((q) => q.id === questId);
  };
}
