import firebase from "firebase";
import "firebase/firestore";
//import UserProfile from "../service/UserProfile";
import { v4 as uuidv4 } from "uuid";

// Legacy code not use

export default class Admin {
  constructor() {
    this.db = firebase.firestore();
    //this.profile = new UserProfile();
    //this.uid = this.profile.getUser().uid;
  }

  setUserMeta = async (data, uid) => {
    const res = await this.db
      .collection("users")
      .doc(uid)
      .collection("gameMetaData")
      .doc("meta")
      .set(data, { merge: true });
    return res;
  };

  /**
   *
   * @param questData {
   *  story:String,
   *  quest: String,
   *  answerType: enum ["String","Picture","Video"],
   *  choice: [{
   *  text: String,
   *  effect: String
   * }]
   * }
   *
   */
  createNewQuest = async (questData) => {
    const questId = uuidv4();
    const questDataType = {
      id: questId,
      location: Math.floor(Math.random() * (6 - 1)) + 1,
      name: "เควสประจำวัน",
      description: questData.story,
      quest: questData.quest,
      choice: questData.choice,
      answerType: questData.answerType,
    };
    const res = await this.db
      .collection("quests")
      .doc(questId)
      .set(questDataType, { merge: true });
    return questId;
  };

  assignQuestToUser = async (questId, userUID) => {
    const selectedQuestData = (
      await this.db.collection("quests").doc(questId).get()
    ).data();
    console.log(selectedQuestData);
    const prePush = {
      id: questId,
      location: selectedQuestData.location,
      name: selectedQuestData.name,
      description: selectedQuestData.description,
      event: selectedQuestData.choice.map((q) => q.text),
      quest: selectedQuestData.quest,
      answerType: selectedQuestData.answerType,
    };
    const originData = (
      await this.db
        .collection("users")
        .doc(userUID)
        .collection("gameMetaData")
        .doc("quest")
        .get()
    ).data();
    let combinedData;

    if (originData?.questData) {
      combinedData = [...originData.questData, prePush];
    } else {
      combinedData = [prePush];
    }

    const res = await this.db
      .collection("users")
      .doc(userUID)
      .collection("gameMetaData")
      .doc("quest")
      .set(
        {
          questData: combinedData,
        },
        { merge: true }
      );
    return;
  };
}
