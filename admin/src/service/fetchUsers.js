import firebase from "firebase";
import "firebase/firestore";

export default async () => {
  const db = firebase.firestore();
  const res = await db.collection("users").get();

  let users = [];
  res.forEach((doc) => {
    users.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  console.log(users);
  return await Promise.all(
    users.map(async (u) => ({
      meta:
        (
          await db
            .collection("users")
            .doc(u.id)
            .collection("gameMetaData")
            .doc("meta")
            .get()
        ).data() || "NULL",
      id: u.id,
      data: u.data,
    }))
  );
};

export const setTime = async (time, id) => {
  const db = firebase.firestore();
  await db
    .collection("gameData")
    .doc("userRoleAssign")
    .set({ [id]: time }, { merge: true });

  return await db
    .collection("users")
    .doc(id)
    .collection("gameMetaData")
    .doc("meta")
    .set(
      {
        subTime: time,
        time: time
          .replace("T_", "")
          .replace("1", "")
          .replace("2", "")
          .replace("3", "")
          .replace("4", "")
          .replace("5", ""),
      },
      { merge: true }
    );
};
