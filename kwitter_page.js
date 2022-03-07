//FIREBASE LINKS
// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyArN1gGpMzBr__3zENGy_IMEv9Fx5MWEdg",
      authDomain: "kwitter-1-73926.firebaseapp.com",
      databaseURL: "https://kwitter-1-73926-default-rtdb.firebaseio.com",
      projectId: "kwitter-1-73926",
      storageBucket: "kwitter-1-73926.appspot.com",
      messagingSenderId: "244863537990",
      appId: "1:244863537990:web:04f7bfa8a3d7c6947b0b47"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
      console.log(firebase_message_id);
      console.log(message_data);

      username=message_data['name'];
      message=message_data['message'];
      like=message_data['like'];

      name_with_tag="<h4>"+ username + "<img class= 'user_tick' src='tick.png' ></h4>";
      message_with_tag="<h4 class='message_h4' >"+message+"</h4>";
      like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
      span_with_tag=" <span class='glyphicon glyphicon-thumbs-up' >Like "+ like +"</span></button><hr>";

      row=name_with_tag+message_with_tag+like_button+span_with_tag;
      document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();

function send(){
   msg=document.getElementById("msg").value;
   firebase.database().ref(room_name).push({
         name:user_name,
         message:msg,
         like:0
   });
   document.getElementById("msg").innerHTML="";
}
function updateLike(message_id){
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      update_likes=Number(likes)+1;
      console.log(update_likes);


firebase.database().ref(room_name).child(message_id).update({
      like:update_likes
});
}

