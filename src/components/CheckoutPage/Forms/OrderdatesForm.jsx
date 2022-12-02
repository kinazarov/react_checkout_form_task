import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SelectDateTime } from '../../FormFields';
import { useFormikContext } from 'formik';
import { clone, cloneDeep } from 'lodash';

export default function OrderdatesForm(props) {
  const formikContext = useFormikContext();

  const [dateTimeState, setDateTimeState] = React.useState(props.datesData);

  const { formField } = props;
  console.log('◩◩◩◩◩◩ formField start', formField);

  function cellClick(e) {
    let dateTime = cloneDeep(props.datesData);

    const desired_date_id = e.target.getAttribute('desired_date_id');

    const desired_time_id = e.target.getAttribute('desired_time_id');
    console.log('◩◩◩◩◩◩ formikContext.values', formikContext.values);

    let newFormikValues = clone(formikContext.values);

    for (let dateRow of dateTime) {
      let selectedDate = dateRow.id === desired_date_id;
      dateRow.color = selectedDate ? 'grey' : undefined;
      console.log('◩◩◩◩◩◩ formikContext', formikContext);

      if (selectedDate) {
        newFormikValues.desiredDate = dateRow.date;
        for (let timeCell of dateRow.available_hours) {
          let selectedTime = timeCell.id === desired_time_id;
          timeCell.color = selectedTime ? 'cyan' : undefined;
          if (selectedTime) {
            newFormikValues.desiredTime = dateRow.date;
            formikContext.setValues(newFormikValues);
          }
        }

        break;
      }
    }

    console.log('◩◩◩◩◩◩ formikContext.values', formikContext.values);
    setDateTimeState(dateTime);
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
