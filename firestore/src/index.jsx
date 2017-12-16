import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyD7HY5esLhiupVV4niadE7hihb_wIB5CqQ',
  authDomain: 'techcasting-5d36a.firebaseapp.com',
  databaseURL: 'https://techcasting-5d36a.firebaseio.com',
  projectId: 'techcasting-5d36a',
  storageBucket: 'techcasting-5d36a.appspot.com',
  messagingSenderId: '772833070744',
};
firebase.initializeApp(config);

let db = firebase.firestore();

db.collection('users').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const user = doc.data();
    console.log(user);
  });
});

const user1 = db.collection('users').doc('1');

user1.set({
  name: 'yabu',
  age: 35,
}).then(() =>{
  console.log('書き込み成功');
}).catch((e) => {
  console.error('書き込み失敗: ', e);
});
