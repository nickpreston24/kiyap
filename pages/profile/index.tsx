import { Stack } from '@chakra-ui/react';
import { values } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react'
import { asPage } from '../../components/templates/Page';
import { SettingsList } from './SettingsList'

export const ProfilePage: FC<any> = observer(({ profile }) => {
    let sections = values(profile?.sections);
    // let isDev =
    //     sections
    //         .map(s => values(s.settings))
    //         .reduce((acc, val) => acc.concat(val), []) // flat(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
    //         .find(x => x.name === 'Dev Mode')
    //         .enabled

    // console.log('isDev', isDev)

    return (
        <Stack>
            {sections
                .map((section, i) => {
                    return (
                        <SettingsList
                            key={i}
                            section={section} />
                    )
                })}
        </Stack>
    )
});

export default asPage()(ProfilePage);
