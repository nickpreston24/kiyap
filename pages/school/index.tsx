import React, { useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, List, Switch } from "@chakra-ui/react"
import School from '../../models/School'
import Student from '../../models/Student'
import { asPage } from '../../components/templates/Page'
import { observer } from 'mobx-react-lite'

let initialState = {
    id: "01",
    address: "123 Spooner Street",

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
}

const school = School.create(initialState)

export const SchoolsPage = observer(({ }) => {

    const [state, setState] = useState({ selectedStudent: null })
    const selectedStudent = school.students.get(state.selectedStudent)
    const onStudentSeleted = e => setState({ ...state, selectedStudent: e.target.value })

    return (
        <Box
            maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden"
            bg='#214'
        >
            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="show-maps" mb="0">
                    Show maps?
                </FormLabel>
                <Switch id="show-maps" />
            </FormControl>

            <Flex justify='center' direction='column'>
                <select onChange={onStudentSeleted}>
                    <option>- Select user -</option>
                    {[...school.students.values()].map(student =>
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    )}
                </select>

                {/* {selectedStudent && <SchoolView School={selectedStudent.School} />}
                {selectedStudent && <button onClick={selectedStudent.getSuggestions}>Suggestions</button>} */}
                {/* <SchoolView School={School} /> */}
            </Flex>
        </Box>
    )
});

export default SchoolsPage

// const SchoolsView = () => {

//     // <Box>
//     //     <Heading>School</Heading>
//     //     <List>
//     //         {School.students.map((item, key) => <StudentView key={key} item={item} />)}
//     //     </List>
//     // Total: ${School.totalPrice}
//     //     <SchoolItemEntry School={School} />
//     // </Box>
// }

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
