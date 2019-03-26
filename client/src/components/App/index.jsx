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
        height: 'calc(100vh - 50px)',
        textAlign: 'center',
        overflowX: 'hidden',
        overflowY: 'scroll',
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
        <RoutedApp {...{ classes }}/>
    </Router>
);

const RoutedApp = ({ classes, location }) => (
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
)

export default withAuthentication(withStyles(styles)(App));