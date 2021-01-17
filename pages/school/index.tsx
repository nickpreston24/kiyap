import React, { FC } from 'react'
import { CircularProgress, Flex, FormControl, FormLabel, Stack, Switch, Tooltip } from "@chakra-ui/react"
import School from '../../models/School'
import { observer } from 'mobx-react-lite'
import Dropdown from '../../components/atoms/Dropdown'
import { Profile } from '../../models/Setting'
import { SchoolsGridView } from './SchoolsGridView'
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import axios from 'axios'
import { HiPlus } from 'react-icons/hi'
import { Logger } from '../../utils/Logger'

const ENDPOINT = `http://localhost:1337/schools`
const QUERY = gql`
{
  schools {
    id
    name
    description
    image {
        url
    }
    disciplines {
        name
    }
  }
}
`;

// const schools = initialState.schools.map(s => School.create(s as any))

type Props = {
    profile: typeof Profile | any
}

export const SchoolsPage: FC<Props> = observer(({ profile }) => {

    // TODO: Start a DB instead.

    // const [storedSchools, setSchools] = useLocalStorage('schools', undefined); // Must be undefined, or TS complains.

    // let schools = !!storedSchools
    //     ? School.create(castToSnapshot(storedSchools))
    //     : initialState.schools.map(s => School.create(s as any))

    // onSnapshot(schools, snap => {
    //     setSchools(snap)
    // })

    /** 
     *  GRAPH QL'ing a Strapi API:
     */
    const { loading, error, data } = useQuery(QUERY)
    console.log('data', data)

    if (error) return <div>"Error loading schools"</div>;
    //if schools are returned from the GraphQL query, run the filter query
    //and set equal to variable schoolSearch
    if (loading) return <CircularProgress />
    if (data.schools && data.schools.length) {
        let schools = data.schools.map(s => School.create(s as any))
        console.log('schools', schools)
        return (
            <Stack
                maxW="sm"
                borderWidth="3px"
                borderRadius="lg"
                overflow="hidden"
                bg='#214'
                color='#fff'
            >
                <FormControl
                    padding={2}
                    mb={2}
                    display="flex"
                    alignItems="center"
                >
                    {/* Dev only! */}
                    {!!profile.isDev &&
                        <>
                            <FormLabel htmlFor="show-maps" mb="0">
                                Show maps?
                        </FormLabel>
                            <Switch id="show-maps" />
                        </>
                    }
                    {/* ------------------------------- */}
                    {/* Production ready! */}
                    {!profile.isDev &&
                        <>
                            <FormLabel htmlFor="show-like-btn" mb="0">
                                Show Likes?
                        </FormLabel>
                            <Switch id="show-like-btn" />
                        </>
                    }

                </FormControl>

                {!!profile.isDev &&
                    <Flex
                        justify='center'
                        direction='column'>
                        <Dropdown options={['blue', 'green']} />
                    </Flex>
                }

                <SchoolsGridView schools={schools} />

                <Tooltip
                    shouldWrapChildren
                    placement='auto-start'
                    label="Add School"
                >
                    <HiPlus
                        onClick={() => {

                            let config = {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                url: ENDPOINT,
                            } as any;

                            // TODO: This is a sample.  use a json-ified version of a mobx observable for the real deal:
                            let newSchool = {
                                name: "Test Schewl",
                                description: 'Mah alma matter'
                            }

                            axios.post(
                                ENDPOINT, newSchool,
                                config)
                                .then(() => { alert('School added!') })
                                .catch((err) => {
                                    Logger.Log(err)
                                })
                        }}
                    />
                </Tooltip>
            </Stack >
        )
    }
});

export default SchoolsPage

{/* {selectedStudent && <SchoolView School={selectedStudent.School} />}
{selectedStudent && <button onClick={selectedStudent.getSuggestions}>Suggestions</button>} */}
{/* <SchoolView School={School} /> */ }


{/* <Heading>School</Heading>
<List>
{School.students.map((item, key) => <StudentView key={key} item={item} />)}
</List>
Total: ${School.totalPrice}
<SchoolItemEntry School={School} /> */}