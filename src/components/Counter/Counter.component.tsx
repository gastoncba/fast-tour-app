import React, { useState } from "react";
import { Box } from "@mui/material";

import { Paragraph } from "../Paragraph/Paragraph.component";
import { Avatar } from "../Avatar/Avatar.component";
import { Icon } from "../Icon/Icon.component";
import { IconButton } from "../IconButton/IconButton.component";

interface PropsCounter {
  initialValue?: number;
  onChange: (value: number) => void;
}

export const Counter: React.FC<PropsCounter> = ({ initialValue, onChange }) => {
  const [count, setCount] = useState<number>(initialValue || 0);

  const handleIncrement = () => {
    setCount(count + 1);
    onChange(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      onChange(count - 1);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <IconButton
        icon={
          <Avatar size={20}>
            <Icon type="REMOVE" />
          </Avatar>
        }
        onClick={handleDecrement}
      />
      <Paragraph text={count} />
      <IconButton
        icon={
          <Avatar size={20}>
            <Icon type="PLUS" />
          </Avatar>
        }
        onClick={handleIncrement}
      />
    </Box>
  );
};
