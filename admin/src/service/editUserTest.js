import firebase from "firebase";
import "firebase/firestore";

window.addUserTest = async () => {
  const db = firebase.firestore();
  let x = [];
  for (let i = 0; i < 10; i++) {
    x.push("UserTest" + i);
  }
  console.log(x);
  return await Promise.all(
    x.map((a, i) => {
      return db
        .collection("users")
        .doc(a)
        .set(
          {
            displayName: `user${i}_name`,
          },
          { merge: true }
        );
    })
  );
};
