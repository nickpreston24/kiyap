import React, { FC } from 'react';
import { Badge, Flex, Heading, Stack } from "@chakra-ui/react";
import { Card } from '../../components/molecules/Card';
import { BiLike, BiDislike } from 'react-icons/bi';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri'

const iconStyle = {
    size: "20px",
    color: 'dodgerblue',
}

export const SchoolCard: FC<any> = observer(({ school }) => {

    // console.log('disciplines for this school :>> ', disciplines)
    // console.log('school.image', school.image)
    if (!school)
        return null;

    let disciplines = values(school?.disciplines) || []

    return (
        <Card>{{
            content:
                <Flex
                    align="center"
                    mt={4}
                    mb={4}
                    padding={2}
                    spacing={2}
                    margin={2}
                >
                    <Stack>

                        <Heading color='#fff' size='sm'>{school.name}</Heading>
                        <Flex align="flex-end"
                            padding={2}
                            spacing={2}
                            margin={2}
                        >
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
            actions: <Stack direction='row' padding={2} spacing={2} margin={2}>
                {
                    school.isLiked
                        ? <BiLike
                            {...iconStyle}
                            onClick={() => school.like()}
                        />
                        : <BiDislike
                            size={20}
                            color='#815'
                            onClick={() => school.like()}
                        />
                }

                {
                    <FaRegEdit {...iconStyle} />
                }
                {
                    <RiDeleteBinLine onClick={() => school.delete()} {...iconStyle} />
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