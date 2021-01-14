import React, { FC } from 'react';
import { Badge, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { Card } from '../../components/molecules/Card';
import { BiLike, BiDislike } from 'react-icons/bi';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';

export const SchoolCard: FC<any> = observer(({ school }) => {

    let disciplines = values(school?.disciplines) || []

    return (
        <Card>{{
            content:
                <Flex
                    align="center"
                    mt={4}
                    mb={4}
                >
                    <Stack>

                        <Heading color='#fff' size='sm'>{school.name}</Heading>
                        <Flex align="flex-end">
                            {disciplines
                                .map((discipline, key) => <Badge
                                    variant="outline"
                                    margin='2px'
                                    colorScheme='purple'
                                    key={key}
                                >
                                    {discipline.name}
                                </Badge>)}
                        </Flex>
                        <Flex
                            align="center"
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                        >
                            {school?.description || ""}
                        </Flex>

                    </Stack>

                </Flex>,
            actions: <Stack direction='row'>
                {
                    school.isLiked
                        ? <Button
                            size='md'
                            color='dodgerblue'
                            bg='transparent'
                            onClick={() => school.like()}
                        >
                            <BiLike />
                        </Button>
                        : <Button
                            size='md'
                            color='#815'
                            bg='transparent'
                            onClick={() => school.like()}
                        >
                            <BiDislike />
                        </Button>
                }

            </Stack>,
            media: <div>
                <img width='130' height='60'
                    src={school.image}
                />
            </div>
        }}
        </Card>
    );
});
