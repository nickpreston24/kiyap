import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Card } from '../../../components/molecules/Card';
import { BiHappyBeaming } from 'react-icons/bi';
import { FaRegSadCry } from 'react-icons/fa';
import { observer } from 'mobx-react-lite';

export const BugCard: FC<any> = observer(({ bug }) => {
    if (!bug)
        return null

    const iconSize = 28;

    return (
        <Flex
            style={{ background: "linear-gradient(to left, #2bc0e4, #eaecc6)" }}
            p={2}
            borderRadius="25px"
            verticalAlign="center"
            margin={2}
        >
            <Card>{{
                content:
                    <Stack>
                        {/* <Heading size='sm'>{bug.id}</Heading> */}
                        <Flex
                            align="center"
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                        >
                            {bug?.message || ""}
                        </Flex>
                    </Stack>
                ,
                actions: <Stack direction='row' paddingLeft={15}>
                    {!!bug.isResolved
                        ? <BiHappyBeaming
                            size={iconSize}
                            color='dodgerblue'
                            onClick={() => bug.toggleResolved()}
                        />
                        : <FaRegSadCry
                            size={iconSize}
                            color='#817'
                            onClick={() => bug.toggleResolved()}
                        />
                    }

                </Stack>,
                // media: <div>
                // </div>
            }}
            </Card>
        </Flex>
    );
});


export default BugCard;