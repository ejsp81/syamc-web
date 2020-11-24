const firebase = require('firebase')
var method=process.env.URL_CREDENTIALS
// var serviceAccount = require(process.env.GOOGLE_APPLICATIONS_CREDENTIALS);
var serviceAccount = require("./credentials").firebase;
if (method==='true') {
    console.log('Estoy usando el methodo url')
    serviceAccount= require(process.env.GOOGLE_APPLICATION_CREDENTIALS_FIREBASE);
} 
firebase.initializeApp(serviceAccount);

module.exports = firebase;