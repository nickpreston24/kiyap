import { Stack, Box, Heading, FormControl, FormLabel, InputGroup, InputLeftElement, Icon, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDebounce } from '../../hooks'

export default function SearchBar({ take = 10 }) {

    const [form, updateForm] = useState({ term: '' })
    const [papers, setPapers] = useState([]); // Papers from Wordpress
    const [sessions, setSessions] = useState([{
        title: 'test',
        excerpt: 'test',
        slug: 'test-session',
        href: 'http://www.thepathoftruth.com',

    }]); // Sessions from Firestore
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');

    // Debounce search term so that it only gives us latest value 
    // so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(form.term, 500).trim();

    // Effect for API call
    useEffect(() => {
        // console.log('loading? :>> ', loading);
        setLoading(true);

        if (debouncedSearchTerm) {
            setLoading(true);
            let query = `pages?per_page=${take}&search="${debouncedSearchTerm}"`
            let url = `https://www.thepathoftruth.com/wp-json/wp/v2/${query}`

            setUrl(url)

            axios
                .get(url)
                .then((response) => {
                    // console.log('response :>> ', response.data);
                    setPapers(response.data)
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
                // console.log('response :>> ', response.data);
                setPapers(response.data)
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
                            {/* <InputRightElement children={<MdSearch color="green.500" /> */}
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
}
