import React from 'react'
import { Theme, SxProps, Grid} from '@mui/material'

 interface Props {
    items: any[];
    renderItem: any;
    sx?: SxProps<Theme>
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    direction: 'row' | 'column'
 }

 export const GridList:React.FC<Props> = (props:Props) => {
    return(
        <Grid
        container
        direction={props.direction}
        justifyContent="flex-start"
        alignItems="flex-starts"
        rowSpacing={2}
        columnSpacing={5}
      >
        {props.items.map((item, key) => {
          return (
            <Grid
              item
              sx={props.sx}
              xs={props.xs || 12}
              sm={props.sm || 6}
              md={props.md || 6}
              lg={props.lg || 4}
              xl={props.xl || 4}
              key={key}
            >
              {props.renderItem(item, key)}
            </Grid>
          );
        })}
      </Grid>
    )
 }