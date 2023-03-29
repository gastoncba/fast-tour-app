import React from "react";
import { Select as SelectAnt } from 'antd'

interface Props {
    defaultValue: any; 
    items: any[],
    onSelect: (value: string) => void
} 

export const Select:React.FC<Props> = ({defaultValue, items, onSelect}) => {

    const handleChange = (value: string) => {
        onSelect(value)
    };

    return(
    <SelectAnt
    defaultValue={defaultValue}
    options={items}
    onChange={handleChange} />)
}