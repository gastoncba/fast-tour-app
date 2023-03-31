import React, { CSSProperties } from "react";
import { Card as AntCard } from "antd";
import { Paragraph } from "../Paragraph/Paragraph.component";

interface Props  {
  title: string;
  description: string;
  other?: string;
  coverImage: string;
  style?: CSSProperties;
};

export const Card:React.FC<Props> = ({
  title,
  description,
  coverImage,
  style,
  other,
}) => {
  return (
    <AntCard
      hoverable
      cover={<img alt="cover" src={coverImage} />}
      style={{ borderRadius: "16px", ...style }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "2px" }}
      >
        <Paragraph type="title" levelTitle={5} text={title} />
      </div>
      <div>
        <Paragraph text={description} style={{ marginBottom: "0px" }} />
      </div>
      {other && (
        <div>
          <Paragraph
            text={other}
            style={{ marginBottom: "0px" }}
            color="gray"
            type="text"
          />
        </div>
      )}
    </AntCard>
  );
};
