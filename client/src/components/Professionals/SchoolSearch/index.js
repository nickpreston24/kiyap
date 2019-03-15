import React, { Component } from 'react'
import School from '../../Mui/School'
import { observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import {Column, Row} from 'simple-flexbox';

class SchoolList extends Component {

        state = {
            search: '',
            // schools: [],
        }

        onFilterChange = (event) => {
            let search = event.target.value;
            console.log('searched for:', search)
            if (event.target.value) {
                this.setState({search})
            } else {
                this.setState({search: ''})
            }

            //Filter out the schools found, not those saved.

            // this.setState({schools:this.props.store.locations
            //     .map(s=>s.Name!==search)})
        }

        clearList = () => {
            this.props.store.clear();
        }


        render() {
            const { store } = this.props
            // console.log('lolcations: ', store.locations)
            return (

                // <Column flexGrow={1}>
                <div>
                    {store.locations ? (
                        <YourFinds locations={store.locations}/>
                    ): "Search for locations on the map"}

                    {store.schools ? (
                        <YourPicks schools={store.schools}/>
                    ): "No Schools found"}
                </div>
                // </Column>
            )
        }
}

SchoolList = observer(SchoolList)

const YourFinds = ({locations}) =>
    <Column flexGrow={1} horizontal='center'>

        <Row horizontal='center'>
            <h1>Search Results</h1>
        </Row>

        <Row horizontal='center'>
            <Grid container spacing={8} style={{padding:10}}>

            <TextField style={{padding:24}}
            id="filterInput"
            placeholder="Filter Schools"
            margin="normal"
            // onChange={this.onFilterChange}
            >
            </TextField>
            {/* TODO: Line up with textfield */}
            {/* <button style={{height:'30px'}} onClick={this.clearList}>Clear Filters</button> */}
            </Grid>
            {/* {console.log('found locations: : ', locations)} */}
        </Row>

        <Row vertical='center'>
            <Grid container spacing={24} style={{padding:24}}>
                {console.log('found locations: : ', locations)}
                {locations.map(location => (
                    <School {...location}
                    key={location.formatted_address}/>
                ))}
            </Grid>
        </Row>
    </Column>


const YourPicks = ({schools}) =>
    <Column flexGrow={1} horizontal='center'>
        <h1>Your Picks</h1>
        <Grid container spacing={24} style={{padding:24}}>
        {schools
            .map(school => (
                <School {...school}
                key={school._id}/>
            ))}
        </Grid>
    </Column>

/**
 * Searches for Schools using a Google Map
 * Professionals are selected by location
 */
export default class SchoolSearch extends Component {

    constructor(props){
        super(props);
        this.store = props.store;
    }

    onSearch = text => {

    }

    render() {
        return (
            <div>
                <SchoolList store={this.store}/>
            </div>
        )
    }
}