const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
   response.send("Hello from TK!");
});

const createNotification = (async notification => {
   const doc = await admin.firestore().collection('notifications')
      .add(notification);
   console.log('notification added', doc);
})

exports.projectCreated = functions.firestore
   .document('projects/{projectId}')
   .onCreate(doc => {
      const project = doc.data();
      const notification = { // new data to notification collections
         content: 'Added a new project',
         user: `${project.authorFirstName} ${project.authorLastName}`,
         time: admin.firestore.FieldValue.serverTimestamp()
      }

      return createNotification(notification);
   })

//using auth trigger service
exports.userJoined = functions.auth.user()
   .onCreate(user => {
      return admin.firestore().collection('users')
         .doc(user.uid).get().then(doc => {

            const newUser = doc.data();
            const notification = {
               content: 'Joined the party',
               user: `${newUser.firstName} ${newUser.lastName}`,
               time: admin.firestore.FieldValue.serverTimestamp()
            }

            return createNotification(notification);
         })
   })
//async way for userJoined ?? Yet to try this
// exports.userJoined = functions.auth.user()
//    .onCreate(async user => {
//       const doc = await admin.firestore().collection('users')
//          .doc(user.uid).get();
//       const newUser = doc.data();
//       const notification = {
//          content: 'Joined the party',
//          user: `${newUser.firstName} ${newUser.lastName}`,
//          time: admin.firestore.FieldValue.serverTimestamp()
//       };
//       return createNotification(notification);
//    })