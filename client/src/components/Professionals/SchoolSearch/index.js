import React, { Component } from 'react'
import School from '../../Mui/School'
import { observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import {Column, Row} from 'simple-flexbox';
import { withFlexRow } from '../../Flex';

class SchoolList extends Component {

        state = {
            search: '',
        }

        onFilterChange = (event) => {
            let search = event.target.value;
            // console.log('searched for:', search)

            if (event.target.value) {
                this.setState({search})
            } else {
                this.setState({search: ''})
            }

            // TODO: Filter out the schools found, not those saved.

            // this.setState({schools:this.props.store.locations
            //     .map(s=>s.Name!==search)})
        }

        clearList = () => {
            this.props.store.clear();
        }


        render() {
            const { store } = this.props

            return (
                <div>
                    {store.locations ? (
                        <YourFinds locations={store.locations} store={store}/>
                    ): "Search for locations on the map"}

                    {store.schools ? (
                        <YourPicks schools={store.schools} store={store}/>
                    ): "No Schools found"}
                </div>
            )
        }
}

SchoolList = observer(SchoolList)


function YourFinds({locations, store}) {

    function onLike(id) {
        store.saveSchool(id);
    }

    function onDislike(id) {
        store.removeLocation(id);
    }

  return locations.length > 0 ? (
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

            </Grid>

        </Row>

        <Row vertical='center'>
            <Grid container spacing={24} style={{padding:24}}>
                {locations.map(location => (
                    <School {...location}
                    onDislike={onDislike}
                    onLike={onLike}
                    // image={'https://dummyimage.com/640x360/fff/aaa'}
                    key={location.place_id}/>
                ))}
            </Grid>
        </Row>
    </Column>

  ):null
}

function YourPicks ({schools, store}) {

    function removeSchool(id){
        store.removeSchool(id)
    }
    return (
        <Column flexGrow={1} horizontal='center'>
            <h1>Your Picks</h1>
            <Grid container spacing={24} style={{padding:24}}>
            {schools
                .map(school => (
                    <School {...school}
                    onRemove={removeSchool}
                    key={school.name}
                    />
                ))}
            </Grid>
        </Column>
    )
}

/**
 * Searches for Schools using a Google Map
 * Professionals are selected by location
 */
export default withFlexRow(class SchoolSearch extends Component {

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
})