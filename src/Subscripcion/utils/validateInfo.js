import valid from "card-validator";

export default function validateInfo(values) {
  let errors = {};
  let creditCard = valid.number(values.cardNumber);

  creditCard.expirationDate = valid.expirationDate(values.cardExpiration);
  creditCard.cvv = valid.cvv(values.cardSecurityCode);
  creditCard.cardholderName = valid.cardholderName(values.cardName);

  errors.show = true;
  errors.variant = "danger";
  errors.message = "Ocurrió un error. Por favor, inténtelo de nuevo más tarde";
  errors.cname = false;
  errors.cnumber = false;
  errors.cexp = false;
  errors.ccvv = false;

  //Card CVV expiration
  if (values.cardSecurityCode === null || !values.cardSecurityCode?.trim()) {
    errors.message = "Debe de ingresar el CVC de la tarjeta";
  } else if (creditCard.cvv.isValid) {
    errors.ccvv = true;
  } else {
    errors.message = "La CVC de la tarjeta es inválida";
  }

  //Card Expiration Verification
  if (values.cardExpiration === null || !values.cardExpiration?.trim()) {
    errors.message = "Debe de ingresar la fecha de caducidad de la tarjeta";
  } else if (creditCard.expirationDate.isValid) {
    errors.cexp = true;
  } else {
    errors.message = "La fecha de caducidad de la tarjeta es inválida";
  }

  //Card Number Verification
  if (values.cardNumber === null || !values.cardNumber?.trim()) {
    errors.message = "Debe ingresar un número de tarjeta";
  } else if (creditCard.isValid) {
    errors.cnumber = true;
  } else {
    errors.message = "El número de la tarjeta de crédito es inválido";
  }

  //Cardholder Name Verification
  if (values.cardName === null || !values.cardName?.trim()) {
    errors.message = "Debe de ingresar un nombre";
  } else if (creditCard.cardholderName.isValid) {
    errors.cname = true;
  } else {
    errors.message = "El nombre del titular de la tarjeta es inválido";
  }

  if (errors.cname && errors.cnumber && errors.cexp && errors.ccvv) {
    errors.variant = "success";
    errors.message = "La tarjeta de crédito es válida";
  }

  return errors;
}
