import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
   return (
      <div>
         <ul className="right nav-menus">
            <li><NavLink to='/create'>New Project</NavLink></li>
            <li><div onClick={props.signOut}>Log out</div></li>
            <li><NavLink to={'/profile/' + props.userId} className="btn btn-floating pink lighten-1">{props.profile.initials}</NavLink></li>
         </ul>
      </div>
   )
}

const mapDispatchToProps = (dispatch) => {
   return {
      signOut: () => dispatch(signOut())
   }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);