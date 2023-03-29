import React, { useState } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { DatePicker, Button } from "antd";
import "antd/dist/reset.css";

const { RangePicker } = DatePicker;

interface FilterProps {
  onApplyFilter: (startDate: string, endDate: string) => void;
  sx?: SxProps<Theme>;
}

export const Filter: React.FC<FilterProps> = ({ onApplyFilter, sx }) => {
  const [dates, setDates] = useState<string[]>([]);

  const handleApplyFilter = () => {
    if (dates.length === 2) {
      onApplyFilter(dates[0], dates[1]);
    }
  };

  const handleDateChange = (dateStrings: string[]) => {
    setDates(dateStrings);
  };

  return (
    <Box sx={sx}>
      <RangePicker
        onChange={(dates, dateStrings) => handleDateChange(dateStrings)}
      />
      <Button
        type="primary"
        onClick={handleApplyFilter}
        style={{ margin: "5px" }}
      >
        Aplicar filtro
      </Button>
    </Box>
  );
};
