importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCuDSljHjF4pKT9yJWtnJgsCXf6rxi40Tg",
  authDomain: "goshops-7c405.firebaseapp.com",
  projectId: "goshops-7c405",
  storageBucket: "goshops-7c405.appspot.com",
  messagingSenderId: "732738074097",
  appId: "1:732738074097:web:de58947609d53efc6fc050",
  measurementId: "G-SK0FJ6BCPH",
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
