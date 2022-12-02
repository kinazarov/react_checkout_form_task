export default {
  formId: 'checkoutForm',
  formField: {
    desiredStore: {
      name: 'desiredStore',
      label: 'Store*',
      requiredErrorMsg: 'You have to specify the store to take order from'
    },
    desiredDate: {
      name: 'desiredDate',
      label: 'Date*',
      requiredErrorMsg: 'Date is required'
    },
    desiredTime: {
      name: 'desiredTime',
      label: 'Time*',
      requiredErrorMsg: 'Time is required'
    },
    firstName: {
      name: 'firstName',
      label: 'First name*',
      requiredErrorMsg: 'First name is required'
    },
    lastName: {
      name: 'lastName',
      label: 'Last name*',
      requiredErrorMsg: 'Last name is required'
    },
    email: {
      name: 'email',
      label: 'Email*',
      requiredErrorMsg: 'Email is required',
      invalidErrorMsg: 'email should match example@domain.com'
    },
    nameOnCard: {
      name: 'nameOnCard',
      label: 'Name on card*',
      requiredErrorMsg: 'Name on card is required'
    },
    cardNumber: {
      name: 'cardNumber',
      label: 'Card number*',
      requiredErrorMsg: 'Card number is required',
      invalidErrorMsg: 'Card number is not valid (e.g. 4111111111111)'
    },
    expiryDate: {
      name: 'expiryDate',
      label: 'Expiry date*',
      requiredErrorMsg: 'Expiry date is required',
      invalidErrorMsg: 'Expiry date is not valid'
    },
    cvv: {
      name: 'cvv',
      label: 'CVV*',
      requiredErrorMsg: 'CVV is required',
      invalidErrorMsg: 'CVV is invalid (e.g. 357)'
    }
  }
};
