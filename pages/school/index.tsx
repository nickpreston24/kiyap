import React, { FC, useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, List, Stack, Switch } from "@chakra-ui/react"
import School from '../../models/School'
import Student from '../../models/Student'
import { asPage } from '../../components/templates/Page'
import { observer } from 'mobx-react-lite'
import Dropdown from '../../components/atoms/Dropdown'
import { Profile } from '../../models/Setting'
import { BiDislike } from 'react-icons/bi'
import { SchoolsGridView } from './SchoolsGridView'
import { useLocalStorage } from '../../hooks'
import { castToSnapshot, onSnapshot } from 'mobx-state-tree'

let initialState = {


    // instructors: [
    //     {
    //         "8439": {
    //             id: "8439",
    //             name: "Jocko",
    //             gender: "m"
    //         },
    //     }
    // ],
    // students: {
    //     "8439": {
    //         id: "8439",
    //         name: "Jocko",
    //         gender: "m"
    //     },
    //     "4324": {
    //         id: "4324",
    //         name: "Candace",
    //         gender: 'f'
    //     },
    //     "5532": {
    //         id: "5532",
    //         name: 'Jordan',
    //         gender: "m"
    //     }
    // }

    schools: [
        {
            id: "61321",
            name: "Steel Guard MMA",
            address: "123 Spooner Street",
            disciplines: {
                "bjj": { name: 'Brazilian Jiu Jutsu' },
                "tkd": { name: 'Tae Kwon Do' }
            },
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.n4tw74yPUhj35EVyxpci-wHaGH%26pid%3DApi&f=1',
            descriptions: "We are an MMA school focusing on competition"
        },

        {
            id: "90415",
            name: "Steel Guard MMA",
            address: "123 Spooner Street",
            disciplines: {
                "bjj": { name: 'Brazilian Jiu Jutsu' },
                "tkd": { name: 'Boxing' },
                "kmg": { name: 'Krav Maga' }
            },
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.RSlPPhfzNbMdSi-P2c8frAHaFO%26pid%3DApi&f=1',
            descriptions: "We are an MMA school focusing on competition"
        },
    ]
}

// const school = School.create(initialState)
const schools = initialState.schools.map(s => School.create(s as any))

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

        </Stack >
    )
});

export default SchoolsPage

const StudentEntry = ({ school }) => {

    const [state, setState] = useState({
        student: Student.create({
            name: "",
            age: 0,
        })
    })

    const onAdd = () => {
        school.add(state.student)

        setState({
            ...state,
            student: Student.create({
                name: "",
                age: 0
            })
        })
    }

    return (
        <Box>
            <h4>Add new student to school</h4>
            {/* <StudentEdit student={state.student} /> */}
            <Button onClick={onAdd}>Submit</Button>
        </Box>
    )

}

const StudentEdit = ({ student }) => {
    const updateField = (event) => {

        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        switch (name) {
            case 'name':
                student.changeName(value)
                break;
            case 'price':
                const price = parseFloat(value)
                if (!isNaN(price))
                    student.changePrice(price)
                break;
            case 'image':
                student.changeImage(value)
                break;
        }

        return (
            <div className='student-edit'>
                Name: <input
                    value={student.name}
                    onChange={updateField}
                    name='name'
                />
                <br />

                Price: <input
                    value={student.price}
                    onChange={updateField}
                    name='price'
                />
                <br />

                Image: <input
                    value={student.image}
                    onChange={updateField}
                    name='image'
                />
                <br />
            </div>
        )
    }
}


// const selectedStudent = school.students.get(state.selectedStudent)
// const onStudentSeleted = e => setState({ ...state, selectedStudent: e.target.value })

{/* <select onChange={onStudentSeleted}>
<option>- Select user -</option>
{[...school.students.values()].map(student =>
    <option key={student.id} value={student.id}>
    {student.name}
    </option>
    )}
</select> */}

{/* {selectedStudent && <SchoolView School={selectedStudent.School} />}
{selectedStudent && <button onClick={selectedStudent.getSuggestions}>Suggestions</button>} */}
{/* <SchoolView School={School} /> */ }


{/* <Heading>School</Heading>
<List>
{School.students.map((item, key) => <StudentView key={key} item={item} />)}
</List>
Total: ${School.totalPrice}
<SchoolItemEntry School={School} /> */}