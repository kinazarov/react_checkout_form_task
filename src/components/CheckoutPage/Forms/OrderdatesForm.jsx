import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SelectDateTime, InputField } from '../../FormFields';
import { cloneDeep } from 'lodash';

export default function OrderdatesForm(props) {
  const {
    formField: { desiredDate, desiredTime }
  } = props;

  console.log('props', props, desiredDate, desiredDate);

  let currentState = cloneDeep(props.datesData);

  const [dateTimeState, setDateTimeState] = React.useState(props.datesData);

  function cellClick(e) {
    const desired_date_id = e.target.getAttribute('desired_date_id');
    const desired_time_id = e.target.getAttribute('desired_time_id');

    for (let dateRow of currentState) {
      if (dateRow.id === desired_date_id) {
        dateRow.color = 'grey';
        console.log('dateRow.date', dateRow.date);
      } else {
        dateRow.color = undefined;
      }
      for (let timeCell of dateRow.available_hours) {
        if (timeCell.id === desired_time_id) {
          timeCell.color = 'cyan';
          console.log('timeCell.hours', timeCell.hours);
        } else {
          timeCell.color = undefined;
        }
      }
    }

    setDateTimeState(currentState);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Date & Time
      </Typography>
      <InputField
        name={desiredTime.name}
        label={desiredTime.label}
        style={{ display: 'none' }}
      />
      <InputField
        name={desiredDate.name}
        label={desiredDate.label}
        style={{ display: 'none' }}
      />
      <Grid container spacing={4}>
        <Grid item>
          <SelectDateTime data={dateTimeState} cellClick={cellClick} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
