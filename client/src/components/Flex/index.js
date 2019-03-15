import React from 'react'
import {Column, Row} from 'simple-flexbox';
import Grid from '@material-ui/core/Grid'

export const withFlexColumn = Component => props => (
    <Column flexGrow={1}>
        <Component {...props}/>
    </Column>
)

export const withFlexRow = Component => props => (
    <Row vertical='center' horizontal='center'>
        <Component {...props}/>
    </Row>
)

// Maybe refactor to its own hoc file.
export const withGrid = Component => props=> (
    <Grid container >
        <Component {...props}/>
    </Grid>
)