import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
// import WidgetWeather from '../addons/WidgetWeather'
import { connect } from 'react-redux'

const Navbar = (props) => {
   const { auth, profile } = props;
   console.log('tk auth', auth);
   const links = auth.uid ? <SignedInLinks profile={profile} userId={auth.uid} /> : <SignedOutLinks />
   return (
      <nav className="nav-wrapper grey darken-3">
         <div className="container">
            <Link to='/' className="brand-logo">My Awesome App</Link>
            {links}
            {/* //widget here */}
            {/* <WidgetWeather /> */}
         </div>
      </nav>
   )
}

const mapStateToProps = (state) => {
   console.log('from firebaseReducer', state);
   return {
      auth: state.firebase.auth,
      profile: state.firebase.profile
   }
}

export default connect(mapStateToProps)(Navbar);