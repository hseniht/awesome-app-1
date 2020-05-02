export const createProject = (project) => {
   return (dispatch, getState, { getFirebase, getFireStore }) => { //3rd param from thunks' withExtraArgument
      //make async call to database
      dispatch({
         type: 'CREATE_PROJECT',
         project: project //payload
      })
   }
};