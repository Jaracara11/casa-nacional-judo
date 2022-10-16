const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

//delete all appointments from all collections at 12:00am
exports.updateMonthlyFee = functions.pubsub
    //0 0 1 * *
    .schedule('*/5 * * * *')
    .timeZone('America/Santo_Domingo')
    .onRun(async (context) => {
        const db = admin.firestore();
        let promises = [];
        let snap;

        snap = await db.collection('members').get();
        snap.forEach((snap) => {
            promises.push(snap.ref.delete());
        });

        return Promise.all(promises);
    });
