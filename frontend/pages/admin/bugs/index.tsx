import React, { FC, useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Box, Button, CircularProgress, CircularProgressLabel, Input, Slide, Spinner, Stack, Tooltip, useDisclosure } from '@chakra-ui/react';
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

/**
 * 
 * TODOS:
 * 1. Create the bug store empty every time.
 * 2. Load the store data using its own LoadBugs() call that takes n bugs from db using the useQuery or a normal API call (probable)
 * 3. Consider moving it up a level.
 */
export const BugsPage: FC<any> = () => {

    const { loading, error, data, refetch } = useQuery(BUGS_QUERY);

    if (error) return <div>"Error loading bugs"</div>;
    if (loading) return <Spinner />

    if (data && data.bugs && data.bugs.length) {

        console.log('data.bugs', data.bugs)
        let bugStore = BugStore.create({ bugs: [...data.bugs] })

        return (
            <Box>
                <Stack>
                    <BugEditor bugStore={bugStore} />
                    <BugProgress bugStore={bugStore} />
                </Stack>
                <BugGrid bugStore={bugStore} />
            </Box>
        )
    }
    else {
        return <div>Nothing to see here, folks</div>
    }
};

export default BugsPage

const BugEditor: FC<any> = observer(({ bugStore }) => {

    const { isOpen, onToggle } = useDisclosure();

    const [form, setForm] = useState({
        friendly: '',
        error: ''
    })
    const updateForm = (keyValuePairs) => {
        setForm({ ...form, ...keyValuePairs })
    }
    /**
     * Updates the appropriate state prop by its field name from the 
     * form where 'name' is a prop on the target component
     */
    const updateField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (!name) {
            console.warn(`No name set for form input of type '${target.type}'.  Review your form inputs and set the name attribute to the name of a prop in your form state.`)
            return;
        }
        if (!Object.keys(form).find(key => key === name)) {
            console.error(`There is no input with the attribute [name='${name}'].  Review your form inputs for mispelling or mismatches.`)
            return;
        }
        updateForm({ [name]: value });
    };

    return (
        <Box
            style={{
                border: '2px white solid'
            }}
        >
            <Tooltip
                shouldWrapChildren
                placement='auto-start'
                label="Add Random Bug"
            >
                <HiPlus
                    size={36}
                    onClick={onToggle}
                />
            </Tooltip>

            <Slide
                // direction={{
                //     // motion: 'bottom',
                //     x: '300'
                // }}
                direction='top'
                in={isOpen} style={{ zIndex: 10 }}
            >
                <Box
                    p="40px"
                    color="white"
                    mt="4"
                    bg="teal.500"
                    rounded="md"
                    shadow="md"
                >
                    <Input
                        border='transparent'
                        mb={2}
                        type='text'
                        style={{ color: '#dfa' }}
                        placeholder='Say my name...'
                        name='friendly'
                        onChange={updateField}
                    />

                    <Input
                        border='transparent'
                        mb={2}
                        type='text'
                        style={{ color: '#dfa' }}
                        placeholder='So, what happened...?'
                        name='error'
                        onChange={updateField}
                    />

                    <Button
                        bg='#41f'
                        color='#fff'
                        _hover={{ bg: '#aff', color: 'dodgerblue' }}
                        mr={2}
                        onClick={() => {
                            bugStore.postBug(form.error, form.friendly)
                            onToggle()
                        }}
                    >
                        Submit
                    </Button>

                    <Button
                        bg='#f12'
                        color='#fff'
                        _hover={{ bg: '#aff', color: 'dodgerblue' }}
                        onClick={onToggle}
                    >
                        Dismiss
                    </Button>
                </Box>

            </Slide>
        </Box>
    )
})
/** Sample bugs */
// bugStore.postBug("You done messed up!", "Yo...")
const BugProgress: FC<any> = observer(({ bugStore }) => {
    return (
        <Box>
            <CircularProgress value={bugStore.percentDone} color="green.400" thickness=".75rem">
                <CircularProgressLabel>{`${bugStore.percentDone}%`}</CircularProgressLabel>
            </CircularProgress>
        </Box>
    )
})

