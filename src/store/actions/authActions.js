import { firestore } from "firebase";

export const signIn = (credentials) => {
   return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase.auth().signInWithEmailAndPassword(
         credentials.email,
         credentials.password
      ).then(() => {
         dispatch({ type: 'LOGIN_SUCCESS' })
      }).catch((err) => {
         dispatch({ type: 'LOGIN_ERROR', err })
      })
   }
}

export const signOut = () => {
   return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase.auth().signOut().then(() => {
         dispatch({ type: 'SIGNOUT_SUCCESS' });
      })
   }
}

export const signUp = (newUser) => {
   return (dispatch, getState, { getFirebase, getFirestore }) => {//FB for new user. FS for comunicate with fs's db
      const firebase = getFirebase();
      const fireStore = getFirestore();

      firebase.auth().createUserWithEmailAndPassword(
         //create new user
         newUser.email,
         newUser.password
      ).then((resp) => {
         // resp.user
         //add to firestore

         //firestore user collection on FS
         //we use '.doc()' instead of firestore's .add() to insert our own id from firebase
         return firestore().collection('users').doc(resp.user.uid).set({ //TODO: check syntax correct? This Seems working for now
            //additional info that we want
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0]

         })
      }).then(() => {
         dispatch({ type: 'SIGNUP_SUCCESS' });
      }).catch((err) => {
         dispatch({ type: 'SIGNUP_ERROR', err })
      })
   }
}