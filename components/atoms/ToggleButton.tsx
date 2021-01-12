import { Button } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";

type Props = {
  setting: any
}
/** Toggles a single setting */
export const ToggleButton: FC<Props> = observer(({ setting, onColor = '#173', offColor = '#913' }) => {
  return (<Button
    bg={setting.enabled ? onColor : offColor}
    color={'#fff'}
    onClick={setting.toggle}>
    {`Turn  ${setting.name}`} {setting.enabled ? 'Off' : 'On'}
  </Button>);
});