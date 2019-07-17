
  import * as firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyDffkL7DjN0-QkuGnG2FpJ3teAmIGu1UhM",
    authDomain: "prem-a0a9e.firebaseapp.com",
    databaseURL: "https://prem-a0a9e.firebaseio.com",
    projectId: "prem-a0a9e",
    storageBucket: "prem-a0a9e.appspot.com",
    messagingSenderId: "420242815305",
    appId: "1:420242815305:web:12f84aa82a1e4edd"
  };
  
    firebase.initializeApp(firebaseConfig);
  
    const firebaseDB = firebase.database();
  
    const firebaseArticles = firebaseDB.ref('articles');
    const firebaseTeams = firebaseDB.ref('teams');
    const firebaseVideos = firebaseDB.ref('videos');
  
    const firebaseLooper= (snapshot)=>{
      const data =[];
      snapshot.forEach((childSnapshot) => {
          data.push({
              ...childSnapshot.val(),
              id: childSnapshot.key
          })
      });
      return data;
    }

    export {
        firebase,
        firebaseDB,
        firebaseArticles,
        firebaseTeams,
        firebaseVideos,
        firebaseLooper
    }
  