const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.updateMonthlyFee = functions.pubsub
    //0 0 1 * *
    .schedule('* * * * *')
    .timeZone('America/Santo_Domingo')
    .onRun(async (context) => {
        const db = admin.firestore();
        let promises = [];
        let snap;

        snap = await db.collection('members').get();
        snap.forEach((snap) => {
            promises.push(snap.ref.update({ monthlyFee: 777 }));
        });

        return Promise.all(promises);
    });
