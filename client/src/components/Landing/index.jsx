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
import { Button, Grid, Card } from '@material-ui/core';
import classnames from 'classnames'
import { Link, Route, Switch } from 'react-router-dom'

import ArrowIcon from '@material-ui/icons/ArrowForwardIosRounded';
//TODO: Make the title rotate and flip like a reel
const title = 'sifu';

const styles = theme => ({
    root: {
        overflow: 'hidden',
        position: 'absolute',
        left: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
        // background: 'red',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // height: '100vh',
        // width: '100vw',
    },
    '@keyframes fade': {
        from: { opacity: 0 },
        to: { opacity: 1 }
    },
    rightIcon: {
        animationName: '$fade',
        marginLeft: theme.spacing.unit,
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
        // marginTop: 80,
        padding: '10px 10px',
        fontFamily: "'Carter One', cursive",
        letterSpacing: '2px',
        // marginLeft: 20,
        // marginRight: 'auto',
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
        // width: 500,
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
                {authUser => authUser ? <LandingAuth /> : <LandingNonAuth {...{ match }} />}
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
            {/* <p className={classes.subtitle} style={{ marginTop: 80, }}>Welcome to...</p> */}

            <Route exact path={ROUTES.LANDING} render={() => (
                <Grid >
                    <h1 className={classes.badge}> {"KIY'APP"} </h1>
                    <p className={classes.subtitle}>Welcome! Find your local {title}</p>
                    <Link to={ROUTES.SURVEY} style={{ textDecoration: 'none' }}>
                        <Button color="inherit" variant="outlined" className={classes.gettingStarted}>
                            Get Started
                    <ArrowIcon className={classes.rightIcon} />
                        </Button>
                    </Link>
                </Grid>
            )} />
            {/* // : Rendering Card content with Routes */}
            <Route exact path={`/:mode`} render={({ location }) => (
                <Card className={classes.card}>
                    <Switch location={location} >
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                        <Route path={ROUTES.SURVEY} render={() => (
                            <Fragment>
                                <h2>Welcome! Find your local {title}! Are you a ...</h2>
                                <Link to={ROUTES.SIGN_UP} style={{ textDecoration: 'none' }}>
                                    <Button color="primary" variant="contained" > New Student </Button>
                                </Link>
                                <Link to={ROUTES.SIGN_UP} style={{ textDecoration: 'none' }}>
                                    <Button color="secondary" variant="contained" >Professional </Button>
                                </Link>
                            </Fragment>
                        )} />
                    </Switch>
                </Card>
            )} />
        </div>
    )
})

const LandingAuth = () => (
    <div>
        <h1>Welcome back!</h1>
    </div>
)