import React, { FC } from 'react';
import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { SchoolCard } from './SchoolCard';
import { observer } from 'mobx-react-lite';

export const SchoolGrid: FC<any> = observer(({ schoolStore }) => {

    if (!schoolStore?.schools)
        return null;

    return (
        <SimpleGrid columns={1} spacing="1rem">
            {schoolStore.schools.map((school, i) => {
                return (
                    <GridItem key={i}>
                        <SchoolCard school={school} />
                    </GridItem>
                );
            })}
        </SimpleGrid>
    );
}
);

export default SchoolGrid;