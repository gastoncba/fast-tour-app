import React, { CSSProperties } from "react";
import { Typography } from "antd";

const { Text, Title } = Typography;

interface Props {
  type: "text" | "title";
  levelTitle?: 1 | 2 | 3 | 4 | 5;
  text: string;
  style?: CSSProperties;
}

export const Paragraph: React.FC<Props> = ({
  type,
  style,
  text,
  levelTitle,
}) => {
  return (
    <>
      {type === "text" ? (
        <Text style={style}>{text}</Text>
      ) : (
        <Title level={levelTitle} style={style}>
          {text}
        </Title>
      )}
    </>
  );
};
