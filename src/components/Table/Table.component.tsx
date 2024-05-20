import { TableContainer, Table as TableMUI, TableBody, TableCell, TableHead, TableRow, SxProps, Theme } from "@mui/material";

type alignType = "center" | "left" | "right" | "inherit" | "justify";

export interface IRow {
  id: number;
  items: { value: string | number; align?: alignType; styles?: SxProps<Theme> }[];
  onClick?: () => any;
}

export interface IColumn {
  title: string;
  align?: alignType;
  styles?: SxProps<Theme>;
}

export interface TableProps {
  minWidth?: number;
  columns: IColumn[];
  rows: IRow[];
}

export const Table: React.FC<TableProps> = ({ minWidth, columns, rows }) => {
  const handleRowClick = (onClick?: () => any) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <TableContainer>
      <TableMUI sx={{ minWidth: minWidth || 650 }} aria-label="table-component">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell align={col.align} key={col.title} sx={col.styles}>
                {col.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} onClick={() => handleRowClick(row.onClick)} sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: row.onClick ? "pointer" : undefined }}>
              {row.items.map((item) => (
                <TableCell sx={item.styles} key={item.value}>
                  {item.value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableMUI>
    </TableContainer>
  );
};
