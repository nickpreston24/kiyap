import React, { FC } from 'react'
import { CircularProgress, Stack } from "@chakra-ui/react"
import { SchoolStore } from '../../models/School'
import { SchoolGrid } from './SchoolGrid'
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { SchoolForm } from './SchoolForm'

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

export const SchoolsPage: FC<any> = () => {

    /** 
     *  GRAPH QL'ing a Strapi API:
     */
    const { loading, error, data } = useQuery(QUERY)
    data && console.log('data', data)

    if (error) return <div>"Error loading schools"</div>;
    //if schools are returned from the GraphQL query, run the filter query
    //and set equal to variable schoolSearch
    if (loading) return <CircularProgress />
    if (data.schools && data.schools.length) {

        let schoolStore = SchoolStore.create({ schools: [...data.schools] })

        return (
            <Stack
                maxW="sm"
                borderWidth="3px"
                borderRadius="lg"
                overflow="hidden"
            >
                <SchoolGrid schoolStore={schoolStore} />
                <SchoolForm schoolStore={schoolStore} />

            </Stack >
        )
    }
};

export default SchoolsPage


/** SCRAPS */

{/* <FormControl
                    padding={2}
                    mb={2}
                    display="flex"
                    alignItems="center"
                > */}
{/* Dev only! */ }
{/* {!!profile.isDev &&
                        <>
                            <FormLabel mb="0">
                                Show maps?
                            </FormLabel>
                            <Switch id="show-maps" />
                        </>
                    } */}
{/* ------------------------------- */ }
{/* Production ready! */ }
{/* {!profile.isDev &&
                        <>
                            <FormLabel mb="0">
                                Show Likes?
                            </FormLabel>
                            <Switch id="show-like-btn" />
                        </>
                    } */}
{/* </FormControl> */ }


// TODO: Start a DB instead.

// const [storedSchools, setSchools] = useLocalStorage('schools', undefined); // Must be undefined, or TS complains.

// let schools = !!storedSchools
//     ? School.create(castToSnapshot(storedSchools))
//     : initialState.schools.map(s => School.create(s as any))

// onSnapshot(schools, snap => {
//     setSchools(snap)
// })


{/* {selectedStudent && <SchoolView School={selectedStudent.School} />}
{selectedStudent && <button onClick={selectedStudent.getSuggestions}>Suggestions</button>} */}
{/* <SchoolView School={School} /> */ }


{/* <Heading>School</Heading>
<List>
{School.students.map((item, key) => <StudentView key={key} item={item} />)}
</List>
Total: ${School.totalPrice}
<SchoolItemEntry School={School} /> */}