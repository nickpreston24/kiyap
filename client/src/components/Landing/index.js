import React from 'react'
import './style.css'
import { AuthUserContext } from '../Session';
import { withFlexColumn, withFlexRow } from '../Flex';

const title = 'sifu';

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
        <h2>Are you a ...</h2>
        <button>Pro</button>
        <button>Student</button>
        <p>Find your local {title}!</p>
    </div>
)

const LandingAuth = () => (
    <div>
        <h1>Welcome back!</h1>
    </div>
)

export default withFlexColumn(withFlexRow(Landing))