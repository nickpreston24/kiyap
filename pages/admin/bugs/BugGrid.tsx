import React, { FC } from 'react';
import { GridItem, SimpleGrid } from '@chakra-ui/react';
import BugCard from './BugCard';
import { observer } from 'mobx-react-lite';
import { distinctBy } from '../../../utils/array'

export const BugGrid: FC<any> = observer(({ bugStore }) => {

    console.log('distinct bugs :>> ', distinctBy(bugStore.bugs, b => b.message))

    return <SimpleGrid columns={1} spacing="1rem">
        {
            distinctBy(bugStore.bugs, b => b.message)
                // .filter((item, index) => bugStore.bugs.indexOf(item) === index)
                .map((bug, i) => {
                    return (
                        <GridItem key={i}>
                            <BugCard bug={bug} />
                        </GridItem>
                    );
                })}
    </SimpleGrid>
})

export default BugGrid