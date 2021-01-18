import { Button, Flex, Link, Stack } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import React from "react"
import { HiOutlineHome } from 'react-icons/hi'

const Page = observer((props) => {
    return (
        <Flex
            justify='center'
        >
            <Stack>
                {props.children}
                <footer>
                    <Link href='/'>
                        <Button>
                            <HiOutlineHome />
                        </Button>
                    </Link>
                </footer>
                {/* {JSON.stringify(props.children.props)} */}
                {/* {isDev
                    && <footer>
                        <h1>There's A platypus controlling me!</h1>
                    </footer>} */}
            </Stack>
        </Flex>
    )
})

// Pass on props thru the Page template
export const asPage = (props = null) => Component => {
    const AsPage = () => {
        // console.log('props', props)
        return (
            !props
                ? <Page>
                    <Component />
                </Page>
                : <Page>
                    <Component {...props} />
                </Page>
        )
    }

    return AsPage;
}