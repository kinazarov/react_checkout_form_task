import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SelectDateTime } from '../../FormFields';
import { useField } from 'formik';
import { cloneDeep } from 'lodash';

export default function OrderdatesForm(props) {
  console.log(props);
  let currentState = cloneDeep(props.datesData);
  const [field, meta] = useField(props);

  const [dateTimeState, setDateTimeState] = React.useState(props.datesData);

  // console.log(dateTimeState);

  const {
    formField: { desiredDate, desiredTime }
  } = props;

  console.log(field)
  console.log(desiredDate, desiredTime)

  function cellClick(e) {
    const desired_date_id = e.target.getAttribute('desired_date_id');
    const desired_time_id = e.target.getAttribute('desired_time_id');

    for (let dateRow of currentState) {
      if (dateRow.id === desired_date_id) {
        dateRow.color = 'grey';
        desiredDate = dateRow.date;
      } else {
        dateRow.color = undefined;
      }
      for (let timeCell of dateRow.available_hours) {
        timeCell.color =
          dateRow.id === desired_date_id && timeCell.id === desired_time_id
            ? 'cyan'
            : undefined;
      }
    }

    // console.log('newState', currentState);
    setDateTimeState(currentState);
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
