const admin = require('firebase-admin')
var method=process.env.URL_CREDENTIALS

// var serviceAccount = require(process.env.GOOGLE_APPLICATIONS_CREDENTIALS);
var serviceAccount = require("./credentials").firebase_admin;
var credential=admin.credential.cert(serviceAccount)
if (method==='true') {
    console.log('Estoy usando el methodo url')
    credential= admin.credential.applicationDefault();
} 

admin.initializeApp({
    credential:credential,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
});

module.exports = admin;