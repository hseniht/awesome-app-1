import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/project/ProjectDetails'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/project/CreateProject';
import Profile from './components/profile/Profile';

class App extends Component {
   render() {
      return (
         <BrowserRouter
            basename="/awesome-app-1"> {/*temp added baseName*/}
            <div className="App">
               <Navbar />
               <Switch>
                  <Route exact path='/' component={Dashboard} />
                  {/*id here is just an declaration. This dynamic data is passed from <Link /> tag  */}
                  <Route path='/project/:id' component={ProjectDetails} />
                  <Route path='/signin' component={SignIn} />
                  <Route path='/signup' component={SignUp} />
                  <Route path='/create' component={CreateProject} />
                  <Route path='/profile/:userId' component={Profile} />
               </Switch>
            </div>
         </BrowserRouter>
      );
   }
}

export default App;
