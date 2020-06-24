import React, { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../project/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase' //to get firestore data on this compoenent , we need this
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
   render() {
      // console.log("tk stateProps", this.props);
      const { projects, auth, notifications } = this.props; // from mapState
      if (!auth.uid) {
         return <Redirect to='/signin' />
      }
      return (
         <div className="dashboard container">
            <div className="row">
               <div className="col s12 m6">
                  <ProjectList projects={projects} />
               </div>
               <div className="col s12 m5 offset-m1">
                  <Notifications notifications={notifications} />
               </div>
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   console.log("tk state", state);
   return {
      // projects: state.project.projects
      projects: state.firestore.ordered.projects,
      auth: state.firebase.auth,
      notifications: state.firestore.ordered.notifications
   }
}

//Add diff HOC's together using 'compose'
//HOC 1: `connect` from redux,
//HOC 2: `firestoreConnect` from react-redux-firebase.
export default compose(
   connect(mapStateToProps),
   // firestoreConnect(() => ['projects']) // sync the collection from Firestore into redux
   // alt way passing array:
   firestoreConnect([
      { collection: 'projects', orderBy: ['createdAt', 'desc'] }, //"createdAt" is the time on this collection
      { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] } //"time" is the time on this collection
   ])
)(Dashboard)