var firebase = require("./firebase");
var admin = require('./firebase_admin')

//use firebase

exports.authenticate = async function (username, password) {
  return await firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
    console.log(error);
  })
}

exports.usuarioActual = firebase.auth().currentUser

exports.tokenUsuario = function () {
  var token;
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
    token = idToken;
  }).catch(function (error) {
    console.log('ha ocurrido un error ' + error)
    return null;
  });
  return token
}

exports.customClaim = async function () {
  return await firebase.auth().currentUser.getIdTokenResult()
}

//use firebase_admin

exports.getUserByEmail = async function (email) {
  var response = {}
  await admin.auth().getUserByEmail(email)
    .then(function (userRecord) {
      response = { success: true, data: userRecord.toJSON() };
      console.log('Successfully fetched user data:', userRecord.toJSON());
    })
    .catch(function (error) {
      response = { success: false, data: error.errorInfo.code };
      console.log('Error fetching user data:', error.errorInfo.code);
    });
  return response
}

exports.getUserByUid = async function (uid) {
  var response = {}
  await admin.auth().getUser(uid)
    .then(function (userRecord) {
      response = { success: true, data: userRecord.toJSON() };
      console.log('Successfully fetched user data:', userRecord.toJSON());
    })
    .catch(function (error) {
      response = { success: false, data: error.errorInfo.code };
      console.log('Error fetching user data:', error.errorInfo.code);
    });
  return response
}

exports.createUser = async function (user) {
  var response = {}
  await admin.auth().createUser({
    email: user.email,
    emailVerified: true,
    password: user.email,
    displayName: user.displayName,
    disabled: false,
  }).then(function (userRecord) {
    admin.auth().setCustomUserClaims(userRecord.uid, {
      profile: user.profile, idBD: user.id
    }).then(() => {
      console.log('Rol asignado')
    })
    response = { success: true, data: userRecord.uid };
    console.log('Successfully created new user:', userRecord);
  }).catch(function (error) {
    response = { success: false, data: 'Error creating new user' };
    console.log('Error creating new user:', error);
  });
  return response
}

exports.updateUser = async function (user) {
  var response = {}
  await admin.auth().updateUser(user.uid, {
    displayName: user.displayName,
  })
    .then(async function  (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      await admin.auth().setCustomUserClaims(user.uid, { profile: user.profile, idBD: user.id }).then(() => {
        response = { success: true, data: userRecord.uid };
        console.log('Successfully updated user', userRecord.toJSON());
      });

    })
    .catch(function (error) {
      response = { success: false, data: 'Error update new user' };
      console.log('Error updating user:', error);
    });
  return response
}