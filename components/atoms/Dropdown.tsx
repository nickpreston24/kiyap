import { Select } from "@chakra-ui/react";
import React, { FC, useState } from "react";

type Props = {
    options: string[]
    onChange?: (selected: string) => void
    initialValue?: string | number,
    placeholder?: string,
    name?: string, // The name of the controlled input - useful for changing states implicitly
}

export const Dropdown: FC<Props> = ({
    options,
    onChange,
    name,
    placeholder,
    initialValue
}) => {

    const [selected, setSelected] = useState(initialValue?.toString() || '')

    return (
        <Select
            onChange={(event) => {
                if (!!onChange) {
                    onChange(event.target.value)
                }
                setSelected(event.target.value)
            }}
            name={name}
            placeholder={placeholder}
            value={selected}
        >
            {options.map((name, key) => <option key={key}>{name}</option>)}
        </Select>
    )
}

export default Dropdown;