import React from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {

    class WithAuthentication extends React.Component {
        constructor(props){
            super(props);
            this.state = { authUser: null,};
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props}/>
                </AuthUserContext.Provider>
            );
        }

        componentDidMount () {
            this.listener = this.props.firebase.onAuthUserListener(
                authUser => {
                  this.setState({ authUser });
                },
                () => {
                  this.setState({ authUser: null });
                }
            );
        }

        componentWillUnmount() {
            this.listener();
        }

    }

    return withFirebase(WithAuthentication);
}

export default withAuthentication;