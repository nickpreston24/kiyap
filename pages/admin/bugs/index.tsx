import React, { FC, useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { CircularProgress, Grid, GridItem, Stack } from '@chakra-ui/react';
import { gql } from 'apollo-boost'
import BugCard from './BugCard'
import { Bug, BugStore } from '../../../models/Bug'
import { observer } from 'mobx-react-lite';
import { onSnapshot, types } from 'mobx-state-tree';

const BUGS_QUERY = gql`
    {
        bugs {
            id
            message
            resolved
        }
    }
`

export const BugsPage: FC<any> = () => {

    const { loading, error, data, refetch } = useQuery(BUGS_QUERY);
    // const [getBugs, { loading, data }] = useLazyQuery(BUGS_QUERY)
    // console.log('data', data)


    // error && console.log('error', error)

    if (error) return <div>"Error loading bugs"</div>;
    if (loading) return <CircularProgress />

    // data && console.log('data', data)

    if (data && data.bugs && data.bugs.length) {

        // let bugs = data.bugs.map(b => Bug.create(b))
        let store = BugStore.create({
            bugs: [...data.bugs]
        })
        let bugs = store.bugs;
        console.log('bugs', bugs.map(b => [b.id, b.resolved]))
        // console.log('bugs', store.bugs)
        // onSnapshot(bugs, (snapshot) => {
        //     console.log('snapshot', snapshot)
        // })

        // Run the GraphQL query again when the bugs array changes
        // useEffect(() => {
        //     refetch()
        //     console.log('bugs', bugs)
        // }, [bugs])

        return (
            <Stack
                maxW="sm"
                borderWidth="3px"
                borderRadius="lg"
                overflow="hidden"
                bg='#214'
                color='#fff'
            >
                <BugsGridView
                    bugs={bugs}
                />
            </Stack>
        )
    }
    // else {
    //     return <div>Nothing to see here, folks</div>
    // }
};

export default BugsPage

function BugsGridView({ bugs = [] }) {
    return <Grid>
        {bugs.map((bug, i) => {
            return (
                <GridItem key={i}>
                    <BugCard bug={bug} />
                </GridItem>
            );
        })}
    </Grid>;
}
