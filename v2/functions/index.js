const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.createUser = functions.auth.user().onCreate((user) => {
  const roles = {
    admin: false,
    pending: true
  };
  const newUser = {
    email: user.email,
    displayName: user.displayName,
    uid: user.uid,
    ...roles
  };
  return admin
    .auth()
    .setCustomUserClaims(user.uid, roles)
    .then(() => {
      return admin.firestore().collection('users').doc(user.uid).set(newUser);
    })
    .then(() => {
      return {
        message: `Account for ${newUser.displayName} successfully created.`
      };
    })
    .catch((err) => err);
});
