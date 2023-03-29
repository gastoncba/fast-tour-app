import { Card as AntCard } from "antd";
import { Typography } from "antd";
import { CSSProperties } from "react";

const { Title, Paragraph } = Typography;

type CardProps = {
  title: string;
  description: string;
  coverImage: string;
  style?: CSSProperties;
};

export const Card = ({ title, description, coverImage, style }: CardProps) => {
  return (
    <AntCard
      hoverable
      cover={<img alt="cover" src={coverImage} />}
      style={{ borderRadius: "16px", ...style }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <Title level={5} style={{ marginBottom: "0px", marginRight: "8px" }}>
          {title}
        </Title>
      </div>
      <Paragraph style={{ marginBottom: "0px" }}>{description}</Paragraph>
    </AntCard>
  );
};
