import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import AboutPage from '../../pages/AboutPage/AboutPage';
import FoodPage from '../../pages/FoodPage/FoodPage';
import Footer from '../Footer/Footer';
import GroomerPage from '../../pages/GroomerPage/GroomerPage';
import InfoPage from '../../pages/InfoPage/InfoPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import MedicationPage from '../../pages/MedicationPage/MedicationPage';
import Nav from '../Nav/Nav';
import PetDetailsPage from '../../pages/PetDetailsPage/PetDetailsPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import UserPage from '../../pages/UserPage/UserPage';
import VetPage from '../../pages/VetPage/VetPage';
import './App.css';
import GroomerDetailPage from '../../pages/GroomerDetailPage/GroomerDetailPage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
              component={AboutPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
              component={UserPage}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
              component={InfoPage}
            />
            {/* ------Custom Routes------*/}
            <ProtectedRoute exact path="/food/:id" component={FoodPage} />
            <ProtectedRoute exact path="/groomer" component={GroomerPage} />
            <ProtectedRoute
              exact
              path="/groomer/details/:id"
              component={GroomerDetailPage}
            />
            <ProtectedRoute exact path="/vet/:id" component={VetPage} />
            <ProtectedRoute
              exact
              path="/details/:id"
              component={PetDetailsPage}
            />
            <ProtectedRoute
              exact
              path="/medication/:id"
              component={MedicationPage}
            />

            {/* ------Custom Routes------ */}

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LandingPage} //CHANGE TO PRIVATE
              authRedirect="/user"
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
