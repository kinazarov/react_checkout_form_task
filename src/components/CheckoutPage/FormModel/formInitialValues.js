import checkoutFormModel from './checkoutFormModel';
const {
  formField: {
    firstName,
    lastName,
    email,
    desiredStore,
    desiredDate,
    desiredTime,
    nameOnCard,
    cardNumber,
    expiryDate,
    cvv
  }
} = checkoutFormModel;

export default {
  [firstName.name]: '',
  [lastName.name]: '',
  [desiredStore.name]: '',
  [desiredDate.name]: '',
  [desiredTime.name]: '',
  [email.name]: '',
  [nameOnCard.name]: '',
  [cardNumber.name]: '',
  [expiryDate.name]: '',
  [cvv.name]: ''
};

/*
{
  [firstName.name]: 'Константин',
  [lastName.name]: 'Назаров',
  [desiredStore.name]: '',
  [desiredDate.name]: '',
  [desiredTime.name]: '',
  [email.name]: 'kinazarov@gmail.com',
  [nameOnCard.name]: 'FFF',
  [cardNumber.name]: '4111111111111',
  [expiryDate.name]: '2026-11-30T22:00:00.000Z',
  [cvv.name]: '111'
};
*/
