import React, { Component, useCallback } from 'react'
import ProjectSummary from './../project/ProjectSummary'
import { Link } from 'react-router-dom'
import { deleteProject } from '../../store/actions/projectActions'
import { connect } from 'react-redux'

const WrapEditToolbar = ({ children, pId, onDeletePost }) => {
   //here we use "useCallback" hook for optimization.
   //This creates a memoized version of the function to prevent unnecessary renders
   const deletePost = useCallback(
      () => {
         onDeletePost(pId)
      },
      [pId, onDeletePost],//checkback
   )
   return (
      <div className="personal">
         {children}
         <div className="card-action">
            <Link to={'/project/edit/' + pId} >
               <div href="#">Edit</div>
            </Link>
            <div onClick={deletePost}>Delete</div>
         </div>
      </div>
   )
}

class ProjectListPersonal extends Component {
   handleDelete = (id) => {
      this.props.deleteProject(id);
      console.log("delete project Ran");

   }
   render() {
      const { projects } = this.props;
      return (
         <div className="project-list section" >
            {projects && projects.map(project => {
               return (
                  <WrapEditToolbar key={project.id} onDeletePost={this.props.deleteProject} pId={project.id}>
                     <Link to={'/project/' + project.id} >
                        <ProjectSummary project={project} isEdit={false} />
                     </Link>
                  </WrapEditToolbar>
               )
            })}
         </div>
      )
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      deleteProject: (id) => dispatch(deleteProject(id))
   }
}

export default connect(null, mapDispatchToProps)(ProjectListPersonal)