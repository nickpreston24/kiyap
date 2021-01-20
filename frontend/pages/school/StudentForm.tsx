import React from 'react';

export const StudentForm = ({ student }) => {

    if(!student) return null;
    
    const updateField = (event) => {

        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        switch (name) {
            case 'name':
                student.changeName(value);
                break;
            case 'age':
                const age = parseFloat(value);
                if (!isNaN(age))
                    student.changeAge(age);
                break;
            case 'image':
                student.changeImage(value);
                break;
        }

        return (
            <div className='student-edit'>
                Name: <input
                    value={student.name}
                    onChange={updateField}
                    name='name' />
                <br />

                Age: <input
                    value={student.age}
                    onChange={updateField}
                    name='age' />
                <br />

                Image: <input
                    value={student.image}
                    onChange={updateField}
                    name='image' />
                <br />
            </div>
        );
    };
};

export default StudentForm;