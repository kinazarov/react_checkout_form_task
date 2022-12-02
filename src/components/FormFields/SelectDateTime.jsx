import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material';

function SelectDateTime(props) {
  const { data, cellClick, ...rest } = props;
  return (
    <FormControl {...rest}>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {data.map(row => (
              <TableRow key={'ROW' + row.id}>
                <TableCell
                  component="td"
                  key={row.id}
                  style={{ backgroundColor: row.color }}
                >
                  {row.date}
                </TableCell>
                {row.available_hours.map(cell =>
                  cell.selected ? (
                    <TableCell
                      desired_date_id={row.id}
                      desired_time_id={cell.id}
                      key={cell.id}
                      component="td"
                      style={{ backgroundColor: cell.color }}
                      onClick={cellClick}
                    >
                      {cell.hours}
                    </TableCell>
                  ) : (
                    <TableCell
                      desired_date_id={row.id}
                      desired_time_id={cell.id}
                      key={cell.id}
                      style={{ backgroundColor: cell.color }}
                      component="td"
                      onClick={cellClick}
                    >
                      {cell.hours}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FormControl>
  );
}

SelectDateTime.defaultProps = {
  data: []
};

SelectDateTime.propTypes = {
  data: PropTypes.array.isRequired
};

export default SelectDateTime;
