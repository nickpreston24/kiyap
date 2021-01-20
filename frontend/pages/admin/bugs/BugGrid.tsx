import React, { FC } from 'react';
import { GridItem, SimpleGrid } from '@chakra-ui/react';
import BugCard from './BugCard';
import { observer } from 'mobx-react-lite';

export const BugGrid: FC<any> = observer(({ bugStore }) => {

    if (!bugStore?.bugs)
        return null;

    // console.log('distinct bugs :>> ', distinctBy(bugStore.bugs, b => b.message))   

    // const [take, setTake] = useState(10)
    // TODO: Make a picker for how many to show / take.
    // TODO: Make a toggler for showing distinct

    return <SimpleGrid columns={1} spacing="1rem">
        {
            bugStore.bugs
                // distinctBy(bugStore.bugs, b => b.message)
                // .slice(0, 10)
                .map((bug, i) => {
                    return (
                        <GridItem key={i}>
                            <BugCard bug={bug} />
                        </GridItem>
                    );
                })}
    </SimpleGrid>
})

// class Enumerable extends Array {
//     constructor(items: []) {
//         super();
//         this.push(items)
//     }

//     isEmpty() {
//         return this.length === 0;
//     }

//     take(num){

//     }

// }

export default BugGrid