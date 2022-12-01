import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SelectDateTime } from '../../FormFields';
import { map } from 'lodash';

export default function OrderdatesForm(props) {

  console.log(props);

  const [dateTimeState, setDateTimeState] = React.useState(props.datesData);

  console.log(dateTimeState);

  const {
    formField: { desiredDate, desiredTime }
  } = props;


  console.log('OrderdatesForm props', props);
  const cellClick = e => {
    console.log('OrderdatesForm table cell ', e.target);
    const desired_date_id = e.target.desired_date_id;
    const desired_time_id = e.target.desired_time_id;

    const newState = map(
      props.datesData,
      (date_element) => {
        {...date_element, "available_hours" : date_element.available_hours}
      }
    )


    e.target.style.background = 'cyan';
  };

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
