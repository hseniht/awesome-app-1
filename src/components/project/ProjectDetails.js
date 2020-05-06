import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const ProjectDetails = (props) => {
   const { project } = props;
   if (project) {
      return (
         <div className="container section project-details">
            <div className="card z-depth-0">
               <div className="card-content">
                  <span className="card-title">{project.title}</span>
                  <p>{project.content}</p>
               </div>
               <div className="card-action grey lighten-4 grey-text">
                  <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                  <div>2nd September, 2am</div>
               </div>
            </div>
         </div>
      )
   }
   return (
      <div className="containter center">
         <p>Loading project....</p>
      </div>
   )
}

const mapStateToProps = (state, ownProps) => { //ownProps used to get props from component
   console.log('projectDetails mapstate', state);

   const id = ownProps.match.params.id
   const projects = state.firestore.data.projects
   const project = projects ? projects[id] : null
   return {
      project: project
   }
}

export default compose(
   connect(mapStateToProps),
   firestoreConnect(() => ['projects']), //sync 'projects' collection from Firestore into redux
   //alt way
   // firestoreConnect([
   //    { collection: 'projects' }
   // ])
)(ProjectDetails)