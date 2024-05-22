import React from "react";
import { Pagination as PaginationMUI } from "@mui/material";

interface PropsPagination {
  count: number;
  page?: number;
  color?: "primary" | "secondary";
  variant?: "outlined" | "text";
  size?: "large" | "medium" | "small";
  showFirstButton?: boolean;
  showLastButton?: boolean;
  changePage: (value: number) => void;
}

export const Pagination: React.FC<PropsPagination> = ({ page, count, variant, size, changePage, showFirstButton, showLastButton, color }) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    changePage(value);
  };

  return <PaginationMUI count={count} page={page} variant={variant} size={size} onChange={handleChange} showFirstButton={showFirstButton} showLastButton={showLastButton} color={color} />;
};
