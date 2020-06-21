import React, { Component } from 'react'
import ProjectList from '../project/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Profile extends Component {
   render() {
      // console.log("tk stateProps", this.props);
      const { projects, auth } = this.props; // from mapState
      if (!auth.uid) {
         return <Redirect to='/signin' />
      }
      return (
         <div className="profile container">
            <div className="row">
               <div className="col s12 m6">
                  <ProjectList projects={projects} />
               </div>
               {/* <div className="col s12 m5 offset-m1">
                  <Notifications notifications={notifications} />
               </div> */}
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   console.log("tk state profile", state);
   return {
      // projects: state.project.projects
      projects: state.firestore.ordered.projects,
      auth: state.firebase.auth
   }
}

//Add diff HOC's together using 'compose'
//HOC 1: `connect` from redux,
//HOC 2: `firestoreConnect` from react-redux-firebase.
export default compose(
   firestoreConnect(),
   connect(mapStateToProps),
   firestoreConnect((props) => {
      if (props.auth.uid !== undefined){
         return [
            { collection: 'projects', where: ['authorId', '==', props.auth.uid] }
            // { collection: 'projects', where: ['authorFirstName', '==', 'Brock'] }
         ]
      } else {
         // TOFIX:
         //"firestoreConnect()" needs return a collection? We get an error if we dont do so.
         //Therefore we add this as fallback for now.
         return [{collection: 'projects'}] 
      }
   })
)(Profile)