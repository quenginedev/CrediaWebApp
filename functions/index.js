const functions = require('firebase-functions')
const admin = require('firebase-admin')
const serviceAccount = require('./team-vudu-firebase-adminsdk-private-key.json')
const verifiedNg = require('./api/verified.ng')
const creadia = require('./api/creadia')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


exports.verifiedNg = functions.https.onRequest(verifiedNg);
exports.creadia = functions.https.onRequest(creadia)
