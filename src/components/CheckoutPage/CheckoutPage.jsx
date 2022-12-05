import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Snackbar,
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

let steps = ['Personal Information', 'Order Date & time', 'Payment'].map(v => {
  return { name: v, completed: false };
});

const stores = [
  {
    value: 'great',
    label: 'Our great store in New York'
  },
  {
    value: 'big',
    label: 'Our great store in Chicago'
  },
  {
    value: 'asian',
    label: 'Our superb store in Saigon'
  }
];

const { formId, formField } = checkoutFormModel;

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <PersonForm formField={formField} />;
    case 1:
      return (
        <OrderdatesForm
          formField={formField}
          orderData={orderData}
          selectedNode={selectedNode}
          stores={stores}
        />
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
  const [errorSnackbar, showError] = useState([false, '']);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _submitForm(values, actions) {
    actions.setSubmitting(false);
    selectedNode = { desired_date_id: '', desired_time_id: '' };
    for (let step of steps) {
      step.completed = false;
    }
    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      let doSubmit = true;

      for (let index = 0; index < steps.length - 2; index++) {
        if (!steps[index].completed) {
          actions.setSubmitting(false);
          setActiveStep(index);
          showError([true, `Please fill ${steps[index].name}`]);
          doSubmit = false;
          break;
        }
      }
      if (doSubmit) {
        _submitForm(values, actions);
      }
    } else {
      setActiveStep(activeStep + 1);
      steps[activeStep].completed = true;
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Checkout
      </Typography>
      <Stepper nonLinear activeStep={activeStep} className={classes.stepper}>
        {steps.map((step, index) => (
          <Step key={step.name} completed={step.completed}>
            <StepLabel>
              <Button
                onClick={e => {
                  setActiveStep(index);
                }}
              >
                {step.name}
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
            validate={values => {
              if (activeStep >= 1) {
                showError([!values.desiredDate, 'Please pick date and time']);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
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
      <Snackbar
        severity="error"
        open={errorSnackbar[0]}
        autoHideDuration={1000}
        message={errorSnackbar[1]}
      />
    </React.Fragment>
  );
}
