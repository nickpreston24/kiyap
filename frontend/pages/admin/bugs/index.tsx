import React, { FC, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Box, CircularProgress, CircularProgressLabel, Spinner, Stack, Tooltip } from '@chakra-ui/react';
import { gql } from 'apollo-boost'
import { BugStore } from '../../../models/Bug'
import { BugGrid } from './BugGrid';
import { observer } from 'mobx-react-lite';
import { HiPlus } from 'react-icons/hi';

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

    if (error) return <div>"Error loading bugs"</div>;
    if (loading) return <Spinner />

    if (data && data.bugs && data.bugs.length) {

        console.log('data.bugs', data.bugs)
        let bugStore = BugStore.create({ bugs: [...data.bugs] })

        return (
            <Box>
                <BugProgress bugStore={bugStore} />
                <BugGrid bugStore={bugStore} />
                <Tooltip
                    shouldWrapChildren
                    placement='auto-start'
                    label="Add School"
                >
                    <HiPlus
                        size={36}
                        onClick={() => bugStore
                            .postBug("You done messed up!", "Yo...")
                        } />
                </Tooltip>
            </Box>
        )
    }
    else {
        return <div>Nothing to see here, folks</div>
    }
};

export default BugsPage

const BugProgress: FC<any> = observer(({ bugStore }) => {
    return <CircularProgress value={bugStore.percentDone} color="green.400" thickness=".75rem">
        <CircularProgressLabel>{`${bugStore.percentDone}%`}</CircularProgressLabel>
    </CircularProgress>;
})

