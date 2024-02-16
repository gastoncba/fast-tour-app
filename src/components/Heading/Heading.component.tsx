import React from "react";
import { Box } from "@mui/material";
import { Paragraph } from "../Paragraph/Paragraph.component";
import { Wrapper } from "../Wrapper/Wrapper.component";

interface Props {
  action?: JSX.Element;
  icon?: JSX.Element;
  title: string;
}

export const Heading: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <Wrapper sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: 0.5,
            alignItems: "center",
            borderRadius: "10px",
          }}>
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row", alignItems: "center", columnGap: 0.5 }}>
            <Paragraph text={props.title} variant="h5" />
            {props.action}
          </Box>
          <Box>{props.icon}</Box>
        </Box>
      </Wrapper>
    </>
  );
};
