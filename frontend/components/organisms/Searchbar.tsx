import { Stack, Box, Heading, FormControl, FormLabel, InputGroup, InputLeftElement, Icon, Input, Button, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect, FC } from "react";
import { useDebounce } from '../../hooks'
import { MdSearch } from 'react-icons/md'

type Props = {
    queryGeneratorFn: (endpoint: string) => string // The function that makes a query string.
    placeholder?: string,
    debounceTime?: number,
    devMode?: boolean,
    label?: string,
    onResultChanged?: (result: any) => void
}

function partialApply(fn, ...args) {
    return fn.bind(null, ...args);
}

export const SearchBar: FC<Props> = (
    {
        queryGeneratorFn,
        debounceTime = 250,
        placeholder = '',
        devMode = false,
        label = null,
        onResultChanged = null,
    }
) => {

    const [form, updateForm] = useState({ term: '' })
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [result, setResult] = useState({})

    // Debounce search term so that it only gives us latest value 
    // so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(form.term, debounceTime).trim();

    // Effect for API call
    useEffect(() => {

        setLoading(true);

        if (debouncedSearchTerm) {
            setLoading(true);

            let queryFn = partialApply(queryGeneratorFn, debouncedSearchTerm)
            let url = queryFn(debouncedSearchTerm)

            setUrl(url)

            axios
                .get(url)
                .then((response) => {
                    setResult(response.data)
                    setLoading(false);
                    let results = response.data;
                    let updatedResults = results?.length ? [...results] : [results]
                    console.log('updatedResults', updatedResults)
                    onResultChanged && onResultChanged(updatedResults)
                })
                .catch(console.error);

        } else {
            setLoading(false)
        }
    },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    );

    /**
     * Updates the appropriate state prop by its field name from the 
     * form where 'name' is a prop on the target component
     */
    const updateField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        updateForm({ ...form, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!url)
            return;

        setLoading(true)
        axios
            .get(url)
            .then((response) => {
                setResult(response.data)
                setLoading(false);
            })
            .catch(console.error);
    }

    return (
        <Stack
            width="100%"
            align="center"
            p={2}
        >
            <Box textAlign="center">
                <Heading size="lg">Search</Heading>
            </Box>
            <Stack
                my={4}
                textAlign="left"
                direction='column'
            >
                <form onSubmit={onSubmit}>
                    {!!devMode && <a href={url}>{url}</a>}
                    <FormControl>
                        {!!label && <FormLabel>{label}</FormLabel>}

                        <InputGroup>

                            <InputLeftElement
                                pointerEvents="none"
                                children={<Icon
                                    as={MdSearch}
                                    size="5"
                                    color="green.300" />}
                            />
                            <Input
                                value={form.term}
                                name='term'
                                onChange={updateField}
                                type="text"
                                isRequired
                                placeholder={placeholder}
                            />
                        </InputGroup>
                    </FormControl>
                    {/* {loading
                        ? <Spinner />
                        :  */}
                    <Button
                        color='teal'
                        variant="outline"
                        type="submit"
                        width="full"
                        mt={4}
                    >
                        Search
                    </Button>
                    {/* } */}
                </form>
                {/* {!!devMode && <span>{JSON.stringify(result)}</span>} */}
            </Stack>

        </Stack>
    );
};

export default SearchBar;
