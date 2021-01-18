import React, { FC } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress, Stack } from '@chakra-ui/react';
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
    if (loading) return <CircularProgress />

    if (data && data.bugs && data.bugs.length) {

        let bugStore = BugStore.create({ bugs: [...data.bugs] })

        return (
            <Stack
                maxW="sm"
                borderWidth="3px"
                borderRadius="lg"
                overflow="hidden"
                bg='#214'
                color='#fff'
            >
                <BugGrid bugStore={bugStore} />
            </Stack>
        )
    }
    // else {
    //     return <div>Nothing to see here, folks</div>
    // }
};

export default BugsPage
