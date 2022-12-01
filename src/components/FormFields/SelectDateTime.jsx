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
} from '@material-ui/core';

function SelectDateTime(props) {
  const { data, rowClick, cellClick, ...rest } = props;
  console.log('datesData', props);

  return (
    <FormControl {...rest}>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id} onClick={rowClick}>
                <TableCell component="td">{row.date}</TableCell>
                {row.available_hours.map(cell => (
                  <TableCell key={cell.id} component="td" onClick={cellClick}>
                    {cell.hours}
                  </TableCell>
                ))}
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
