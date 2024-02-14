import React from "react";
import { Slider as MUISlider, SxProps, Theme } from "@mui/material";

import { sliderStyles } from "./styles"

interface SliderProps {
  value: number | number[];
  min: number;
  max: number;
  step?: number;
  marks?: { value: number; label: string }[];
  onChange: (event: Event, newValue: number | number[]) => void;
  sx?: SxProps<Theme>;
  valueLabelDisplay?: "on" | "auto" | "off";
}

export const Slider: React.FC<SliderProps> = ({ value, min, max, step, marks, onChange, sx, valueLabelDisplay }) => {
  return <MUISlider sx={{ ...sliderStyles, ...sx }} valueLabelDisplay={valueLabelDisplay} value={value} min={min} max={max} step={step || 0.5} marks={marks} onChange={onChange} />;
};
