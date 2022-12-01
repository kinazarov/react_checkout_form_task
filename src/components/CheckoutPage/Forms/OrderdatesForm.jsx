import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SelectDateTime } from '../../FormFields';
import { useFormikContext } from 'formik';
import { cloneDeep } from 'lodash';

export default function OrderdatesForm(props) {
  let currentState = cloneDeep(props.datesData);

  const [dateTimeState, setDateTimeState] = React.useState(props.datesData);
  const fmContext = useFormikContext();

  function cellClick(e) {
    const desired_date_id = e.target.getAttribute('desired_date_id');
    const desired_time_id = e.target.getAttribute('desired_time_id');

    for (let dateRow of currentState) {
      if (dateRow.id === desired_date_id) {
        dateRow.color = 'grey';
        console.log('dateRow.date', dateRow.date);
        fmContext.setFieldValue('desiredDate', dateRow.date);
      } else {
        dateRow.color = undefined;
        fmContext.setFieldValue('desiredDate', '');
      }
      for (let timeCell of dateRow.available_hours) {
        if (timeCell.id === desired_time_id) {
          timeCell.color = 'cyan';
          console.log('timeCell.hours', timeCell.hours);
          fmContext.setFieldValue('desiredTime', timeCell.hours);
        } else {
          timeCell.color = undefined;
          fmContext.setFieldValue('desiredTime', '');
        }
      }
    }

    setDateTimeState(currentState);
    console.log('fmContext.values', fmContext.values);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Date & Time
      </Typography>
      <Grid container spacing={4}>
        <Grid item>
          <SelectDateTime data={dateTimeState} cellClick={cellClick} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
