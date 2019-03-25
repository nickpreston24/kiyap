import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import SurveyPage from '../Survey';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const styles = theme => ({
    root: {
        background: 'white',
        // minHeight: 'calc(100% - 50px)',
        // height: 'calc(100% - 50px)',
        height: '100%',
        textAlign: 'center',
        overflow: 'hidden',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 50,
    },
    navigation: {
        position: 'aboslute',
        background: 'black !important',
        height: 50,
        boxSizing: 'border-box',
    }
})

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff1744',
        },
        secondary: {
            main: '#000',
        },
    },
});

const App = ({ classes }) => (
    <Router>
        <MuiThemeProvider theme={theme}>
            <Navigation className={classes.navigation} />
            <div className={classes.root}>

                {/* <hr /> */}

                {/* For testing, I changed to SurveyPage instead. TODO: Change back to LandingPage when done */}
                <Route path={ROUTES.LANDING} component={SurveyPage} />

                <Route path={ROUTES.HOME} component={HomePage} />
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route path={ROUTES.ADMIN} component={AdminPage} />
                <Route path={ROUTES.SURVEY} component={SurveyPage}/>
            </div>
        </MuiThemeProvider>
    </Router>
);

export default withAuthentication(withStyles(styles)(App));