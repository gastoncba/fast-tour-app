import { Box, SxProps, Theme } from "@mui/material";
import { Wrapper } from "../Wrapper/Wrapper.component";
import { Paragraph } from "../Paragraph/Paragraph.component";
import { Icon, IconType } from "../Icon/Icon.component";

interface StatisticProps {
  title: string;
  value: number;
  iconType: IconType;
  titleSize?: number;
  valueSize?: number;
  iconSize?: number;
  iconStyles?: SxProps<Theme>;
  //info?: { kpiName: string; description: string | JSX.Element; position?: "left" | "right" | "top" | "bottom" };
}

export const Statistic: React.FC<StatisticProps> = ({ title, value, iconStyles, iconType, iconSize, titleSize, valueSize }) => {
  return (
    <Wrapper>
      <Box sx={{ display: "flex", flexDirection: "row", p: 2, justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Paragraph text={title} fontSize={titleSize} />
          <Paragraph text={value} variant="h5" fontSize={valueSize || 30} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Icon type={iconType} sx={{ fontSize: iconSize || 40, ...iconStyles }} />
        </Box>
      </Box>
    </Wrapper>
  );
};
