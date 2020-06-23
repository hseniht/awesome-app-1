export const createProject = (project) => {
   return (dispatch, getState, { getFirebase, getFirestore }) => { //3rd param from thunks' withExtraArgument
      //make async call to database (basically halting the dispatch for a moment)
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      firestore.collection('projects').add({  //name of your collection in firebase
         ...project, // all properties from your state
         authorFirstName: profile.firstName,
         authorLastName: profile.lastName,
         authorId: authorId,
         createdAt: new Date()
      }).then(() => {
         dispatch({
            type: 'CREATE_PROJECT',
            project: project //payload
         });
      }).catch((err) => {
         dispatch({
            type: 'CREATE_PROJECT_ERROR',
            err: err
         });
      })
   }
};

export const deleteProject = (projectId) => {
   return (dispatch, getState, { getFirebase, getFirestore }) => { //3rd param from thunks' withExtraArgument
      //make async call to database (basically halting the dispatch for a moment)
      const firestore = getFirestore();
      // const profile = getState().firebase.profile;
      // const authorId = getState().firebase.auth.uid;
      firestore.collection('projects').doc(projectId).delete() //id passed by componenet specifically
         .then(() => {
            dispatch({
               type: 'DELETE_PROJECT',
               project: projectId //payload
            });
         }).catch((err) => {
            dispatch({
               type: 'DELETE_PROJECT_ERROR',
               err: err
            });
         })
   }
};