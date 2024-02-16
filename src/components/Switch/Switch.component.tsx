import React, { useState } from 'react';
import { Switch as SwitchButton} from 'antd';
import 'antd/dist/reset.css';

import { themeMaterial } from "../../settings/materialTheme.setting"

interface SwitchButtonProps {
    checked: boolean;
    onChange?: (checked: boolean) => void;
    checkedLabel?: string;
    unCheckedLabel?: string;
}

export const Switch: React.FC<SwitchButtonProps> = ({
    checked,
    onChange,
    checkedLabel,
    unCheckedLabel
  }) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    const { main } = themeMaterial.palette.primary
  
    const handleSwitchChange = (checked: boolean) => {
      setIsChecked(checked);
      (onChange) && onChange(checked);
    };
  
    return (
      <SwitchButton
        checked={isChecked}
        checkedChildren={checkedLabel} 
        unCheckedChildren={unCheckedLabel}
        onChange={(checked)  => handleSwitchChange(checked)}
        style={{ backgroundColor: isChecked ? main : '#bfbfbf'}}
      />
    );
  };
  
  export default SwitchButton;
  