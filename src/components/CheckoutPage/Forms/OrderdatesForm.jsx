import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SelectDateTime } from '../../FormFields';

export default function OrderdatesForm(props) {
  const {
    formField: { desiredDate, desiredTime }
  } = props;

  console.log('OrderdatesForm props', props);
  const rowClick = (e, key) => {
    console.log('OrderdatesForm table row', e.target, key);
  };
  const cellClick = (e, key) => {
    console.log('OrderdatesForm table cell ', e.target, key);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Date & Time
      </Typography>
      <Grid container spacing={4}>
        <Grid item>
          <SelectDateTime
            data={props.datesData}
            rowClick={rowClick}
            cellClick={cellClick}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
