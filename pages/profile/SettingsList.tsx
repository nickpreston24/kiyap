import React, { FC } from "react";
import { ToggleButton } from "../../components/atoms/ToggleButton";
import { observer } from "mobx-react-lite";
import { values } from "mobx";
import { Heading, List, Stack } from "@chakra-ui/react";

export const SettingsList: FC<any> = observer(({ section }) => {
  // console.log('settings', section)
  return (
    <Stack>
      <Heading>{section.name}</Heading>

      {values(section.settings).map((setting, i) => (
        <ToggleButton
          key={i}
          setting={setting} />
      ))}
    </Stack>
  )
});
