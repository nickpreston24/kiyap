import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import HomePage from '../Home';
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

                <Switch location={location}>
                    <Route exact path={ROUTES.HOME} component={HomePage} />
                    <Route exact path={ROUTES.SURVEY} component={SurveyPage} />
                    <Route path={ROUTES.LANDING} component={LandingPage} />
                </Switch>

            </div>
        </MuiThemeProvider>
    </Router>
);

export default withAuthentication(withStyles(styles)(App));