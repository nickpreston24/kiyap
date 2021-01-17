import React from 'react';

const StudentEdit = ({ student }) => {
    const updateField = (event) => {

        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        switch (name) {
            case 'name':
                student.changeName(value);
                break;
            case 'price':
                const price = parseFloat(value);
                if (!isNaN(price))
                    student.changePrice(price);
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

                Price: <input
                    value={student.price}
                    onChange={updateField}
                    name='price' />
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
