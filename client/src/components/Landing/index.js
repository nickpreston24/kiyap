import React from 'react'
import './style.css'
import { AuthUserContext } from '../Session';
import { withFlexColumn, withFlexRow } from '../Flex';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {Button } from '@material-ui/core';
//TODO: Make the title rotate and flip like a reel
const title = 'staging';

const Landing = () => (
    <div>
        <AuthUserContext.Consumer>
            { authUser => authUser ? <LandingAuth/> : <LandingNonAuth/> }
        </AuthUserContext.Consumer>
    </div>
)

const LandingNonAuth = () => (
    <div>
        <h1>Welcome to KIY'APP!</h1>
        <h2>Find your local {title}! Are you a ...</h2>

        <Link to={ROUTES.SIGN_UP}>
            <Button type="button" id="noobButton">
                New Student
            </Button>
        </Link>

        <Link to={ROUTES.SIGN_UP}>
            <Button type="button" id="proButton">
                Professional
            </Button>
        </Link>
    </div>
)

const LandingAuth = () => (
    <div>
        <h1>Welcome back!</h1>
    </div>
)

export default withFlexColumn(withFlexRow(Landing))