import React, { useState } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { DatePicker, Button } from "antd";
import dayjs from 'dayjs';
import "antd/dist/reset.css";
import { themeMaterial } from "../../settings/materialTheme.setting";
import "./styles.css"
const { main } = themeMaterial.palette.primary;

const { RangePicker } = DatePicker;

interface RangeProps {
  onApplyFilter?: (startDate: string, endDate: string) => void;
  onChange?: (dateStrings: string[]) => void;
  sx?: SxProps<Theme>;
  text?: string;
  format?: 'YYYY/MM/DD' | 'MM-DD-YYYY' | 'MM/DD/YYYY' | "YYYY-MM-DD"
  initialDate?: string[] 
}

export const Range: React.FC<RangeProps> = ({ onApplyFilter, sx, text, onChange, format, initialDate}) => {
  const [dates, setDates] = useState<string[]>([]);

  const handleApplyFilter = () => {
    if (dates.length === 2) {
      onApplyFilter && onApplyFilter(dates[0], dates[1]);
    }
  };

  const handleDateChange = (dateStrings: string[]) => {
    setDates(dateStrings);
    onChange && onChange(dateStrings);
  };

  return (
    <Box sx={sx}>
      <RangePicker 
        format={format}
        defaultValue={(initialDate) && [dayjs(initialDate[0], format || 'YYYY/MM/DD'), dayjs(initialDate[1], format || 'YYYY/MM/DD')]}
        onChange={(dates, dateStrings) => handleDateChange(dateStrings)} />
      {onApplyFilter && (
        <Button type="primary" onClick={handleApplyFilter} style={{ margin: "5px", backgroundColor: main }}>
          {text ? text : "Aplicar filtro"}
        </Button>
      )}
    </Box>
  );
};
