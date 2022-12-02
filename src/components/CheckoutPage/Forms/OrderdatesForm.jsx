import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SelectDateTime } from '../../FormFields';
import { useFormikContext } from 'formik';
import { clone, cloneDeep, find as _find } from 'lodash';

export default function OrderdatesForm(props) {
  const formikContext = useFormikContext();

  const [dateTimeState, setDateTimeState] = React.useState(props.datesData);

  const findDateTime = (
    dateTime,
    desired_date_id,
    desired_time_id,
    searchObjects
  ) => {
    let dateNode = dateTime
      ? _find(
          dateTime,
          (searchObjects && searchObjects[0]) || ['id', desired_date_id]
        )
      : undefined;
    let timeNode = dateNode
      ? _find(
          dateNode.available_hours,
          (searchObjects && searchObjects[0]) || ['id', desired_time_id]
        )
      : undefined;

    return { dateNode, timeNode };
  };

  function cellClick(e) {
    let dateTime = cloneDeep(props.datesData);

    const desired_date_id = e.target.getAttribute('desired_date_id');

    const desired_time_id = e.target.getAttribute('desired_time_id');

    let newFormikValues = clone(formikContext.values);

    let { dateNode, timeNode } = findDateTime(
      dateTime,
      desired_date_id,
      desired_time_id
    );
    if (dateNode) {
      dateNode.color = 'gray';
      newFormikValues.desiredDate = dateNode.date;
    }
    if (timeNode) {
      timeNode.color = 'cyan';
      newFormikValues.desiredTime = dateNode.hours;
    }

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
