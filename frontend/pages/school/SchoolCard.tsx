import React, { FC } from 'react';
import { Badge, Flex, Heading, Stack } from "@chakra-ui/react";
import { Card } from '../../components/molecules/Card';
import { BiLike, BiDislike } from 'react-icons/bi';
import { toJS, values } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri'

const iconStyle = {
    size: "20px",
    color: 'dodgerblue',
}

export const SchoolCard: FC<any> = observer(({ school }) => {

    // console.log('disciplines for this school :>> ', disciplines)
    // console.log('school.image', toJS(school.image))
    console.log('school', toJS(school))
    if (!school)
        return null;

    let disciplines = values(school?.disciplines) || []

    return (
        <Card
            style={{
                // backgroundColor: '#122345aa'
                backgroundColor: '#e4e4e422'
            }}
        >{{
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

                        <Heading color='#fff' size='md'>{school.name}</Heading>

                        <div>{school.address}</div>

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
            media: !school?.image
                ? <></>
                : <div>
                    {school?.image &&
                        <img width='130' height='60'
                            src={school.image}
                        />
                    }
                </div>

        }}
        </Card>
    );
});

//https://cdn.shopify.com/s/files/1/0050/3349/2553/articles/Alpacas_in_field_22_N21_2000x.jpg?v=1589368550
export default SchoolCard;