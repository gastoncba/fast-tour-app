import React, { useState, useMemo, useEffect } from "react";
import "antd/dist/reset.css";
import { Input, AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Box, SxProps, Theme } from "@mui/material";
import { CloseCircleFilled } from "@ant-design/icons";

import { Paragraph } from "../Paragraph/Paragraph.component";

interface AutocompleteOption {
  value: string;
}

interface Props {
  placeholder: string;
  items?: AutocompleteOption[];
  onSelect?: (value: string) => void;
  onChange?: (value: string) => void;
  sx?: SxProps<Theme>;
  displayNotFound?: JSX.Element;
  onClose?: React.MouseEventHandler<HTMLSpanElement>;
  withTimer?: boolean;
}

export const SearchBar: React.FC<Props> = ({ placeholder, items, onSelect, sx, displayNotFound, onChange, onClose, withTimer = false }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showNotFound, setShowNotFound] = useState<boolean>(false);

  const filteredOptions = useMemo(() => {
    const uniqueOptions = items?.filter((option, index) => {
      return items.findIndex((opt) => opt.value === option.value) === index;
    });
    return uniqueOptions?.filter((option) => option.value.toLowerCase().includes(searchValue.toLowerCase()));
  }, [items, searchValue]);

  const handleSearch = (value: any) => {
    setSearchValue(value);
    setShowNotFound(false);
  };

  const renderNotFoundContent = () => {
    return filteredOptions ? displayNotFound || <Paragraph text={"No hay resultados"} sx={{ color: "#424242" }} fontSize={14} /> : undefined;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (withTimer && filteredOptions && filteredOptions.length > 0 && searchValue.trim() !== "") {
        setShowNotFound(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [filteredOptions, searchValue, withTimer]);

  return (
    <Box sx={sx}>
      <AutoComplete
        options={showNotFound ? [] : filteredOptions}
        onSelect={onSelect}
        onSearch={handleSearch}
        onChange={(value) => onChange && onChange(value)}
        dropdownStyle={{ maxHeight: "300px", zIndex: 10000 }}
        style={{ zIndex: 3, width: "100%" }}
        notFoundContent={renderNotFoundContent()}>
        <Input prefix={<SearchOutlined />} placeholder={placeholder} allowClear={{ clearIcon: <CloseCircleFilled onClick={onClose} /> }} />
      </AutoComplete>
    </Box>
  );
};
