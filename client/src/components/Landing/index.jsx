import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { observer } from 'mobx-react'
import { compose } from 'recompose'
import './style.css'

import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import { Button, Grid, Card, Typography } from '@material-ui/core';
import classnames from 'classnames'
import { Link, Route, Switch, Redirect } from 'react-router-dom'

import ArrowIcon from '@material-ui/icons/ArrowForwardIosRounded';
//TODO: Make the title rotate and flip like a reel
const title = 'sifu';

const styles = theme => ({
    root: {
        overflow: 'hidden',
        position: 'absolute',
        left: 0,
        height: 'calc(100vh - 50px)',
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    '@keyframes fade': {
        from: { opacity: 0 },
        to: { opacity: 1 }
    },
    rightIcon: {
        animationName: '$fade',
        marginLeft: theme.spacing(1),
    },
    gettingStarted: {
        borderRadius: 24,
        color: 'white',
        border: `2px solid ${theme.palette.primary.contrastText}`,
        '&:hover': {
            color: theme.palette.primary.main,
            background: 'white',
            border: `2px solid ${theme.palette.primary.main}`
        }
    },
    badge: {
        fontSize: 50,
        border: '2px solid white',
        color: 'white',
        filter: 'drop-shadow(1px 1px 1px black)',
        padding: '10px 10px',
        fontFamily: "'Carter One', cursive",
        letterSpacing: '2px',
    },
    subtitle: {
        fontFamily: "'Permanent Marker', cursive",
        padding: '10px 20px',
        fontSize: 24,
        color: 'white',
        filter: 'drop-shadow(0px 0px 2px black)',
    },
    card: {
        marginTop: 40,
        minWidth: 300,
        padding: 20,
        '& button': {
            fontWeight: 'bold',
            margin: 8,
        },
    }
})

// : Main Class
export default function Landing({ match }) {
    return (
        <div>
            <AuthUserContext.Consumer>
                {authUser => authUser 
                    ? <LandingAuth {...{ match }}  /> 
                    : <LandingNonAuth {...{ match }} />}
            </AuthUserContext.Consumer>
        </div>
    )
}

export const LandingNonAuth = compose(
    withStyles(styles),
    observer
)(({ classes }) => {
    return (
        <div className={classnames(classes.root, 'banner')}>

            {/* // : Always Render the Gradient Background */}
            <Route exact path={`${ROUTES.LANDING}`} component={LandingBase} />

            {/* // : Conditionally Render SignUp/SignIn, etc. inside of a card */}
            <Route path={`${ROUTES.LANDING}:option`} component={CardContents} />

        </div>
    )
})

const LandingBase = withStyles(styles)(({ classes }) => (
    <Grid >
        <h1 className={classes.badge}> {"KIY'APP"} </h1>
        <p className={classes.subtitle}>Welcome! Find your local {title}</p>
        <Link to={ROUTES.GET_STARTED} style={{ textDecoration: 'none' }}>
            <Button color="inherit" variant="outlined" className={classes.gettingStarted}>
                Get Started
                <ArrowIcon className={classes.rightIcon} />
            </Button>
        </Link>
    </Grid>
))

const CardContents = withStyles(styles)(({ classes, location }) => (
    <Card className={classes.card}>
        <Switch location={location}>
            <Route path={ROUTES.GET_STARTED} component={GettingStarted} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        </Switch>
    </Card>
))

const GettingStarted = ({history}) => (
    <Fragment>
        <Typography variant="h6" color="primary" style={{marginBottom: 20}}>Welcome! Find your local {title}! Are you a ...</Typography>
        <Button color="primary" variant="contained" onClick={() => history.push(ROUTES.SURVEY)}>New Student</Button>
        <Button color="secondary" variant="contained" onClick={() => history.push(ROUTES.SIGN_IN)}>Professional</Button>
    </Fragment>
)

const LandingAuth = ({match}) => window.location.pathname !== '/' ? <Redirect to={`/`}/> : null