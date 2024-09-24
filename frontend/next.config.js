require('dotenv').config()
const webpack = require('webpack')

module.exports = {
    env: {
        GRAPHENE_BOLT_URL: process.env.GRAPHENE_BOLT_URL,
        GRAPHENE_BOLT_USER: process.env.GRAPHENE_BOLT_USER,
        REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
        REACT_APP_AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
        REACT_APP_DATABASE_URL: process.env.REACT_APP_DATABASE_URL,
        REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
        REACT_APP_MESSAGING_SENDER_ID: process.env.REACT_APP_MESSAGING_SENDER_ID,
        REACT_APP_APP_ID: process.env.REACT_APP_APP_ID
    }
}