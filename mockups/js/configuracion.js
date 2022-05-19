import {
  loadFormInputListeners,
  loadFormSubmitListeners,
} from './helpers/form-helpers.js';
import { REGEX_EMAIL, REGEX_STRING } from './helpers/regex-helpers.js';

document.addEventListener('DOMContentLoaded', () => {
  const formsObj = [
    {
      form: document.getElementById('form-update-user'),
      method: 'patch',
      apiUrl: `${location.origin}/api/usuarios`,
      params: [],
      validations: {
        'update-nombre': {
          required: true,
          regexString: REGEX_STRING,
        },
        'update-apellido': {
          required: true,
          regexString: REGEX_STRING,
        },
        'update-nick': {
          required: true,
          regexString: REGEX_STRING,
        },
        'update-email': {
          required: true,
          regexEmail: REGEX_EMAIL,
        },
      },
    },
    {
      form: document.getElementById('form-change-password'),
      method: 'post',
      apiUrl: `${location.origin}/api/usuarios/change-password`,
      params: [],
      validations: {
        'old-password': {
          required: true,
        },
        'new-password': {
          required: true,
          minLenght: 8,
          maxLenght: 50,
          inverseRef: 'repeat-password',
        },
        'repeat-password': {
          required: true,
          same: 'new-password',
        },
      },
    },
    {
      form: document.getElementById('form-new-user'),
      method: 'post',
      apiUrl: `${location.origin}/api/usuarios`,
      params: [],
      validations: {
        'new-nombre': {
          required: true,
          regexString: REGEX_STRING,
        },
        'new-apellido': {
          required: true,
          regexString: REGEX_STRING,
        },
        'new-nick': {
          required: true,
          regexString: REGEX_STRING,
        },
        'new-email': {
          required: true,
          regexEmail: REGEX_EMAIL,
        },
        password: {
          required: true,
        },
      },
    },
  ];

  formsObj.forEach((formObj) => {
    loadFormInputListeners(formObj);
    loadFormSubmitListeners(formObj);
  });

  const eyePasswords = document.getElementsByClassName('eye-password');
  Array.from(eyePasswords).forEach((eye) => {
    eye.addEventListener('click', () => {
      const siblingInput = eye.previousElementSibling;
      if (siblingInput.type === 'password') {
        siblingInput.type = 'text';
        eye.src = './../icons/eye-password-hide-svgrepo-com.svg';
      } else {
        siblingInput.type = 'password';
        eye.src = './../icons/eye-svgrepo-com.svg';
      }
    });
  });
});
