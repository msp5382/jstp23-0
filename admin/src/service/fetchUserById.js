import firebase from "firebase";
import "firebase/firestore";

export default async (uid) => {
  const db = firebase.firestore();
  const UserMeta = (
    await db
      .collection("users")
      .doc(uid)
      .collection("gameMetaData")
      .doc("meta")
      .get()
  ).data();
  const User = (await db.collection("users").doc(uid).get()).data();
  const UserQuest = (
    await db
      .collection("users")
      .doc(uid)
      .collection("gameMetaData")
      .doc("quest")
      .get()
  ).data();

  return {
    UserMeta: UserMeta,
    UserQuest: UserQuest,
    User: User,
  };
};
