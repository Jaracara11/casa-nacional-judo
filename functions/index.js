const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

//delete all appointments from all collections at 12:00am
exports.clearAllAppointments = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('America/Santo_Domingo')
  .onRun(async (context) => {
    const db = admin.firestore();
    let promises = [];
    let snap;

    snap = await db.collection('test-site').get();
    snap.forEach((snap) => {
      promises.push(snap.ref.delete());
    });

    snap = await db.collection('hamilton-barbershop').get();
    snap.forEach((snap) => {
      promises.push(snap.ref.delete());
    });

    snap = await db.collection('victor-barbershop').get();
    snap.forEach((snap) => {
      promises.push(snap.ref.delete());
    });

    return Promise.all(promises);
  });
