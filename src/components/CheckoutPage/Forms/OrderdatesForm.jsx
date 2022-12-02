import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SelectDateTime } from '../../FormFields';
import { useFormikContext } from 'formik';
import { clone, cloneDeep, find as _find } from 'lodash';

const DATE_COLOR = 'grey';
const TIME_COLOR = 'cyan';

const findDateTime = (dateTime, desired_date_id, desired_time_id) => {
  let dateNode = dateTime
    ? _find(dateTime, ['id', desired_date_id])
    : undefined;
  let timeNode = dateNode
    ? _find(dateNode.available_hours, ['id', desired_time_id])
    : undefined;

  return { dateNode, timeNode };
};

const setInitialState = props => {
  if (
    props.selectedNode.desired_date_id &&
    props.selectedNode.desired_time_id
  ) {
    let dateTime = cloneDeep(props.orderData);

    let { dateNode, timeNode } = findDateTime(
      dateTime,
      props.selectedNode.desired_date_id,
      props.selectedNode.desired_time_id
    );

    dateNode.color = DATE_COLOR;
    timeNode.color = TIME_COLOR;

    return dateTime;
  }

  return props.orderData;
};

export default function OrderdatesForm(props) {
  const formikContext = useFormikContext();

  const [dateTimeState, setDateTimeState] = React.useState(
    setInitialState(props)
  );

  function cellClick(e) {
    let dateTime = cloneDeep(props.orderData);

    const desired_date_id = e.target.getAttribute('desired_date_id');
    const desired_time_id = e.target.getAttribute('desired_time_id');

    props.selectedNode.desired_date_id = desired_date_id;
    props.selectedNode.desired_time_id = desired_time_id;

    let newFormikValues = clone(formikContext.values);

    let { dateNode, timeNode } = findDateTime(
      dateTime,
      desired_date_id,
      desired_time_id
    );

    if (dateNode) {
      dateNode.color = DATE_COLOR;
      newFormikValues.desiredDate = dateNode.date;
    }
    if (timeNode) {
      timeNode.color = TIME_COLOR;
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
