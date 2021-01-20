import React, { FC } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Box, CircularProgress, CircularProgressLabel, Spinner, Stack } from '@chakra-ui/react';
import { gql } from 'apollo-boost'
import { BugStore } from '../../../models/Bug'
import { BugGrid } from './BugGrid';

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

    const { loading, error, data } = useQuery(BUGS_QUERY);

    if (error) return <div>"Error loading bugs"</div>;
    if (loading) return <Spinner />

    if (data && data.bugs && data.bugs.length) {

        let bugStore = BugStore.create({ bugs: [...data.bugs] })

        return (
            <Box


            // overflow="hidden"
            >
                <CircularProgress value={bugStore.percentDone} color="green.400" thickness=".75rem">
                    <CircularProgressLabel>{`${bugStore.percentDone}%`}</CircularProgressLabel>
                </CircularProgress>
                <BugGrid bugStore={bugStore} />
            </Box>
        )
    }
    else {
        return <div>Nothing to see here, folks</div>
    }
};

export default BugsPage
