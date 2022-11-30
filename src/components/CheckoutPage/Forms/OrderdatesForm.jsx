import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { InputField } from '../../FormFields';

export default function OrderdatesForm(props) {
  const {
    formField: { storeDate }
  } = props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Date & Time
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <InputField name={storeDate.name} label={storeDate.label} fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
