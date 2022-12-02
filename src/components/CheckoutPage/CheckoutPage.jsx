import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { Formik, Form } from 'formik';

import PersonForm from './Forms/PersonForm';
import PaymentForm from './Forms/PaymentForm';
import OrderdatesForm from './Forms/OrderdatesForm';
import CheckoutSuccess from './CheckoutSuccess';

import validationSchema from './FormModel/validationSchema';
import checkoutFormModel from './FormModel/checkoutFormModel';
import formInitialValues from './FormModel/formInitialValues';

import useStyles from './styles';

// here should be actual data retrieving
import { storesData as orderData } from './mock';
let selectedNode = { desired_date_id: '', desired_time_id: '' };

const steps = ['Personal Information', 'Order Date & time', 'Payment'];
const { formId, formField } = checkoutFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <PersonForm formField={formField} />;
    case 1:
      return (
        <OrderdatesForm orderData={orderData} selectedNode={selectedNode} />
      );
    case 2:
      return <PaymentForm formField={formField} />;
    default:
      return <div>Not Found</div>;
  }
}

export default function CheckoutPage() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  async function _submitForm(values, actions) {
    console.log('◩◩◩◩◩◩ _handleSubmit values', values);
    console.log('◩◩◩◩◩◩ _handleSubmit actions', actions);

    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    selectedNode = { desired_date_id: '', desired_time_id: '' };

    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values, actions) {
    console.log('◩◩◩◩◩◩ values', values);
    console.log('◩◩◩◩◩◩ _handleSubmit activeStep', activeStep);
    console.log('◩◩◩◩◩◩ _handleSubmit actions', actions);

    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      console.log('◩◩◩◩◩◩ now activeStep', activeStep);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    console.log('◩◩◩◩◩◩ _handleBack activeStep', activeStep);

    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>
              <Button
                onClick={e => {
                  setActiveStep(steps.indexOf(label));
                }}
              >
                {label}
              </Button>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <CheckoutSuccess />
        ) : (
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {console.log('◩◩◩◩◩◩ isSubmitting', isSubmitting)}
                {_renderStepContent(activeStep)}

                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      {isLastStep ? 'Place order' : 'Next'}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
}
