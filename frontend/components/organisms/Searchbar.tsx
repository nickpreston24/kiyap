import { Stack, Box, Heading, FormControl, FormLabel, InputGroup, InputLeftElement, Icon, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect, FC } from "react";
import { useDebounce } from '../../hooks'
import { MdSearch } from 'react-icons/md'

type Props = {
    queryGeneratorFn: (endpoint: string, term: string) => string
}

export const SearchBar: FC<Props> = (
    {
        queryGeneratorFn = (
            endpoint = 'http://localhost:3000/',
            term,
        ) => {
            return `${endpoint}/s?=${term}`
        }
    }
) => {

    const [form, updateForm] = useState({ term: '' })
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [result, setResult] = useState({})

    // Debounce search term so that it only gives us latest value 
    // so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(form.term, 500).trim();

    // Effect for API call
    useEffect(() => {

        setLoading(true);

        if (debouncedSearchTerm) {
            setLoading(true);
            // let query = `pages?per_page=${take}&search="${debouncedSearchTerm}"`
            // let url = `${endpoint}/${query}`

            let url = queryGeneratorFn(_, debouncedSearchTerm)

            setUrl(url)

            axios
                .get(url)
                .then((response) => {
                    console.log('Search response :>> ', response.data);
                    // setPapers(response.data)
                    setLoading(false);
                })
                .catch(console.error);

        } else {
            // setPapers([]);
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
                    <a href={url}>{url}</a>
                    <FormControl>
                        <FormLabel>Search by Contents</FormLabel>

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
                                placeholder="faith"
                            />
                        </InputGroup>
                    </FormControl>
                    <Button
                        variantColor="teal"
                        variant="outline"
                        type="submit"
                        width="full"
                        mt={4}
                        isDisabled={loading}
                    >
                        Search
                        </Button>
                </form>
            </Stack>

        </Stack>
    );
};

export default SearchBar;
