import React, { FC } from "react";
import { ToggleButton } from "../../components/atoms/ToggleButton";
import { observer } from "mobx-react-lite";
import { values } from "mobx";
import { Heading, Stack } from "@chakra-ui/react";

export const SettingsList: FC<any> = observer(({ section }) => {
  // console.log('settings', section)
  return (
    <Stack>
      {section && <Heading>{section?.name}</Heading>}

      {section && values(section.settings).map((setting, i) => (
        <ToggleButton
          key={i}
          setting={setting} />
      ))}
    </Stack>
  )
});

export default SettingsList