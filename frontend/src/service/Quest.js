import firebase from "firebase";
import "firebase/firestore";
export default class Quest {
  constructor() {
    this.db = firebase.firestore();
  }
}
