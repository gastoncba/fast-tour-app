import React, { useState } from "react";
import { Input, AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface AutocompleteOption {
  value: string;
}

interface SearchProps {
  placeholder: string;
  items: AutocompleteOption[];
  onSelect: (value: string) => void;
  onClear?: (value?: string) => void;
}

export const SearchBox: React.FC<SearchProps> = ({
  placeholder,
  items,
  onSelect,
  onClear,
}) => {
  const [options, setOptions] = useState<AutocompleteOption[]>([]);

  const handleSearch = (value: string) => {
    const filteredOptions = items.filter((option) =>
      option.value.toLowerCase().includes(value.toLowerCase())
    );

    setOptions(filteredOptions);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, type } = e.target;

    if (value === "" && type === "search" && onClear) {
      onClear();
    }
  };

  return (
    <AutoComplete options={options} onSelect={onSelect} onSearch={handleSearch}>
      <Input
        prefix={<SearchOutlined />}
        placeholder={placeholder}
        allowClear
        onChange={handleInputChange}
      />
    </AutoComplete>
  );
};
