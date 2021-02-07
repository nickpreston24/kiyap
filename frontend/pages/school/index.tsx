import React, { FC } from 'react'
import { Box, CircularProgress, Stack } from "@chakra-ui/react"
import { SchoolStore } from '../../models/School'
import { SchoolGrid } from './SchoolGrid'
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { SchoolForm } from './SchoolForm'
import { SearchBar } from '../../components/organisms/Searchbar'
import ENDPOINTS from '../../constants/endpoints'

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
    data && console.log('schools page data :>> ', data)

    if (error) return <div>"Error loading schools"</div>;
    //if schools are returned from the GraphQL query, run the filter query
    //and set equal to variable schoolSearch
    if (loading) return <CircularProgress />
    if (data.schools && data.schools.length) {

        let schoolStore = SchoolStore.create({ schools: [...data.schools] })

        return (
            <Stack
                overflow="hidden"
            >
                <SearchBar
                    placeholder='Search Schools'
                    devMode={true}
                    queryGeneratorFn={(id) => `${ENDPOINTS.SCHOOLS}/${id}`}
                />


                <Box
                    style={{ border: '1px orange' }}
                    border='2px orange'
                >
                    <SchoolGrid schoolStore={schoolStore} />
                </Box>

                {/* TODO: Find a nice animated way to add new schools in a form */}
                <SchoolForm schoolStore={schoolStore} />

            </Stack >
        )
    }
    else {
        return <div>Nothing to see here, folks</div>
    }

};

export default SchoolsPage


/** SCRAPS */

{/* <Button onClick={onOpen}>Open</Button>
                <Drawer isOpen={isOpen} onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Create your account</DrawerHeader>
                        <DrawerBody>
                            <form
                                id="my-form"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    console.log("submitted")
                                }}
                            >
                                <Input name="nickname" placeholder="Type here..." />
                            </form>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button type="submit" form="my-form">
                                Save
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer> */}

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