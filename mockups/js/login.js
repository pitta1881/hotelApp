import {
  loadFormInputListeners,
  loadFormSubmitListeners,
} from './helpers/form-helpers.js';

const callbackSuccessSubmit = (dataJson) => {
  localStorage.setItem('token', dataJson.access_token);
};

document.addEventListener('DOMContentLoaded', () => {
  const formsObj = [
    {
      form: document.getElementById('form-login'),
      method: 'post',
      apiUrl: `${location.origin}/api/auth/login`,
      params: [],
      validations: {
        nick: {
          required: true,
        },
        password: {
          required: true,
        },
      },
      callback: callbackSuccessSubmit,
    },
  ];

  formsObj.forEach((formObj) => {
    loadFormInputListeners(formObj);
    loadFormSubmitListeners(formObj);
  });
});
