const admin = require("firebase-admin");
const serviceAccount = require("./smart-ad-website-firebase-adminsdk-fbsvc-89661f151a.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://smart-ad-website-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
const rtdb = admin.database();
module.exports = { admin, db, rtdb };
