import firebase from "firebase";
import "firebase/firestore";
export default class Chat {
  constructor() {
    this.db = firebase.firestore();
  }
  sendMessage = (id, name, url, m) => {
    const messageFMT = {
      sender: id,
      name: name,
      profilePic: url,
      message: m,
      timestamp: Date.now(),
    };

    this.db.collection("chat").add(messageFMT);
  };
  fetchMessage = () => {};
  listenToMessage = (cb,last) => {
    var query = this.db
    .collection("chat")
    .orderBy("timestamp", "desc")
    if(last){
      query = query
      .startAfter(last)
      .limit(10);
    }
    else{
        query = query.limit(10);
    }
      query.onSnapshot((q) => {
        var messages = [];
        q.forEach(function (doc) {
          messages.push(doc.data());
        });
        console.log("Callback parameter:");
        if(messages !== []) cb(messages,q.docs[q.docs.length-1]);
        else cb(messages,null);
      });
  };
}
