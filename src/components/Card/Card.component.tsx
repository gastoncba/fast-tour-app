import React from "react";
import { Card as CardMUI, SxProps, Theme, CardMedia, CardContent, CardActions, CardActionArea } from "@mui/material";

import { Paragraph } from "../Paragraph/Paragraph.component";
import { Button } from "../Button/Button.component";

interface Props {
  title: string;
  description: string;
  other?: string;
  coverImage?: string | null;
  sx?: SxProps<Theme>;
  onAction?: {
    onClick: (value: any) => void;
    title: string;
  };
  children?: React.ReactNode;
  onClickCard?: () => void;
  onClickArea?: () => void;
}

export const Card: React.FC<Props> = ({ title, description, coverImage, sx, other, onAction, children, onClickCard, onClickArea }) => {
  return (
    <CardMUI sx={sx} onClick={onClickCard}>
      {onClickArea ? (
        <CardActionArea onClick={onClickArea}>
          <CardMedia component="img" alt={title} height="140" image={coverImage ? coverImage : "https://content.r9cdn.net/rimg/dimg/62/28/22c46ab3-city-3286-164709113b2.jpg?crop=true&width=1020&height=498"} />
        </CardActionArea>
      ) : (
        <CardMedia component="img" alt={title} height="140" image={coverImage ? coverImage : "https://content.r9cdn.net/rimg/dimg/62/28/22c46ab3-city-3286-164709113b2.jpg?crop=true&width=1020&height=498"} />
      )}
      <CardContent>
        <Paragraph variant="h5" text={title} />
        <Paragraph variant="body1" text={description} color="GrayText" />
        {other && <Paragraph variant="body1" text={other} color="GrayText" />}
        {children && children}
      </CardContent>
      {onAction && (
        <CardActions>
          <Button title={onAction.title} onClick={onAction.onClick} />
        </CardActions>
      )}
    </CardMUI>
  );
};
