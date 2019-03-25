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

// TODO: find a better replacement that doesn't resize the last box on a row, or configure this properly to do so.
export const withGrid = Component => props=> (
    <Grid container >
        <Component {...props}/>
    </Grid>
)