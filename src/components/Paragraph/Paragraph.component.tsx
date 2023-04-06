import React, { CSSProperties } from "react";
import { Typography } from "antd";
import "antd/dist/reset.css";

const { Text, Title, Link } = Typography;

interface Props {
  type?: "text" | "title" | "link";
  levelTitle?: 1 | 2 | 3 | 4 | 5;
  text: string;
  style?: CSSProperties;
  color?: "black" | "gray" | "white";
  onClick?: (value?: any) => void;
}

export const Paragraph: React.FC<Props> = ({
  type = 'text',
  style,
  text,
  levelTitle,
  onClick,
  color = 'black',
}) => {
  const primaryStyle = { color: "black" };
  const grayStyle = { color: "gray" };
  const whiteStyle = { color: "white" };

  return (
    <>
      {type === "text" ? (
        <Text
          style={{
            ...style,
            ...(color === 'black' ? primaryStyle : (color === "white") ? whiteStyle : grayStyle),
          }}
        >
          {text}
        </Text>
      ) : type === "title" ? (
        <Title
          level={levelTitle || 1}
          style={{
            ...style,
            ...(color === 'black' ? primaryStyle : grayStyle),
          }}
        >
          {text}
        </Title>
      ) : (
        <div>
          <Link
            onClick={onClick}
            style={{
              ...style,
              ...(color === 'black' ? primaryStyle : grayStyle),
            }}
          >
            {text}
          </Link>
        </div>
      )}
    </>
  );
};
