import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SelectDateTime } from '../../FormFields';
import { useField } from 'formik';
import { cloneDeep } from 'lodash';

export default function OrderdatesForm(props) {
  console.log(props);
  let currentState = cloneDeep(props.datesData);
  console.log('currentState', currentState);

  const [dateTimeState, setDateTimeState] = React.useState(props.datesData);

  console.log(dateTimeState);

  const {
    formField: { desiredDate, desiredTime }
  } = props;

  console.log('OrderdatesForm props', props);

  function cellClick(e) {
    console.log('OrderdatesForm table cell ', e.target);
    const desired_date_id = e.target.desired_date_id;
    console.log('desired_date_id', desired_date_id);

    const desired_time_id = e.target.desired_time_id;
    console.log('desired_time_id', desired_time_id);

    console.log('currentState', currentState);

    for (let dateRow of currentState) {
      console.log('row', dateRow.id, desired_date_id);
      for (let timeCell of dateRow.available_hours) {
        console.log('cell', timeCell.id, desired_time_id);
        dateRow.color = dateRow.id === desired_date_id ? 'grey' : undefined;
        timeCell.color =
          dateRow.id === desired_date_id && timeCell.id === desired_time_id
            ? 'cyan'
            : undefined;
      }
    }

    console.log('newState', currentState);
    setDateTimeState(currentState);
    // {...date_element, "available_hours" : date_element.available_hours}

    // e.target.style.background = 'cyan';
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
