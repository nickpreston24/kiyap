import React from 'react'

const API_KEY  = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// console.log('withauth -> maps api_key: ', API_KEY)

const withAuthorization = Component => {

    class WithAuthoriztion extends React.Component {

        render(){
            return (
                <Component apiKey={API_KEY} {...this.props}/>
            )
        }
    }

    return WithAuthoriztion;
}

export default withAuthorization;