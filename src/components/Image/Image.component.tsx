import React from "react";
import { Box } from "@mui/material";

interface ImageProps {
  src: string;
  size?: number;
  alt?: string;
  height?: number | string;
  width?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  styles?: React.CSSProperties;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({ src, alt = "Image", height = "auto", width = "auto", maxHeight, maxWidth, styles, className }) => {
  return (
    <Box
      component="img"
      sx={{
        height,
        width,
        maxHeight,
        maxWidth,
        ...styles,
      }}
      alt={alt}
      src={src}
      className={className}
    />
  );
};
