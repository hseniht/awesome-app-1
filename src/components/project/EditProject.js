import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase' //for connecting to redux

export class EditProject extends Component {
   state = {
      title: '',
      content: ''
   }
   handleChange = (e) => {
      //nice dry way
      this.setState({
         [e.target.id]: e.target.value
      })
   }
   handleSubmit = (e) => {
      e.preventDefault();
      // console.log(this.state);
      this.props.onEditProject(this.state, this.props.selectedId)
      this.props.history.push('/');
   }
   render() {
      const { auth, projects, selectedId } = this.props;
      if (!auth.uid) {
         return <Redirect to='/signin' />
      }
      if (!projects) {
         //somehow firebase doesnt allow data to load on refresh this page. Which is pretty good. But how??
         alert("Forbidden to recover data this way. Will redirect to homepage");
         return <Redirect to='/' />
      }
      let selectedProject = projects[selectedId];
      return (
         <div className="container">
            {}
            <form onSubmit={this.handleSubmit} className="white">
               <h5 className="grey-text text-darken-3">Edit Project</h5>
               <div className="input-field">
                  <label className="active" htmlFor="title">Title</label>
                  <input type="text" id="title" defaultValue={selectedProject.title} onChange={this.handleChange} required />
               </div>
               <div className="input-field">
                  <label className="active" htmlFor="content">Project Content</label>
                  <textarea id="content" defaultValue={selectedProject.content} className="materialize-textarea" onChange={this.handleChange}></textarea>
               </div>
               <div className="input-field">
                  <button className="btn pink lighten-1 z-depth-0">Edit</button>
               </div>
            </form>
         </div>
      )
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      auth: state.firebase.auth,
      projects: state.firestore.data.projects, //TOFIX: maybe add getId selector?
      selectedId: ownProps.match.params.id
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onEditProject: (project, id) => dispatch(editProject(project, id))
   }
}

// export default connect(mapStateToProps)(EditProject)
export default compose(
   connect(mapStateToProps, mapDispatchToProps),
   firestoreConnect([
      { collection: 'projects', orderBy: ['createdAt', 'desc'] }, //"createdAt" is the time on this collection
   ])
   //since we're accessing mapState from fireStore, we need to add fireStoreConnect
   //TODO: can we filter id directly from here?
)(EditProject)
