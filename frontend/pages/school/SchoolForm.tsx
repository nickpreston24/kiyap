import React, { FC, useEffect, useState } from 'react';
import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Tooltip } from "@chakra-ui/react";
import { observer } from 'mobx-react-lite';

export const SchoolForm: FC<any> = observer(({ schoolStore, onSubmit }) => {

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

    return (
        <Box
            p="8px"
            color="#aff"
            bg='transparent'
            rounded='md'
            shadow='md'
            mt='2'
        >
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

                <Button
                    background='transparent'
                    _hover={{ bg: '#aff', color: 'dodgerblue' }}
                    // _focus={{ boxShadow: 'none' }}
                    onClick={() => {
                        onSubmit({ ...form })
                    }}
                >Submit</Button>

            </FormControl>


        </Box>
    );
});

export default SchoolForm;