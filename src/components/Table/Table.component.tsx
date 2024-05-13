import { TableContainer, Table as TableMUI, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

type alignType = "center" | "left" | "right" | "inherit" | "justify";

export interface IRow {
  id: number;
  items: { value: string | number; align?: alignType }[];
}

export interface IColumn {
  title: string;
  align?: alignType;
}

export interface TableProps {
  minWidth?: number;
  columns: IColumn[];
  rows: IRow[];
}

export const Table: React.FC<TableProps> = ({ minWidth, columns, rows }) => {
  return (
    <TableContainer>
      <TableMUI sx={{ minWidth: minWidth || 650 }} aria-label="table-component">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell align={col.align} key={col.title}>
                {col.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              {row.items.map((item) => (
                <TableCell key={item.value}>{item.value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableMUI>
    </TableContainer>
  );
};
