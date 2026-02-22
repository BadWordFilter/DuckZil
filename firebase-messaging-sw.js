importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCPThFhtkvXAXA2N2qGCDqOpXawkUAQgbE",
    authDomain: "otaku-market-36a27.firebaseapp.com",
    projectId: "otaku-market-36a27",
    storageBucket: "otaku-market-36a27.firebasestorage.app",
    messagingSenderId: "516937935514",
    appId: "1:516937935514:web:578416a40d714184e08d23",
    measurementId: "G-Y4N10CWMWD"
});

const messaging = firebase.messaging();

// 백그라운드 메시지 수신 시 처리
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || 'https://cdn-icons-png.flaticon.com/512/3590/3590390.png',
        data: payload.data
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
