import React, { FC, useEffect, useState } from 'react';
import { FormControl, FormHelperText, FormLabel, Input, Tooltip } from "@chakra-ui/react";
import { observer } from 'mobx-react-lite';
import { HiPlus } from 'react-icons/hi';

export const SchoolForm: FC<any> = observer(({ schoolStore }) => {

    const [form, setForm] = useState({
        name: "",
        description: '',
        address: "",
        url: null,
    });

    const updateForm = (kvps) => setForm({ ...form, ...kvps });

    /**
    * Updates the appropriate state prop by its field name from the
    * form where 'name' is a prop on the target component
    */
    const updateField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        updateForm({ [name]: value });
    };

    useEffect(() => {
        console.log('form', form);
    }, [form]);

    return (
        <div>
            <FormControl id="name" spacing={40}>
                <FormLabel>School Name</FormLabel>
                <Input
                    type="text"
                    name='name'
                    onChange={updateField} />
                <FormHelperText>We need the name of your school.</FormHelperText>

                <FormLabel>Address</FormLabel>
                <Input
                    type="text"
                    name='address'
                    onChange={updateField} />

                <FormLabel>Description</FormLabel>
                <Input
                    type="text"
                    name='description'
                    onChange={updateField}
                    placeholder="Description here..." />
                <FormHelperText>Tell us a bit about your school.</FormHelperText>

                <FormLabel>Photo</FormLabel>
                <Input
                    type="url"
                    name='url'
                    onChange={updateField} />
                <FormHelperText>Have a pic?  Share it here!</FormHelperText>

            </FormControl>

            <Tooltip
                shouldWrapChildren
                placement='auto-start'
                label="Add School"
            >
                <HiPlus
                    size={36}
                    onClick={() => schoolStore.addSchool({
                        ...form
                        // name: "Fake School",
                        // description: "...lorem ipsum..."
                    })} />
            </Tooltip>
        </div>
    );
});

export default SchoolForm;