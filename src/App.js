import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/project/ProjectDetails'
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/project/CreateProject';

class App extends Component {
   render() {
      return (
         <BrowserRouter
            basename="/awesome-app-1"> {/*temp added baseName*/}
            <div className="App">
               <Navbar />
               <Switch>
                  <Route path={process.env.PUBLIC_URL} exact path='/' component={Dashboard} />
                  <Route path='/project/:id' component={ProjectDetails} />
                  <Route path='/signin' component={SignIn} />
                  <Route path='/signup' component={SignUp} />
                  <Route path='/create' component={CreateProject} />
               </Switch>
            </div>
         </BrowserRouter>
      );
   }
}

export default App;
