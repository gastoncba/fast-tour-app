import React, { useState, useMemo } from 'react';
import 'antd/dist/reset.css';
import { Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Box, SxProps, Theme } from '@mui/material'

import { Paragraph } from '../Paragraph/Paragraph.component';

interface AutocompleteOption {
  value: string;
}

interface Props {
  placeholder: string;
  items: AutocompleteOption[];
  onSelect: (value: string) => void;
  onChange?: (value: string) => void;
  sx?: SxProps<Theme>;
  displayNotFound?: JSX.Element
}

export const SearchBar: React.FC<Props> = ({ placeholder, items, onSelect, sx, displayNotFound, onChange }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [notFound]  = useState<JSX.Element>(displayNotFound || <Paragraph text={'No hay resultados'} sx={{color: '#424242'}} fontSize={14} />)
  
  const filteredOptions = useMemo(() => {
    const uniqueOptions = items.filter((option, index) => {
      return items.findIndex((opt) => opt.value === option.value) === index;
    });
    return uniqueOptions.filter((option) =>
      option.value.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [items, searchValue]);

  const handleSearch = (value: any) => {
    setSearchValue(value);
  };

  const renderNotFoundContent = () => {
    return notFound;
  };

  return (
    <Box sx={sx}>
      <AutoComplete
        options={filteredOptions}
        onSelect={onSelect}
        onSearch={handleSearch}
        onChange={(value) => onChange && onChange(value)}
        dropdownStyle={{ maxHeight: '300px', zIndex: 10000 }} 
        style={{ zIndex: 3, width: '100%'}} 
        notFoundContent={renderNotFoundContent()}
      >
        <Input prefix={<SearchOutlined />} placeholder={placeholder} allowClear />
      </AutoComplete>
    </Box>
  );
};