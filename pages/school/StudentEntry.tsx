import React, { useState } from 'react';
import { Box, Button } from "@chakra-ui/react";
import Student from '../../models/Student';

const StudentEntry = ({ school }) => {

    const [state, setState] = useState({
        student: Student.create({
            name: "",
            age: 0,
        })
    });

    const onAdd = () => {
        school.add(state.student);

        setState({
            ...state,
            student: Student.create({
                name: "",
                age: 0
            })
        });
    };

    return (
        <Box>
            <h4>Add new student to school</h4>

            <Button onClick={onAdd}>Submit</Button>
        </Box>
    );

};

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