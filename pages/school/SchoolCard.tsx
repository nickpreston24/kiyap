import React, { FC } from 'react';
import { Badge, Flex, Heading, Stack } from "@chakra-ui/react";
import { Card } from '../../components/molecules/Card';
import { BiLike, BiDislike } from 'react-icons/bi';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';

export const SchoolCard: FC<any> = observer(({ school }) => {

    let disciplines = values(school?.disciplines) || []
    // console.log('disciplines for this school :>> ', disciplines)
    // console.log('school.image', school.image)
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
                        <span>{school.averageAge}</span>
                    </Stack>

                </Flex>,
            actions: <Stack direction='row'>
                {
                    school.isLiked
                        ? <BiLike
                            size={20}
                            color='dodgerblue'
                            onClick={() => school.like()}
                        />
                        : <BiDislike
                            size={20}
                            color='#815'
                            onClick={() => school.like()}
                        />
                }

            </Stack>,
            media: <div>
                {/* FIXME: Unfortunately, this is pinging localhost:3000 when it should be 1337 */}
                {/* {school?.image?.url &&
                    <img width='130' height='60'
                        src={school.image.url}
                    />
                } */}
            </div>
        }}
        </Card>
    );
});

export default SchoolCard;